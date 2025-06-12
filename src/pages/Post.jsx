import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../component";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.useraid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featured_image);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-10">
            <Container>
                <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">

                    <div className="relative">
                        <div className="w-full">
                            <img
                                src={appwriteService.getFilePreview(post.featured_image)}
                                alt={post.title}
                                className="w-full object-cover max-h-[500px]"
                                onError={(e) => {
                                    console.error("Image failed to load:", e.target.src);
                                    console.error("File ID:", post.featured_image);
                                    e.target.src = 'https://via.placeholder.com/1200x600/374151/FFFFFF?text=Image+Not+Available';
                                }}
                            />
                        </div>

                        {/* Lighter gradient overlay for better image visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent"></div>

                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                                {post.title}
                            </h1>
                        </div>


                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-blue-600 hover:bg-blue-700" className="shadow-lg transition-all duration-200">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-600 hover:bg-red-700"
                                    onClick={deletePost}
                                    className="shadow-lg transition-all duration-200"
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 text-gray-200">
                        <div className="prose prose-lg prose-invert max-w-none">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
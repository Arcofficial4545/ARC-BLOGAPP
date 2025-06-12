import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../component'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">All Posts</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Browse through all the amazing content from our community.</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
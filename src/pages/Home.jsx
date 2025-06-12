import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../component'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-gray-300">Loading posts...</p>
                </div>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="py-12">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl shadow-2xl p-12 border border-gray-600">
                            <div className="w-24 h-24 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-4">
                                Welcome to BlogApp
                            </h1>
                            <p className="text-gray-300 mb-8">
                                Discover amazing stories and share your thoughts with the world. Login to start reading and writing posts.
                            </p>
                            <Link to="/login" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                Get Started
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='py-12'>
            <Container>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Latest Posts</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Explore our collection of amazing stories and insights from our community of writers.</p>
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

export default Home
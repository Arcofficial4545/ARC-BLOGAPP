import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featured_image }) {
    return (
        <Link to={`/post/${$id}`} className='block group'>
            <div className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105'>
                <div className='relative overflow-hidden'>
                    <img 
                        src={appwriteService.getFilePreview(featured_image)} 
                        alt={title}
                        className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300'
                        onError={(e) => {
                          console.error("PostCard image failed to load:", e.target.src);
                          e.target.src = 'https://via.placeholder.com/400x200/e5e7eb/6b7280?text=No+Image';
                        }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>
                <div className='p-6'>
                    <h2 className='text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2'>
                        {title}
                    </h2>
                    <div className='mt-4 flex items-center text-sm text-gray-500'>
                        <span>Read more</span>
                        <svg className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
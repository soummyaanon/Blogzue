
import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  
  return (
  <Link to={`/post/${$id}`}>
  <div className='w-full h-64 bg-gray-600 rounded-xl p-4 shadow-lg transform hover:scale-105 transition duration-300'>
    <div className='w-full h-full justify-center mb-4'>
      <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
      className='w-full h-full object-cover rounded-xl' />
    </div>
    <h2
      className='text-xl font-bold text-white' // Modified text color to white
    >{title}</h2>
  </div>
</Link>
  )
}
export default PostCard

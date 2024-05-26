import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion';

function PostCard({$id, title, featuredImage }) {
  
  return (
    <Link to={`/post/${$id}`}>
      <motion.div 
        className='w-full h-64 bg-gray-700 rounded-xl p-4 shadow-lg transform transition duration-300 mb-4'
        whileHover={{ 
          scale: 1.05, 
          rotate: [0, 10, -10, 10, -10, 0],
          transition: {
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            loop: Infinity,
            repeatDelay: 1
          }
        }}
      >
        <div className='w-full h-full justify-center mb-4'>
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='w-full h-full object-cover rounded-xl' />
        </div>
        <h2 className='text-xl font-bold text-white'>{title}</h2>
      </motion.div>
    </Link>
  )
}
export default PostCard
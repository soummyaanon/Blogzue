import React, { useState } from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function PostCard({ $id, title, featuredImage, catagory }) {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) - width / 2;
    const y = (e.clientY - top) - height / 2;
    const rotateX = (y / height) * -10;
    const rotateY = (x / width) * 10;
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <Link to={`/post/${$id}`} className='flex flex-wrap justify-center'>
      <motion.div
        className='flex-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 h-64 rounded-xl p-6 shadow-lg mb-8  mx-8 flex flex-col justify-between transition-transform duration-300'
        style={{
          transform: `perspective(600px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) translateX(${transform.rotateY * 0.5}px) translateY(${transform.rotateX * 0.5}px)`,
          boxShadow: `${-transform.rotateY * 2}px ${transform.rotateX * 2}px 20px rgba(255, 255, 255, 0.6)`, // White shadow
          background: `hsl(0, 0%, ${transform.rotateY}%)`
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.3 }} // Increase scale to 1.3 on hover
        transition={{ type: 'spring', stiffness: 300, damping: 20 }} // Add this line to make the animation smoother
      >
        <div className='w-full h-2/3 mb-4'>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='w-full h-full object-cover rounded-lg'
          />
        </div>
        <h2 className='text-lg font-bold text-gray-200'>{title}</h2>
        <p className='text-sm text-gray-300 mt-2'>{catagory}</p>
      </motion.div>
    </Link>
  );
}

export default PostCard;
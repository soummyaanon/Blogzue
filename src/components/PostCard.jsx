import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import appwriteService from '../appwrite/config';

const PostCard = ({ $id, title, featuredImage, category }) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) - width / 2;
    const y = (e.clientY - top) - height / 2;
    const rotateX = (y / height) * -10;
    const rotateY = (x / width) * 10;
    setTransform({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      className="p-4 card-container" // Removed responsive width classes and added a custom class for styling
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/post/${$id}`}>
        <div
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `
              perspective(600px)
              rotateX(${transform.rotateX}deg)
              rotateY(${transform.rotateY}deg)
              translateX(${transform.rotateY * 0.5}px)
              translateY(${transform.rotateX * 0.5}px)
            `,
            boxShadow: `${-transform.rotateY * 2}px ${transform.rotateX * 2}px 20px rgba(255, 255, 255, 0.2)`,
            background: `linear-gradient(135deg, hsl(0, 0%, ${10 + transform.rotateY}%), hsl(0, 0%, ${20 + transform.rotateX}%))`,
          }}
        >
          <div className="relative pb-[56.25%]">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
            <p className="text-gray-400">{category}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default React.memo(PostCard);
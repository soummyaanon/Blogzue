import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import appwriteService from '../appwrite/config';
import Container from '../components/container/Container';
import authService from '../appwrite/auth';

// Import the images
import f1img from '../assets/big-smile.webp';
import '../../src/Home.css';
import Background from '../assets/bbburst.svg';
import Bgspace from '../components/Bgspace';
import { motion } from 'framer-motion';

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null); // Add user state

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setIsLoading(false);
      }
    });
  
    // Check if user is signed in
    authService.getCurrentUser().then((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setIsLoading(false); // Add this line
      }
    });
  }, []);

  const filteredPosts = posts.filter(post => post.catagory && post.catagory.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) {
    return (
<div className="flex items-center justify-center h-screen">
  <div className="loader"></div>
</div>
    );
  }

  // Check if user is not signed in
  if (!user) {
    return (
      <div className="w-full py-8 mt-4 md-6 text-center slide-in-right" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="mx-auto p-4 text-center font-serif">
          <motion.h1 
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            "Welcome to BLOGZUE YOUR SHORT BLOGER! Share your thoughts and make a difference in concise ways."
          </motion.h1>
          <motion.p 
            className="mt-4 text-white text-lg font-semibold tracking-wide italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            "Join our community, share your thoughts, and start your blogging journey. 'Brevity is the soul of wit.' - William Shakespeare"
          </motion.p>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/signup" className="mt-4 inline-block bg-gray-800 text-white px-6 py-2 rounded font-bold text-lg border-2 border-white hover:bg-gray-700 transition-colors duration-300 ease-in-out transform hover:scale-110">
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }
 return (
  <Bgspace>
  <div>
    <div className='w-full py-8'></div>
    <Container>
      <div className='flex items-center justify-center space-x-4'>
        <motion.img
          src={f1img}
          alt='First Image'
          className='w-32 h-32 object-cover rounded-full'
          animate={{ y: ["10%", "0%", "10%"] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <h2 className='text-2xl font-bold text-white italic'> Search Categories Here</h2>
        <motion.img
          src={f1img}
          alt='First Image'
          className='w-32 h-32 object-cover rounded-full'
          animate={{ y: ["0%", "10%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
      <div className='w-full py-8'>
        <div className='flex justify-center'>
<input
  type='text'
  placeholder='Search by category...'
  value={searchTerm}
  onChange={e => setSearchTerm(e.target.value)}
  className='w-3/4 p-2 mb-4 h-18 rounded-full border- border-gray-300 text-white placeholder-gray-400 text-lg shadow-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-200'
/>
          <div className='absolute mt-2 text-gray-500'>
            <p>Try: lifestyle, Technology, Science, Nature...</p>
          </div>
        </div>
        {searchTerm && (
          <div className='flex flex-wrap justify-start items-start'>
            {filteredPosts.map(post => {
              const parser = new DOMParser();
              const parsedHtml = parser.parseFromString(post.content, 'text/html');
              const plainText = parsedHtml.body.textContent || "";

              return (
                <div key={post.$id} className='m-2 bg-white p-4 rounded-lg shadow-lg w-64 transform hover:scale-105 transition-transform duration-500'>
                  <h2 className='font-bold text-xl text-gray-700 mb-2'>{post.title}</h2>
                  <h2 className='font-bold text-xl mb-2'>{post.category}</h2>
                  {post.fileId && (
                    <img
                      src={appwriteService.getFilePreview(post.featuredImage)}
                      alt={post.category}
                      className='w-full h-64 object-cover mt-4 rounded'
                    />
                  )}
                  <p className='text-gray-700 text-base mt-4'>{plainText}</p>
                  <Link to={`/post/${post.$id}`} className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    See Post
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className='flex justify-center mt-4 mb-10'>
        <Link to='/add-post' className='bg-gradient-to-r from-gray-500 to-gray-900 text-white px-6 py-3 rounded flex items-center transform hover:scale-110 transition-transform duration-500 ease-in-out shadow-lg'>
          <FaPlus className='mr-2 transform hover:rotate-180 transition-transform duration-500 ease-in-out' /> Add Post
        </Link>
      </div>
    </Container>
  </div>
</Bgspace>
);

}

export default Home;
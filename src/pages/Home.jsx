import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaArrowRight } from 'react-icons/fa';
import { DNA } from 'react-loader-spinner'; 
import { motion } from 'framer-motion';
import appwriteService from '../appwrite/config';
import authService from '../appwrite/auth';
import Container from '../components/container/Container';
import Meteors from '../components/Bgspace';
import f1img from '../assets/big-smile.webp';
import '../../src/Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setIsLoading(false);
      }
    });
  
    authService.getCurrentUser().then((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  const filteredPosts = posts.filter(post => post.catagory && post.catagory.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DNA
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative w-full h-screen bg-black overflow-hidden">
        <Meteors number={20} />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center font-serif">
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
    <div className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col">
      <Meteors number={20} />
      <div className="relative z-10 flex-grow flex flex-col">
        <Container className="flex-grow flex flex-col">
          <div className='py-4 flex flex-row items-center justify-center space-x-4'>
            <motion.img
              src={f1img}
              alt='First Image'
              className='w-16 h-16 object-cover rounded-full'
              animate={{
                y: [0, -5, 0, 5, 0],
                opacity: [1, 0.9, 1, 0.9, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h2 className='text-xl font-bold text-white italic'>
              Search Categories Here
            </h2>
            <motion.img
              src={f1img}
              alt='Second Image'
              className='w-16 h-16 object-cover rounded-full'
              animate={{
                y: [0, 5, 0, -5, 0],
                opacity: [1, 0.9, 1, 0.9, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <div className='flex-grow flex flex-col'>
            <div className='flex justify-center mb-2'>
              <input
                type='text'
                placeholder='Search by category...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full sm:w-3/4 p-2 h-10 rounded-full border-gray-300 text-white placeholder-gray-400 text-lg shadow-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-200'
              />
            </div>
            <div className='text-center text-gray-500 mb-2'>
              <p>Try: lifestyle, Technology, Science, Nature...</p>
            </div>
            {searchTerm && (
              <div className='flex-grow overflow-auto'>
                <div className='flex flex-wrap justify-center items-start'>
                  {filteredPosts.map(post => (
                    <div key={post.$id} className='m-2 bg-gray-800 bg-opacity-50 border-gray-400 border p-3 rounded-lg shadow-lg w-56'>
                      <h2 className='font-bold text-gray-300 text-lg mb-2'>{post.title}</h2>
                      <Link to={`/post/${post.$id}`} className='mt-2 bg-transparent text-gray-300 font-bold py-1 px-3 rounded-full inline-flex items-center hover:bg-gray-700 text-sm'>
                        <span>See Post</span>
                        <FaArrowRight className='ml-2' />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='flex justify-center mt-auto mb-4'>
            <Link to='/add-post' className='px-4 py-2 rounded-full flex items-center transform hover:scale-110 transition-transform duration-500 ease-in-out shadow-lg border border-gray-400 bg-transparent hover:bg-gray-800 text-white text-sm'>
              <FaPlus className='mr-2 transform hover:rotate-180 transition-transform duration-500 ease-in-out' /> Add Post
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
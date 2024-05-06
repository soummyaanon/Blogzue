import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import appwriteService from '../appwrite/config';
import Container from '../components/container/Container';

// Import the images
import technologiesImg from '../assets/tech.png';
import natureImg from '../assets/nature.png';
import lifestyleImg from '../assets/lifestyle.png';
import scienceImg from '../assets/science.png';
import f1img from '../assets/big-smile.webp';
import f2img from '../assets/face_smiling@2x.webp';
import '../../src/Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setIsLoading(false);
    });
  }, []);

if (isLoading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <FaSpinner className="animate-spin text-6xl text-blue-500" />
    </div>
  );
}

if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 md-6 text-center bg-gray-900 slide-in-right">
      <div className="mx-auto p-4 text-center font-serif">
          <h1 className="text-2xl font-bold text-white">
          "Welcome to BLOGZUE YOUR SHORT BLOGER! Share your thoughts and make a difference in concise ways."
          </h1>
          <p className="mt-4 text-white text-lg font-semibold tracking-wide italic">
              "Join our community, share your thoughts, and start your blogging journey. 'Brevity is the soul of wit.' - William Shakespeare"
          </p>
          <Link to="/signup" className="mt-4 inline-block bg-gray-800 text-white px-6 py-2 rounded font-bold text-lg border-2 border-white hover:bg-gray-700 transition-colors duration-300 ease-in-out transform hover:scale-110">
              Get Started
          </Link>
      </div>
// Other components and code...

// No SVG here anymore

// More components and code...
</div>
    );
  }

  return (
    <div>
      <div className='w-full py-8'></div>
     <Container>
<div className='flex items-center justify-center space-x-4'>
  <img 
    src={f1img} 
    alt='First Image' 
    className='w-32 h-32 object-cover rounded-full animate-bounce slow' 
  />
  <h1 className='text-2xl font-bold text-white italic'>Categories</h1>
  <img 
    src={f2img} 
    alt='Second Image' 
    className='w-32 h-32 object-cover rounded-full animate-bounce slow' 
  />
</div>
  <div className='w-full py-8'></div>
  <div className='flex flex-wrap justify-center'>
    <div className='p-2 w-1/4'>
      <div className='bg-white rounded-lg shadow-md p-4 transform transition duration-500 hover:scale-105'>
        <img src={technologiesImg} alt='Technologies' className='w-full h-24 object-cover mb-4 rounded-lg' />
        <h2 className='text-xl font-bold text-black'>Technologies</h2>
             

              <div className='neon-shadow'></div>
            </div>
          </div>
          <div className='p-2 w-1/4'>
            <div className='bg-white rounded-lg shadow-md p-4 transform transition duration-500 hover:scale-105'>
              <img src={natureImg} alt='Nature' className='w-full h-24 object-cover mb-4 rounded-lg' />
              <h2 className='text-xl text-black font-bold'>Nature</h2>
             
              <div className='neon-shadow'></div>
            </div>
          </div>
          <div className='p-2 w-1/4'>
            <div className='bg-white rounded-lg shadow-md p-4 transform transition duration-500 hover:scale-105'>
              <img src={lifestyleImg} alt='Lifestyle' className='w-full h-24 object-cover mb-4 rounded-lg' />
              <h2 className='text-xl text-black font-bold'>Lifestyle</h2>

              <div className='neon-shadow'></div>
            </div>
          </div>
          <div className='p-2 w-1/4'>
            <div className='bg-white rounded-lg shadow-md p-4 transform transition duration-500 hover:scale-105'>
              <img src={scienceImg} alt='Science' className='w-full h-24 object-cover mb-4 rounded-lg' />
              <h2 className='text-xl text-black font-bold'>Science</h2>

              <div className='neon-shadow'></div>
            </div>
          </div>
        </div>
<div className='flex justify-center mt-4 mb-10'>
    <Link to='/add-post' className='bg-gradient-to-r from-gray-500 to-gray-900 text-white px-6 py-3 rounded flex items-center transform hover:scale-110 transition-transform duration-500 ease-in-out shadow-lg'>
        <FaPlus className='mr-2 transform hover:rotate-180 transition-transform duration-500 ease-in-out' /> Add Post
    </Link>
</div>
      </Container>
    </div>
  );
}

export default Home;
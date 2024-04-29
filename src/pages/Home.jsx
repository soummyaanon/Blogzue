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
      <div className="w-full py-8 mt-4 md-6 text-center bg-black">
      <div className="mx-auto p-4 text-center font-serif">
          <h1 className="text-2xl font-bold text-white">
              "Become a successful blogger. Blogging is a great way to express your thoughts, share your knowledge with the world, and make a difference in people's lives. It can also be a profitable business if done right."
          </h1>
          <p className="mt-4 text-white text-lg font-semibold tracking-wide italic">
              "Join our community, share your thoughts, and start your blogging journey. 'The journey of a thousand miles begins with a single step.' - Lao Tzu"
          </p>
          <Link to="/signup" className="mt-4 inline-block bg-gray-800 text-white px-6 py-2 rounded font-bold text-lg border-2 border-white hover:bg-gray-700 transition-colors duration-300 ease-in-out transform hover:scale-110">
              Get Started
          </Link>
      </div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 2400 800">
        {<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 2400 800"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="sssurf-grad"><stop stop-color="hsl(208, 77%, 50%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(208, 74%, 93%)" stop-opacity="1" offset="100%"></stop></linearGradient></defs><g fill="url(#sssurf-grad)" transform="matrix(1,0,0,1,0,-92.80804443359375)"><path d="M 0 318.204036378355 Q 450 453.6456041116991 600 326.12561021670217 Q 1050 486.6042829652782 1200 305.6160852796144 Q 1650 483.88218801658974 1800 328.6725424189918 Q 2250 511.3924772769642 2400 336.4378925677312 L 2400 800 L 0 800 L 0 315.25554622989887 Z" transform="matrix(1,0,0,1,0,35)" opacity="0.05"></path><path d="M 0 318.204036378355 Q 450 453.6456041116991 600 326.12561021670217 Q 1050 486.6042829652782 1200 305.6160852796144 Q 1650 483.88218801658974 1800 328.6725424189918 Q 2250 511.3924772769642 2400 336.4378925677312 L 2400 800 L 0 800 L 0 315.25554622989887 Z" transform="matrix(1,0,0,1,0,70)" opacity="0.21"></path><path d="M 0 318.204036378355 Q 450 453.6456041116991 600 326.12561021670217 Q 1050 486.6042829652782 1200 305.6160852796144 Q 1650 483.88218801658974 1800 328.6725424189918 Q 2250 511.3924772769642 2400 336.4378925677312 L 2400 800 L 0 800 L 0 315.25554622989887 Z" transform="matrix(1,0,0,1,0,105)" opacity="0.37"></path><path d="M 0 318.204036378355 Q 450 453.6456041116991 600 326.12561021670217 Q 1050 486.6042829652782 1200 305.6160852796144 Q 1650 483.88218801658974 1800 328.6725424189918 Q 2250 511.3924772769642 2400 336.4378925677312 L 2400 800 L 0 800 L 0 315.25554622989887 Z" transform="matrix(1,0,0,1,0,140)" opacity="0.53"></path><path d="M 0 318.204036378355 Q 450 453.6456041116991 600 326.12561021670217 Q 1050 486.6042829652782 1200 305.6160852796144 Q 1650 483.88218801658974 1800 328.6725424189918 Q 2250 511.3924772769642 2400 336.4378925677312 L 2400 800 L 0 800 L 0 315.25554622989887 Z" transform="matrix(1,0,0,1,0,175)" opacity="0.68"></path><path d="M 0 318.204036378355 Q 450 453.6456041116991 600 326.12561021670217 Q 1050 486.6042829652782 1200 305.6160852796144 Q 1650 483.88218801658974 1800 328.6725424189918 Q 2250 511.3924772769642 2400 336.4378925677312 L 2400 800 L 0 800 L 0 315.25554622989887 Z" transform="matrix(1,0,0,1,0,210)" opacity="0.84"></path><path d="M 0 318.204036378355 Q 450 453.6456041116991 600 326.12561021670217 Q 1050 486.6042829652782 1200 305.6160852796144 Q 1650 483.88218801658974 1800 328.6725424189918 Q 2250 511.3924772769642 2400 336.4378925677312 L 2400 800 L 0 800 L 0 315.25554622989887 Z" transform="matrix(1,0,0,1,0,245)" opacity="1"></path></g></svg>}
    </svg>
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
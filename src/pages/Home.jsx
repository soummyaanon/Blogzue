import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import appwriteService from '../appwrite/config';
import Container from '../components/container/Container';

// Import the images
import technologiesImg from '../assets/tech.png';
import natureImg from '../assets/nature.png';
import lifestyleImg from '../assets/lifestyle.png';
import scienceImg from '../assets/science.png';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <div className='w-full py-8'></div>
      <Container>
      <h1 className='text-2xl font-bold text-white italic'>Categories</h1>
        <div className='w-full py-8'></div>
        <div className='flex flex-wrap justify-center'>
          <div className='p-2 w-1/4'>
            <div className='bg-white rounded-lg shadow-md p-4 transform transition duration-500 hover:scale-105'>
              <img src={technologiesImg} alt='Technologies' className='w-full h-24 object-cover mb-4 rounded-lg' />
              <h2 className='text-xl font-bold'>Technologies</h2>
              <p className='text-gray-500'>Number of Cards: 1</p>
              <p className='text-gray-500 mt-2'>This is a description of the Technologies category.</p>
              <div className='neon-shadow'></div>
            </div>
          </div>
          <div className='p-2 w-1/4'>
            <div className='bg-white rounded-lg shadow-md p-4 transform transition duration-500 hover:scale-105'>
              <img src={natureImg} alt='Nature' className='w-full h-24 object-cover mb-4 rounded-lg' />
              <h2 className='text-xl font-bold'>Nature</h2>
              <p className='text-gray-500'>Number of Cards: 2</p>
              <p className='text-gray-500 mt-2'>This is a description of the Nature category.</p>
              <div className='neon-shadow'></div>
            </div>
          </div>
          <div className='p-2 w-1/4'>
            <div className='bg-white rounded-lg shadow-md p-4 transform transition duration-500 hover:scale-105'>
              <img src={lifestyleImg} alt='Lifestyle' className='w-full h-24 object-cover mb-4 rounded-lg' />
              <h2 className='text-xl font-bold'>Lifestyle</h2>
              <p className='text-gray-500'>Number of Cards: 3</p>
              <p className='text-gray-500 mt-2'>This is a description of the Lifestyle category.</p>
              <div className='neon-shadow'></div>
            </div>
          </div>
          <div className='p-2 w-1/4'>
            <div className='bg-white rounded-lg shadow-md p-4 transform transition duration-500 hover:scale-105'>
              <img src={scienceImg} alt='Science' className='w-full h-24 object-cover mb-4 rounded-lg' />
              <h2 className='text-xl font-bold'>Science</h2>
              <p className='text-gray-500'>Number of Cards: 4</p>
              <p className='text-gray-500 mt-2'>This is a description of the Science category.</p>
              <div className='neon-shadow'></div>
            </div>
          </div>
        </div>
<div className='flex justify-center mt-4'>
  <Link to='/add-post' className='px-4 py-2 rounded flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-500 transition duration-500'>
    <FaPlus className='mr-2 animate-spin' /> Add Post
  </Link>
</div>
      </Container>
    </div>
  );
}

export default Home;
import React from 'react';
import bgspace from '../assets/space.mp4';

const Bgspace = ({ children }) => {
  return (
    <div style={{ position: 'relative' }}>
      <video 
        src={bgspace} 
        className='absolute top-0 left-0 min-w-full min-h-full object-cover' 
        autoPlay 
        loop 
        muted
      >
        Your browser does not support the video tag.
      </video>
      <div style={{ position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};

export default Bgspace;
import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

import image from '../assets/feed.jpeg';

function HomePage() {
  const navigate = useNavigate();
  return (
    
    <div className='cont' >
     <div className = 'box'>
        
        <div className="typo" >Media Feed</div>
        <img src={image} alt=" Social Media Feed" className='image'/>
        <div className="social" >
          Welcome to our Social Media Feed app – a modern platform where you can share your thoughts,
          view posts by others, and engage through likes and comments. Our app is inspired by professional
          networks and social platforms like LinkedIn.
        </div>
        <button className="but" onClick={() => navigate('/register')}> Get Started - Register</button>
       

      </div>
    </div>
    
    
  );
}

export default HomePage; 




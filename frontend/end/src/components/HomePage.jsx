import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

import image from '../assets/feed.jpeg';

function HomePage() {
  const navigate = useNavigate();
  return (
    <Container className='cont' >
     <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography className="typo" variant="h2" gutterBottom>Media Feed</Typography>
        <img src={image} alt=" Social Media Feed" className='image'/>
        <Typography className="social" variant="body1" sx={{ mb: 4 }}>
          Welcome to our Social Media Feed app – a modern platform where you can share your thoughts,
          view posts by others, and engage through likes and comments. Our app is inspired by professional
          networks and social platforms like LinkedIn.</Typography>
        <Button className="but"variant="contained" color="primary" onClick={() => navigate('/register')}> Get Started - Register</Button>
      </Box>
    </Container>
  );
}

export default HomePage; 




import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

// Array of background images
const images = [
  'https://i.postimg.cc/66vmQWXJ/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp',
  'https://i.postimg.cc/y60CbXWZ/DALL-E-2024-10-12-11-50-47-A-stylish-and-modern-background-image-for-a-fashion-app-called-Virtual.webp',
  'https://i.postimg.cc/Sx6XQzZ2/DALL-E-2024-10-12-14-49-59-A-contemporary-wardrobe-showcasing-a-stylish-and-organized-space-filled.webp',
  'https://i.postimg.cc/L6rQfhz3/DALL-E-2024-10-12-15-00-11-A-stylish-bedroom-featuring-a-modern-organized-wardrobe-The-wardrobe.webp',
  'https://i.postimg.cc/nV10r0zZ/DALL-E-2024-10-12-15-02-18-A-spacious-modern-closet-design-featuring-sleek-lines-and-a-minimalist.webp'
];

// Styled component for the hero section with dynamic background image
const HeroContainer = styled(Box)(({ backgroundImage }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  color: 'white',
  textAlign: 'center',
  padding: '20px',
  overflow: 'hidden',
  transition: 'background-image 1s ease-in-out', // Smooth transition between images
}));

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1,
});

const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Change the background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <HeroContainer backgroundImage={images[currentImage]}>
      <Overlay />
      <HeroContent>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          }}
        >
          Discover Your Style
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          }}
        >
          Create and manage your outfits effortlessly with Virtual Wardrobe
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff4081',
            color: '#fff',
            '&:hover': { backgroundColor: '#ff4081' },
          }}
        >
          Explore Your Wardrobe
        </Button>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;

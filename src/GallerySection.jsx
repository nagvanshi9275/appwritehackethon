

import React from 'react';
import { Box, Grid, Typography, Modal } from '@mui/material';

const images = [
  'https://i.postimg.cc/RCkVbzwC/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp',
  'https://i.postimg.cc/RCkVbzwC/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp',
  'https://i.postimg.cc/RCkVbzwC/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp',
  // Add more image URLs here
];

const GallerySection = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Outfit Gallery
      </Typography>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              component="img"
              src={image}
              alt={`Outfit ${index + 1}`}
              sx={{
                width: '100%',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s',
                },
              }}
              onClick={() => handleOpen(image)}
            />
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Box component="img" src={selectedImage} sx={{ maxWidth: '90%', maxHeight: '90%' }} />
        </Box>
      </Modal>
    </Box>
  );
};

export default GallerySection;









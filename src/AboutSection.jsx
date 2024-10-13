import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const AboutSection = () => {
  return (
    <Box sx={{ py: 8, px: 4, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        About Us
      </Typography>
      
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        Our Mission
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        At Virtual Wardrobe, we aim to revolutionize the way you manage your outfits. 
        Our app provides a seamless experience in organizing, creating, and visualizing 
        your wardrobe, helping you look your best every day!
      </Typography>

      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        Meet the Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src="https://i.postimg.cc/RCkVbzwC/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp" // Replace with actual image path
              alt="Jane Doe"
              style={{ borderRadius: '50%', width: '100px', height: '100px', marginBottom: '16px' }}
            />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Jane Doe
            </Typography>
            <Typography variant="body2">
              Founder & CEO
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src="https://i.postimg.cc/RCkVbzwC/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp" // Replace with actual image path
              alt="John Smith"
              style={{ borderRadius: '50%', width: '100px', height: '100px', marginBottom: '16px' }}
            />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              John Smith
            </Typography>
            <Typography variant="body2">
              Lead Developer
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src="https://i.postimg.cc/RCkVbzwC/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp" // Replace with actual image path
              alt="Sarah Johnson"
              style={{ borderRadius: '50%', width: '100px', height: '100px', marginBottom: '16px' }}
            />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Sarah Johnson
            </Typography>
            <Typography variant="body2">
              UX/UI Designer
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', mt: 4 }}>
        Key Features
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        - Organize your outfits efficiently<br />
        - Create and manage looks effortlessly<br />
        - Get personalized outfit suggestions<br />
        - Track your fashion events and analytics
      </Typography>
    </Box>
  );
};

export default AboutSection;

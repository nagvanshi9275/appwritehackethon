
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

// Sample feature data
const features = [
  {
    title: 'Organized Outfits',
    description: 'Keep your outfits organized and easily accessible with our intuitive design.',
    image: 'https://i.postimg.cc/RCkVbzwC/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp',
  },
  {
    title: 'Style Suggestions',
    description: 'Receive personalized outfit suggestions based on your wardrobe items.',
    image: 'https://i.postimg.cc/RCkVbzwC/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp',
  },
  {
    title: 'Fashion Trends',
    description: 'Stay updated with the latest fashion trends tailored to your style preferences.',
    image: 'https://i.postimg.cc/RCkVbzwC/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp',
  },
  {
    title: 'Seamless Integration',
    description: 'Sync your wardrobe with other apps for a seamless experience.',
    image: 'https://i.postimg.cc/RCkVbzwC/DALL-E-2024-10-12-11-55-15-A-stylish-and-modern-wardrobe-background-featuring-neatly-organized-cl.webp',
  },
];

const FeaturesSection = () => {
  return (
    <Box 
      sx={{ 
        padding: 4, 
        backgroundColor: '#f9f9f9', 
        textAlign: 'center' 
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Key Features
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                margin: 2, 
                boxShadow: 3, 
                transition: 'transform 0.3s', 
                '&:hover': {
                  transform: 'scale(1.05)',
                } 
              }}
            >
              <CardMedia
                component="img"
                alt={feature.title}
                height="140"
                image={feature.image}
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;









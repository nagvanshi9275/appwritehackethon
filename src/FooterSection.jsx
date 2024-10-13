import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const FooterSection = () => {
  return (
    <Box sx={{ bgcolor: '#282c34', color: '#fff', py: 8 }}> {/* Adjusted padding for height */}
      <Grid container spacing={4} justifyContent="center" textAlign="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          FashionSathi 
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Elevate your style with our innovative wardrobe management solutions.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            &copy; {new Date().getFullYear()} Virtual Wardrobe. All rights reserved.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Explore
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link href="/" color="inherit" underline="hover" sx={{ mb: 1 }}>Home</Link>
            <Link href="/wardrobe" color="inherit" underline="hover" sx={{ mb: 1 }}>My Wardrobe</Link>
            <Link href="/outfits" color="inherit" underline="hover" sx={{ mb: 1 }}>Outfit Ideas</Link>
            <Link href="/events" color="inherit" underline="hover" sx={{ mb: 1 }}>Fashion Events</Link>
          </Box>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Your wardrobe, your style, redefined.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Stay Connected
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Link href="https://www.facebook.com" target="_blank" color="inherit" aria-label="Facebook">
              <Facebook />
            </Link>
            <Link href="https://www.twitter.com" target="_blank" color="inherit" aria-label="Twitter">
              <Twitter />
            </Link>
            <Link href="https://www.instagram.com" target="_blank" color="inherit" aria-label="Instagram">
              <Instagram />
            </Link>
            <Link href="https://www.linkedin.com" target="_blank" color="inherit" aria-label="LinkedIn">
              <LinkedIn />
            </Link>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
            Join our community and stay updated with the latest trends!
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 4 }}>
        Sign up for our newsletter to receive the latest updates and special offers!
      </Typography>
      <Link href="/subscribe" color="inherit" underline="hover" sx={{ mb: 2 }}>
        Subscribe Now
      </Link>
    </Box>
  );
};

export default FooterSection;

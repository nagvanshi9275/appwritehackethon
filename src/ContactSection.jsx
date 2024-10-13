

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Clear the form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Box sx={{ py: 8, px: 4, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4 }}>
        We would love to hear from you! Please fill out the form below.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={8}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: '#ff4081', color: '#fff', '&:hover': { backgroundColor: '#ff4081' } }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSection;










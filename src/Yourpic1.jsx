import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const categories = [
  { title: "Shirt", description: "Explore a variety of shirts.", image: "https://i.postimg.cc/J4pX1Zbt/blackshirt.jpg" },
  { title: "T-Shirt", description: "Casual and comfortable T-shirts.", image: "https://i.postimg.cc/Zq5BXR9p/Tshirt.jpg" },
  { title: "Saree", description: "Traditional Indian sarees.", image: "https://i.postimg.cc/Dw2c61Tc/saree.webp" },
  { title: "Miscellaneous", description: "Various other clothing items.", image: "https://i.postimg.cc/1z0njjrn/images.jpg" },
];

export default function Yourpic1() {
  return (
    <div style={{ marginTop: "80px", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}></h1>
      <Grid container spacing={4} justifyContent="center">
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.title}>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: 3,
                transition: "transform 0.3s ease", // Smooth transition for scaling
                "&:hover": {
                  transform: "scale(1.05)", // Scale up the card on hover
                  cursor: "pointer", // Change cursor to pointer
                },
              }}
            >
              <img
                src={category.image}
                alt={category.title}
                style={{ width: "100%", height: "360px", objectFit: "cover", borderRadius: "16px 16px 0 0" }}
              />
              <CardContent>
                <Typography variant="h5" component="div" align="center">
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {category.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

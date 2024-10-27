

import React, { useEffect, useState } from "react";
import { account, database } from "./appwriteConfig";
import { Query } from 'appwrite';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";

import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default function Yourpic() {
  const [user, setUser] = useState(null);
  const [userPics, setUserPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [model, setModel] = useState(null);
  const [jeanImages, setJeanImages] = useState([]); // Array to store "jean" images
  const [abayaImages, setAbayaImages] = useState([]); // Array to store "abaya" images
  const [jerseyImages, setJerseyImages] = useState([]); // Array to store "jersey" images

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const DATABASE_ID = '670d6b3d002583d9a7d3';
  const COLLECTION_ID = '670d71ed00246f60b0ee';
  const PROJECT_ID = '67066f050003ee6c49a2';

  // Load MobileNet model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        console.log('MobileNet model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadModel();
  }, []);

  // Ensure only unique URLs are classified
  useEffect(() => {
    if (model && photoUrls.length > 0) {
      const uniqueUrls = [...new Set(photoUrls)]; // Remove duplicates
      uniqueUrls.forEach((imageSrc, index) => classifyImage(imageSrc, index));
    }
  }, [model, photoUrls]);

  // Function to classify the image using MobileNet
  const classifyImage = async (imageSrc, index) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = async () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const predictions = await model.classify(canvas);
        const topPrediction = predictions[0].className.split(",")[0];

        setPredictions((prevPredictions) => ({
          ...prevPredictions,
          [index]: topPrediction,
        }));

        // If the prediction is "jean", add it to the jeanImages array
        if (topPrediction.toLowerCase() === "jean") {
          setJeanImages((prevJeanImages) => {
            const isAlreadyIncluded = prevJeanImages.some(item => item.img === imageSrc);
            if (!isAlreadyIncluded) {
              return [...prevJeanImages, { img: imageSrc, name: "jean" }];
            }
            return prevJeanImages;
          });
        } 
        // If the prediction is "abaya", add it to the abayaImages array
        else if (topPrediction.toLowerCase() === "abaya") {
          setAbayaImages((prevAbayaImages) => {
            const isAlreadyIncluded = prevAbayaImages.some(item => item.img === imageSrc);
            if (!isAlreadyIncluded) {
              return [...prevAbayaImages, { img: imageSrc, name: "abaya" }];
            }
            return prevAbayaImages;
          });
        }
        // If the prediction is "jersey", add it to the jerseyImages array
        else if (topPrediction.toLowerCase() === "jersey") {
          setJerseyImages((prevJerseyImages) => {
            const isAlreadyIncluded = prevJerseyImages.some(item => item.img === imageSrc);
            if (!isAlreadyIncluded) {
              return [...prevJerseyImages, { img: imageSrc, name: "jersey" }];
            }
            return prevJerseyImages;
          });
        }
      } catch (error) {
        console.error('Error classifying image:', error);
      }
    };

    img.onerror = () => {
      console.error('Error loading image:', imageSrc);
    };
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUser = await account.get();
        setUser(loggedInUser);

        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal('Email', loggedInUser.email)
        ]);

        setUserPics(response.documents);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Collect image URLs from userPics data
  useEffect(() => {
    if (userPics.length > 0) {
      const allPhotoUrls = [];
      userPics.forEach((doc) => {
        doc.image_url.forEach((image) => {
          const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/670e09ec003860954e5c/files/${image}/view?project=${PROJECT_ID}&mode=admin`;
          if (!allPhotoUrls.includes(imageUrl)) {
            allPhotoUrls.push(imageUrl);
          }
        });
      });
      setPhotoUrls(allPhotoUrls);
    }
  }, [userPics]);

  // Log URLs and image arrays for debugging
  useEffect(() => {
    console.log("All Image URLs:", photoUrls);
    console.log("Jean Images Array:", jeanImages);
    console.log("Abaya Images Array:", abayaImages);
    console.log("Jersey Images Array:", jerseyImages);
  }, [photoUrls, jeanImages, abayaImages, jerseyImages]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Picture Gallery
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" my={4}>
          {error}
        </Typography>
      )}

      {!loading && userPics.length > 0 && (
        <Box>
          {userPics.map((doc) => (
            <Box key={doc.$id} mb={4}>
              <Card elevation={3} sx={{ mb: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar 
                      sx={{ 
                        width: 56, 
                        height: 56, 
                        bgcolor: theme.palette.primary.main,
                        mr: 2
                      }}
                    >
                      {doc.Name[0].toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{doc.Name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {doc.Email}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Typography variant="h6" gutterBottom>Your Images:</Typography>
              <Grid container spacing={2}>
                {doc.image_url.map((image, index) => (
                  <Grid item xs={12} sm={isSmallScreen ? 12 : 6} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        image={`https://cloud.appwrite.io/v1/storage/buckets/670e09ec003860954e5c/files/${image}/view?project=${PROJECT_ID}&mode=admin`}
                        alt={`Image ${index + 1}`}
                        sx={{
                          width: '100%',
                          height: '550px',
                          borderRadius: 1,
                        }}
                      />
                      <Box p={2}>
                        <Typography 
                          variant="body1" 
                          sx={{
                            color: 'primary.main',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            backgroundColor: '#f0f0f0',
                            padding: '8px',
                            borderRadius: '8px',
                            textAlign: 'center',
                          }}
                        >
                          {predictions[index] || 'Loading prediction...'}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

  

  


    
        </Box>
      )}
    </Container>
  );
}









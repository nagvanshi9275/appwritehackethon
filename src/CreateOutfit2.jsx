import React, { useRef, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { database, storage } from "./appwriteConfig"; // Correctly importing storage
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreateOutfit2() {
  const streamRef = useRef(null); // Reference for camera stream
  const videoRef = useRef(null);  // Reference for video element
  const inputRef = useRef(null);  // Reference for file input

  const [snapshot, setSnapshot] = useState(null);
  const canvasRef = useRef(null); // Reference for canvas element
  const [show, setShow] = useState(false);
  const [url, seturl] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const DATABASE_ID = '670d6b3d002583d9a7d3'; // Replace with your actual Database ID
  const COLLECTION_ID = '670d71ed00246f60b0ee'; // Replace with your collection ID
  const BUCKET_ID = '670e09ec003860954e5c'; // Replace with your actual storage bucket ID

  // Function to start the camera stream
  function Camera() {
    if (user) {
      navigator.mediaDevices
        .getUserMedia({ video: true }) // Request video stream
        .then((stream) => {
          streamRef.current = stream; // Store the stream in ref for later use
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play(); // Play the video stream
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera: ", error);
        });

      setShow(true);
    } else {
      navigate('/login');
    }
  }

  // Cleanup camera stream when the component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop()); // Stop the camera stream
        console.log("Camera access stopped");
      }
    };
  }, []);

 
  const getOrCreateDocument = async () => {
    try {
      const userDocumentId = user.$id; // Use the authenticated user's ID as the document ID
      const document = await database.getDocument(DATABASE_ID, COLLECTION_ID, userDocumentId);
      return document;
    } catch (error) {
      if (error.code === 404) {
        // Create a new document with Name, Email, message, and image_url fields
        const newDocument = await database.createDocument(DATABASE_ID, COLLECTION_ID, user.$id, {
          Name: user.name, // Assuming user.name holds the user's name
          Email: user.email, // Assuming user.email holds the user's email
          message: [],
          image_url: []
        });
        return newDocument;
      } else {
        console.error("Error fetching/creating document:", error);
      }
    }
  };

  // Function to update the document with new message and image URL
  const addClickTextToDatabase = async (imageUrl) => {
    try {
      const document = await getOrCreateDocument();
      
      const updatedMessages = [...document.message, "Uploaded from device"];
      const updatedImageUrls = [...document.image_url, imageUrl];

      // Update the document with the new message, image URL, Name, and Email
      const response = await database.updateDocument(DATABASE_ID, COLLECTION_ID, user.$id, {
        Name: user.name, // Ensure that Name is kept intact
        Email: user.email, // Ensure that Email is kept intact
        message: updatedMessages,
        image_url: updatedImageUrls
      });

      console.log("Document updated:", response);

      navigate('/yourpics') // Navigate after uploading


    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && user) {
      try {
        const fileId = `upload-${user.$id.slice(0, 10)}-${Math.random().toString(36).substring(2, 12)}`;

        // Upload the file to Appwrite storage
        const response = await storage.createFile(BUCKET_ID, fileId, file);
        console.log("Uploaded file:", response);

        // Now update the database with the fileId
        await addClickTextToDatabase(response.$id);

      } catch (error) {
        console.error("Error uploading file:", error);
      }

    }


  };

  // Trigger file input click when "Upload the Pic" button is clicked
  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Open the file picker
    }
  };

  return (
    <Box sx={{ padding: 2, marginTop: 14 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Create Outfit
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 4 }}>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          color="primary"
          onClick={triggerFileInput} // Trigger the file input
          sx={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Upload the Pic
        </Button>

        <Button
          variant="contained"
          startIcon={<CameraAltIcon />}
          color="secondary"
          sx={{ padding: "10px 20px", fontSize: "16px" }}
          onClick={Camera}
        >
          Click the Pic
        </Button>
      </Box>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileUpload} // Handle file selection
      />

      {/* Video element to show the camera feed */}
      {show && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <video
            ref={videoRef}
            style={{
              width: "100%", // Full width of the container
              maxWidth: "500px", // Max width for the video element
              borderRadius: "8px", // Slight border radius for styling
              border: "2px solid #ccc" // Border around the video element
            }}
            autoPlay
            muted
          />
        </Box>
      )}

      {show && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={takeSnapshot}
            sx={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Take Snapshot
          </Button>
        </Box>
      )}

      {/* Hidden canvas for capturing the video frame */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {snapshot && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <img
            src={snapshot}
            alt="Snapshot"
            style={{
              width: "100%", // Full width of the container
              maxWidth: "500px", // Max width for the image
              borderRadius: "8px", // Slight border radius for styling
              border: "2px solid #ccc" // Border around the image
            }}
          />
        </Box>
      )}
    </Box>
  );
}











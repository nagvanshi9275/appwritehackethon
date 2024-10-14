import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function CreateOutfit() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    // Request access to the camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
      });
  }, []);

  const handleCaptureClick = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/png")); // Save captured image
    }
  };

  return (
    <Box sx={{ padding: 2, marginTop: 14 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Create Outfit
      </Typography>

      {/* Video element to display the camera feed */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <video ref={videoRef} autoPlay style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }} />
        <Button variant="contained" onClick={handleCaptureClick} sx={{ marginTop: 2 }}>
          Capture Picture
        </Button>
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {capturedImage && (
          <Box
            component="img"
            src={capturedImage}
            alt="Captured"
            sx={{ marginTop: 2, maxWidth: "100%", height: "auto", borderRadius: 1 }}
          />
        )}
      </Box>
    </Box>
  );
}

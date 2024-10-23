import React, { useEffect, useRef } from 'react';

const Yourpic1 = () => {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadOpenCV = async () => {
      // Wait for OpenCV to be ready
      await new Promise((resolve) => {
        window.cv.onRuntimeInitialized = resolve;
      });

      // Load the image
      const imgElement = imgRef.current;
      const mat = window.cv.imread(imgElement);
      const grayMat = new window.cv.Mat();

      // Convert to grayscale
      window.cv.cvtColor(mat, grayMat, window.cv.COLOR_RGBA2GRAY);

      // Display the processed image
      window.cv.imshow(canvasRef.current, grayMat);

      // Cleanup
      mat.delete();
      grayMat.delete();
    };

    loadOpenCV();
  }, []);

  return (
    <div style={{ marginTop: '220px' }}>
      <h2>Image Processing with OpenCV.js</h2>
      <img ref={imgRef} src="https://i.postimg.cc/zBm4q4hf/dp-image.jpg" alt="Input" style={{ display: 'none' }} />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Yourpic1;

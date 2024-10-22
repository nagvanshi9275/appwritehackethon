

//import React from "react";

import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default function Yourpic1(){

   const [predictions, setPredictions] = useState({});
   const [model, setModel] = useState(null);


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



   return(
    
    <div>


     <h1>Live in public</h1>



    </div>





   )




}








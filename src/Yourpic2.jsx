import React from "react";

const predictions = [
  "Prediction: jean, blue jean, denim (Probability: 0.9880)",
  "Prediction: jersey, T-shirt, tee shirt (Probability: 0.2386)",
  "Prediction: overskirt (Probability: 0.6539)",
  "Prediction: wool, woolen, woollen (Probability: 0.1428)",
  "Prediction: abaya (Probability: 0.5017)",
  "Prediction: velvet (Probability: 0.0856)",
  "Prediction: cash machine, cash dispenser, automated teller machine, automatic teller machine, automated teller, automatic teller, ATM (Probability: 0.2982)",
  "Prediction: sarong (Probability: 0.1756)",
];

export default function DisplayPredictions() {
  return (
    <div style={{marginTop: "100px"}}>
      <h1>Predicted Clothing Items</h1>
      <ul>
        {predictions.map((prediction, index) => {
          // Extract the part after "Prediction: " and before the first comma or probability
          const extractedPrediction = prediction
            .split("Prediction: ")[1] // Remove "Prediction: "
            .split("(Probability:")[0] // Remove anything starting with "Probability"
            .split(",")[0] // Get only the first clothing item
            .trim(); // Remove any extra spaces
          return <li key={index}>{extractedPrediction}</li>;
        })}
      </ul>
    </div>
  );
}

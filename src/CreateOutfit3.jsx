
import React, {useState} from "react"

export default function CreateOutfit3(){

  const[img, setimg] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const url = URL.createObjectURL(file); // Generate a temporary URL for the selected file
      setimg(url); // Set the image URL in state
    }
  }

  const Uploads = () => {
    document.getElementById("fileInput").click(); // Simulate a click on the file input
  };


    return(

      <div style={{ marginTop: "190px" }}>


    <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload} 
      />



         <button onClick={Uploads}>Uploads</button>
         
         {img && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={img}
            alt="Uploaded"
            style={{ width: "300px", marginTop: "20px", borderRadius: "10px" }}
          />
        </div>
      )}






      </div>




    )




}








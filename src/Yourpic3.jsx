import React, { useEffect } from "react";

export default function Yourpic3() {
  const array = [
    {
      img: "https://i.postimg.cc/ZRxzPR7B/6-Sophisticated-Dark-Bedroom-Themes-for-Chic-and-Comfortable-Homes-333-Art-Images.jpg",
      name: "Room",
    },
    {
      img: "https://i.postimg.cc/k5ZvjFHL/adobe.jpg",
      name: "Sunder",
    },
    {
      img: "https://i.postimg.cc/j2GVt7C1/bangluru.jpg",
      name: "Room",
    },
  ];

  // Filter the array to get only the entries where name is "Room"
  const roomImages = array.filter((item) => item.name === "Room");

  // Log the filtered values in the console
  useEffect(() => {
    console.log('Filtered "Room" items:', roomImages);
  }, [roomImages]);

  // Render the filtered room images
  const renderRoomImages = roomImages.map((pre, index) => (
    <div key={index}>
      <img style={{ width: "90px", height: "80px" }} src={pre.img} alt={pre.name} />
      <p>{pre.name}</p>
    </div>
  ));

  return (
    <div style={{ marginTop: "180px" }}>
      {/* Display the filtered images */}
      {renderRoomImages}

      {/* Optionally, you can show the total count of "Room" entries */}
      <p>Total 'Room' entries: {roomImages.length}</p>
    </div>
  );
}

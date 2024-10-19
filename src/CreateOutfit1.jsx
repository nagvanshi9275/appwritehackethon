

import React from "react";

export default function CreateOutfit1() {

    const[imgurl, setimgurl] = React.useState("")

    const[url, seturl] = React.useState("")

   function Click(){

   // console.log(url)

   seturl(imgurl)

   console.log(url)



   }

   function Geturl(){

 //  console.log()

// set

setimgurl("uhfuhudf")


   }


   return(

     <div>



     <button onClick={Click}  style={{ marginTop: '200px' }}>Click</button>

     <button onClick={Geturl}   style={{ marginTop: '200px' }}>Geturl</button>


     </div>



   )



  
}








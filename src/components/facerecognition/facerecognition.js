import React from 'react';   
import  './facerecognition.css';

const Facerecoginition =({box,imgUrl})=>{
   
    const  top =box.top_row*100;
    const  bottom =(1-box.bottom_row)*100;
    const left = box.left_col*100;
    const right =(1-box.right_col)*100;
    console.log(top,left,bottom,right);
     return(
        
     <div className ="ma1  "  style={{ display:'flex', justifyContent:'center'}} >
         <div className ="absolute mt2">   
        <img id="faceimg" alt="" width="350" height="auto" src= {imgUrl}/>
        <div className="bounding-box" style={{top:top+'%',left:left+'%',bottom:bottom+'%',right:right+'%'}}></div>
        </div>
       
    </div>
     )
     }

  export default Facerecoginition; 

     
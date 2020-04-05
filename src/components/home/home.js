import React from 'react';
import Imagelinkform from '../imglinkform/imglinkform';
import Rank from '../rank/rank';
import Facerecognition from '../facerecognition/facerecognition';



const Home =({oninputchange,User,onsubmitclick,box,imgurl})=>{
   
   return(
       <div>
      <Rank  user={User}/>
    <Imagelinkform onInputChange={oninputchange} onSubmitClick={onsubmitclick}/>
      <Facerecognition box={box} imgUrl={imgurl}/> 
      </div>
    )

}

export default Home;


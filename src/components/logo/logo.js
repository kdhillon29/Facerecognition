
import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
 
 const  Logo = () => {

return(
    
<Tilt className="Tilt mt1 ml6 " options={{ max :30,scale:1.5 }} style={{ height:'auto', width: 100 }} >
 <div className="Tilt-inner "> <img src={brain} alt="brain" /> </div>
</Tilt>

)   
 }


 export default Logo;


import React from 'react';

 
 const  Rank = ({user}) => {

return(
    
     <div className="white tc ">
       <p className ="f3 mb0  ">{user.name} your rank is!</p>
       <p className ="f1 mt0 mb0 fw3 ">#{user.enteries}</p>

     </div>
 

)   
 }


 export default Rank;


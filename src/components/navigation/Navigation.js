import React from 'react';
//import { findByLabelText } from '@testing-library/react';


 const Navigation = ({handleClick,isSignIn}) => {

         return isSignIn?(
              <nav className ="mt1 pa2 mr4">  
                 <p onClick={()=>handleClick('signin')} className="f3 link dim white pointer pa3 underline mt0 "> Sign Out  </p> 
              </nav>

         ):
         (
            <nav className ="mt1 pa2 mr2">  
               <p onClick={()=>handleClick('signin')} className="f3 link dib white pointer pa3 underline mt0 "> Sign In  </p> 
               <p onClick={()=>handleClick('register')} className="f3 link dib white pointer pa3 underline mt0 "> Register  </p> 
            </nav>
         )
    
};
export default Navigation;
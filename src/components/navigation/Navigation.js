import React from 'react';
//import { findByLabelText } from '@testing-library/react';
import CardProfile from '../profilemenu/profilemenu';
import {Link} from 'react-router-dom';
 const Navigation = ({handleClick,isLogin,user}) => {

         return isLogin?(
              <nav className ="mt1 pa2 mr4 f3  pointer ">  
      
                      <CardProfile handleclick={handleClick} user={user}/> 
              </nav>

         ):
         (
            <nav className ="mt1 pa1 mr3" style={{display:'flex',justifyContent:'right'}}> 
                <Link to='/'  className="f4  grow shadow-3 mr3 link white pointer pa2 underline  "> Home  </Link>  
               <Link to='/signin'  className="f4  grow shadow-3 mr3 link white pointer pa2 underline  "> SignIn  </Link> 
               <Link to='/register' className="f4 grow shadow-3 mr3 link white pointer pa2 underline  "> Register  </Link> 
            </nav>
         )
    
};
export default Navigation;
import React from 'react';    
import './imglinkform.css';
const Imglinkform =({onInputChange,onSubmitClick})=>{

     return(

     <div  className="center1" style={{ alignItems:'center',flexDirection:'column'}} >
        <p className=" f4 tc grey mb0 " style={{}}>
        {'This magic brain will detect faces in your pictures.git it a try!'}
        </p>
        
       <div style={{}} className="form center1 pa4 br3  shadow-5"  >     
        <input onChange={onInputChange} className="  f3 item2  pa1 ml0  bg-light-green " type ="text" />
        <button  onClick={onSubmitClick} className=" f3 grow item1 link   white  bg-light-purple" type="submit" > Detect </button>
        </div>
    </div>
     )
     }

  export default Imglinkform; 

     





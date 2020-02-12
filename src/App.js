import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/logo';
import Imagelinkform from './components/imglinkform/imglinkform';
import Rank from './components/rank/rank';
import Facerecognition from './components/facerecognition/facerecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Login from './components/login/signin';

const params ={
  "particles": {
      "number": {
          "value": 90,
          "density": {
              "enable": true,
              "value_area": 1500
          }
      },
      "line_linked": {
          "enable": true,
          "opacity": 0.02
      },
      "move": {
          "direction": "right",
          "speed": 0.05
      },
      "size": {
          "value": 1
      },
      "opacity": {
          "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.05
          }
      }
  },
  "interactivity": {
      "events": {
          "onclick": {
              "enable": true,
              "mode": "push"
          }
      },
      "modes": {
          "push": {
              "particles_nb": 1
          }
      }
  },
  "retina_detect": true
}
 
const app = new Clarifai.App({
  apiKey: '5e03e4265243415eb8ae2545614639f8'
 });

class  App extends React.Component {
    constructor(){
     super();
     this.state={
        input:'',
        imgUrl:'',
        box:{},
        route:'signin',
        isSignIn:false

     }
    }

      faceBox =(data)=>{
        
        const img =document.getElementById('faceimg');
        const width= Number(img.width);
        const height= Number(img.height);
        console.log(width,height);
        const top = Number(data.top_row *height);
        console.log(top);
        const right = width-Number(data.right_col*width);
        const bottom = height -Number(data.bottom_row *height);
        const left = Number(data.left_col *width);
        const box={top,right,bottom,left};
        console.log(data);
         this.setState({box:data})
          
      }
    onInputChange =(event)=>{
         this.setState({input:event.target.value})
      }

      onSubmitClick =(event)=>{
       // console.log("button clicked" + event.target);
       this.setState({imgUrl:this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
        .then(response => {
          console.log( response.outputs[0].data.regions[0].region_info.bounding_box);
          const data =response.outputs[0].data.regions[0].region_info.bounding_box
          this.faceBox(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  
    onRouteChange =(route)=>{
      
      if(route==='home')  
        this.setState({route,isSignIn:true});
        else 
        this.setState({route,isSignIn:false});
 
    }
      
    render(){
      // #add comments
    const  {onInputChange,onSubmitClick,onRouteChange} = this;
  return (
    
     <div>  
      <Particles params={params} className="particles"/>
    <div className="App" style ={{ display:'flex',backgroundColor:"green",justifyContent:'space-between'}}>
      <Logo/>
      <Navigation handleClick={onRouteChange} isSignIn={this.state.isSignIn}/>
       </div>
      { this.state.route ==='home'? 
       <> <Rank/>
      <Imagelinkform onInputChange={onInputChange} onSubmitClick={onSubmitClick}/>
        <Facerecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
       </>: this.state.route==='register'?<Login  handleClick={onRouteChange} register/>:
       <Login  handleClick={onRouteChange} />
    }
    </div>
       
   )
  }
}

export default App;

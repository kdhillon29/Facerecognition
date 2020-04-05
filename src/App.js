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
import Profile from './components/profile/Profile';
import Home from './components/home/home';
import PrivateRoute from './components/privateroute/privateroute';
import Register from './components/register/register';

import { BrowserRouter, Route,Redirect, Switch } from 'react-router-dom';

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
 
const clarifai_app = new Clarifai.App({
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
        isSignIn:false,
        showProfile:false,
        user:{id:'',
        name:'',
        email:'',
        enteries:0,
        joined:''
      },
      isLogin:false

     }
    }
       loadUser=(data)=>{
          this.setState({user:data,isLogin:true});
          
          console.log('is login turned true',this.state.isLogin);
          console.log("user state is",this.state.user);
         // if(this.state.isLogin) return "<Redirect to='/register' />"
       }
      faceBox =(data)=>{
        
        // const img =document.getElementById('faceimg');
        // const width= Number(img.width);
        // const height= Number(img.height);
        // console.log(width,height);
        // const top = Number(data.top_row *height);
        // console.log(top);
        // const right = width-Number(data.right_col*width);
        // const bottom = height -Number(data.bottom_row *height);
        // const left = Number(data.left_col *width);
        // const box={top,right,bottom,left};
        console.log(data);
         this.setState({box:data})
          
      }
    onInputChange =(event)=>{
      console.log('handle click',event.target.value)
         this.setState({input:event.target.value})
      }

      onSubmitClick =(event)=>{
       // console.log("button clicked" + event.target);
       this.setState({imgUrl:this.state.input})
        clarifai_app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
        .then(response => {
             if(response){
                 fetch('http://localhost:3000/image/', {
                       method: 'put',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify({id:this.state.user.id })
                     })
                    .then(response => response.json())
                    .then(count=>{console.log("counts are",count);
                    this.setState({user:{...this.state.user,enteries:count}})
                        
                     })
                     .catch(err=>console.log("error occured",err))
          }
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
      else if(route==='profile')this.setState({showProfile:true})

        else 
        this.setState({route,isSignIn:false,imgUrl:'',box:{}});
 
    }
     onSignout =()=>{
         this.setState({user:{},box:{},imgUrl:'', isLogin:false});
         return <Redirect to='/' />
        
     }
      componentDidMount(){
        // fetch('http://localhost:3000/')
        // .then(response=>response.json())
        // .then(data=>console.log(data))
      }
    render(){
      // #add comments
    const  {onInputChange,onSubmitClick,onRouteChange,loadUser} = this;
    const {name,enteries} =this.state.user;
  return (
    
     <div>  
      <Particles params={params} className="particles"/>
    <div className="App" style ={{ display:'flex',backgroundColor:"green",justifyContent:'space-between'}}>
      <Logo/>
      <Navigation handleClick={onRouteChange} isLogin={this.state.isLogin} user={this.state.user}/>
       </div>
       <main>
            <Switch>
              <PrivateRoute path='/' isLogin={this.state.isLogin}  oninputchange={this.onInputChange} User={this.state.user} box={this.state.box} imgurl ={this.state.imgUrl}
                   onsubmitclick={this.onSubmitClick} component ={Home} exact />
                {/* <PrivateRoute path="/" user={this.state.user}  render={(props) => <Home {...props} 
                 oninputchange={this.onInputChange} user={this.state.user} box={this.state.box} imgurl ={this.state.imgUrl}
                   onsubmitclick={this.onSubmitClick} />}
                  exact /> */}
                <Route path="/signin"  render={(props) => <Login {...props} loaduser={this.loadUser} />  } />
                <Route path="/register"   component={Register} />
                <PrivateRoute path="/profile" isLogin={this.state.isLogin}  user={this.state.user}  component={Profile} />
                <Route path='/signout' component={this.onSignout} />
                <Route component={Error} />
            </Switch>
        </main>
      {/* { this.state.route ==='home'? 
      this.state.showProfile?    <Profile id={this.state.user.id} />: <> <Rank  user={this.state.user}/>
      <Imagelinkform onInputChange={onInputChange} onSubmitClick={onSubmitClick}/>
        <Facerecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
       </>: this.state.route==='register'?<Login  handleClick={onRouteChange} register/>:
       <Login  handleClick={onRouteChange} loaduser={loadUser} />
    } */}
    </div>
       
   )
  }
}

export default App;

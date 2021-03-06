import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as doneData from "./checked-done.json";
import {Redirect} from'react-router-dom';

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 50%;
//   height: 200px;
  margin: 5px auto;
  //border: .5px solid #000;
  border-radius: 20px;
  padding-bottom:20px;
  background: lightgreen;
  h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
  button {
    background: green;
    color: #fff;
    padding: 10px;
    margin: 5px;
    width: 50%;
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
  }
`;

const StyledInput = styled.input`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 70%;
  box-sizing: border-box;
`;
const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      success: false,
      error: '',
      register: { name: '', email: '', password: '' },
      isEmpty: { name: '', email: '', password: '' },
      redirectToReferrer:false,
      redirect:'',
    }

  }
  handleChange = (event) => {
    this.setState({ error: '' });
    console.log("event is", event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value });

    //console.log(this.state)
  }

  handleRegisterChange = (e) => {
    this.setState({ error: '', isEmpty: { ...this.state.isEmpty, [e.target.name]: false } });
    console.log("event is", e.target.name, e.target.value)
    this.setState({ register: { ...this.state.register, [e.target.name]: e.target.value } });
    console.log(this.state.register)
  }



  handleSignin = () => {
    console.log('props are',this.props);
   
    
    this.setState({ loading: true });
    setTimeout(() => {

      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "email": this.state.email, "password": this.state.password })

      })
        .then(response => response.json())
        .then(data => {
          this.setState({ loading: false });
          if (data.user) {
            this.setState({ success: true,redirectToReferrer:true })
           const redirect = this.props.loaduser(data.user);
           this.setState({redirect});
           console.log("redirect is",redirect)
            console.log("data is:", data.user);

           // setTimeout(() => this.props.handleClick('home'), 2000)
          }

          else {
            this.setState({ error: data.error });
            console.log('cant login:', data);
          }
        })
        .catch(err => console.log("error happened:", err))
    }, 2000)


  }
  






  
  render() {
    //if(this.state.redirect) return this.state.redirect;
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    console.log('referre is', redirectToReferrer);
    console.log('from is',from)
    if (redirectToReferrer === true) {
      return <Redirect to={{pathname:from.pathname, state:{ isLogin:true} }} />
    }
    const { handleClick, register } = this.props;
    const { loading } = this.state;
    const { name, email, password } = this.state.isEmpty;
    
    return !register ? (
      <StyledLogin className="shadow-5">
        <h1 style={{fontWeight:'700',padding:'1px',textAlign:'center', marginTop:'0px', width:'100%',background:'lime'}}>Login</h1>

        <FadeIn>
          <div>{this.state.error ? <p style={{ color: 'red' }}>Error:{this.state.error}</p> : ''}</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {this.state.loading || this.state.success ? <h1>Signining in</h1> : ""}
            {this.state.loading ? <ReactLoading type={"bars"} color={"white"} /> : ''}
            {this.state.success ? <Lottie options={defaultOptions2} height={120} width={120} /> : ''}
          </div>
        </FadeIn>




        <StyledInput onChange={this.handleChange} name="email" type="text" placeholder="email" />
        <StyledInput onChange={this.handleChange} name="password" type="password" placeholder="password" />
        <button onClick={this.handleSignin} className="grow ">Login</button>
      </StyledLogin>
    )
      : (
        <StyledLogin className="shadow-5">
          <h1 className="tc mt0 pa1" style={{fontWeight:'700',width:'100%',background:'magenta'}}>Register</h1>
          <FadeIn>
            <div>{this.state.error ? <h1 style={{ color: 'red' }}>Error:{this.state.error}</h1> : ''}</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>

              {this.state.loading ? <div><h3>Registering.. </h3><ReactLoading type={"bars"} color={"white"} /></div> : ''}
              {this.state.success ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Lottie options={defaultOptions2} height={150} width={150} /><h3>Done!</h3></div> : ''}
            </div>
          </FadeIn>

          <StyledInput style={{ border: name ? '1px solid red' : '' }} onChange={this.handleRegisterChange} name="name" type="text" placeholder="Name" />
          <StyledInput style={{ border: email ? '1px solid red' : '' }} onChange={this.handleRegisterChange} name="email" type="text" placeholder="email" />
          <StyledInput style={{ border: password ? '1px solid red' : '' }} onChange={this.handleRegisterChange} name="password" type="password" placeholder="password" />
          <button onClick={this.handleRegister} className="grow ">Register</button>
        </StyledLogin>
      );

  }

}

// ({handleClick,register}) => !register? (
//   <StyledLogin className="shadow-5">
//     <h2>Login</h2>
//     <StyledInput type="text" placeholder="email" />
//     <StyledInput type="password" placeholder="password" />
//     <button onClick={()=>handleClick('home')} className ="grow ">Login</button>
//   </StyledLogin>
// )
//  :(
//     <StyledLogin className="shadow-5">
//       <h2>Register</h2>
//       <StyledInput type="text" placeholder="Name" />
//       <StyledInput type="text" placeholder="email" />
//       <StyledInput type="password" placeholder="password" />
//       <button onClick={()=>handleClick('home')} className ="grow ">Register</button>
//     </StyledLogin>
//   );

export default Login;
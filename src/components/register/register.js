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
class Register extends React.Component {

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
      redirectToSignin:false
    }

  }
  
  handleRegisterChange = (e) => {
    this.setState({ error: '', isEmpty: { ...this.state.isEmpty, [e.target.name]: false } });
    console.log("event is", e.target.name, e.target.value)
    this.setState({ register: { ...this.state.register, [e.target.name]: e.target.value } });
    console.log(this.state.register)
  }



  
  handleRegister = () => {
    this.setState({ loading: true });
    let isEmpty = [];
    let name, email, password;
    if (this.state.register.name == '') { name = true; }
    if (this.state.register.email == '') { email = true; }
    if (this.state.register.password == '') { password = true; }
    console.log("isempty", isEmpty)



    this.setState({ isEmpty: { ...this.state.isEmpty, email, name, password } })
    console.log("in state", this.state.isEmpty)
    // let name =document.getElementsByName(el);
    // console.log(name[0]);
    // name[0].style.border='1px solid red';


    setTimeout(() => {

      fetch('http://localhost:3000/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.register)

      })
        .then(response => response.json())
        .then(data => {
          this.setState({ loading: false });
          if (data.id) {
            this.setState({ success: true })
            console.log("data is:", data);
           // this.props.loaduser(data.user);
            setTimeout(() => {this.setState({success:false,redirectToSignin:true});}, 3000)
          }

          else if (!data.id) {
           this.setState({ error: data.error });
             console.log('cant login:', data);
           }
        })
        .catch(err => {
          this.setState({ error: err });
          console.log("error happened:", err);
        })
    }, 2000)



  }
  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/' } }
    // const { redirectToReferrer } = this.state
    // console.log('referre is', redirectToReferrer);
    // console.log('from is',from)
    // if (redirectToReferrer === true) {
    //   return <Redirect to={{pathname:'/register', state:{ isLogin:true}}} />
    // }
    //const { handleClick, register } = this.props;
    const { loading } = this.state;
    const { name, email, password } = this.state.isEmpty;
    if(this.state.redirectToSignin){return <Redirect to='/signin' />
    }
       
    return(

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

export default Register;
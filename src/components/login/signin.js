import React from "react";
import styled from "styled-components";

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

const Login = ({handleClick,register}) => !register? (
  <StyledLogin className="shadow-5">
    <h2>Login</h2>
    <StyledInput type="text" placeholder="email" />
    <StyledInput type="password" placeholder="password" />
    <button onClick={()=>handleClick('home')} className ="grow ">Login</button>
  </StyledLogin>
)
 :(
    <StyledLogin className="shadow-5">
      <h2>Register</h2>
      <StyledInput type="text" placeholder="Name" />
      <StyledInput type="text" placeholder="email" />
      <StyledInput type="password" placeholder="password" />
      <button onClick={()=>handleClick('home')} className ="grow ">Register</button>
    </StyledLogin>
  );
  
export default Login;
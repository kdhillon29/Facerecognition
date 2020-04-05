import React from 'react';
import {BrowserRouter,withRouter, Route,Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component,isLogin, ...rest }) => (
       // console.log('islogin',isLogin)
    <Route {...rest} render={(props) => (
     // fakeAuth.isAuthenticated === true
    //  console.log('props userid is')
    // if(location){
    //     location.state.isLogin ? <Component {...rest } {...props} />
    //     : <Redirect to={{
    //         pathname: '/signin',
    //         state: { from: props.location }
    //     }} />
    // }
              //  if(props.location.state.hasOwnProperty("isLogin")||isLogin)
      
         props.location.state||isLogin  ? <Component {...rest } {...props} />
        : <Redirect to={{
            pathname: '/signin',
            state: { from: props.location }
        }} />
            //<Redirect to='/signin' />
    )} />
  )
  
  export default PrivateRoute;
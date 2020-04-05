import React from 'react';
import { getQueriesForElement } from '@testing-library/react';

  async function getUser(id){

   const response = await( fetch(`http://localhost:3000/profile/${id}`)
                           .then(response =>{return response.json()})
                           .catch(err=>console.log(err))
   )

 //const user = await response;

       console.log('in getuser',response)
       return response;

  };
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profile:{}
        }
    }
    componentDidMount(){
        // const id =this.props.id;
        //  getUser(id)
        //  .then(user=>{ console.log('in didmount',user);
        //  this.setState({profile:user})
        
       // })
       const user =this.props.user;
       console.log('user profile is',user)
       this.setState({profile:user})
    }
   render(){ 
       return(
        
        <article className="center mw5 mw6-ns hidden ba mv4">
  <h1 className="f4 bg-near-black white mv0 pv2 ph3">Profile</h1>
  <div className="pa3 bt">
    
    <div className="dtc w2 w3-ns v-mid">
        <img src="http://mrmrs.github.io/photos/p/2.jpg" className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"/>
      </div>
           <h1>{this.state.profile.name}</h1>
           <h2>{this.state.profile.email}</h2>
           <h2>{this.state.profile.enteries}</h2>
        
    
  </div>
</article>
        
       )
   }
} 
     
export default Profile;


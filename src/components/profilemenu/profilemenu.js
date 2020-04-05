import React, { Component } from 'react';

import FadeIn from "react-fade-in";
import {Link} from 'react-router-dom';

class CardProfile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  render() {
    return (
      <div>
        {/* <button onClick={this.showMenu}> */}
        <article onClick={this.showMenu} className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
      <div className="dtc w2 w3-ns v-mid">
        <img src="http://mrmrs.github.io/photos/p/2.jpg" className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"/>
      </div>
      <div className="dtc v-mid pl3">
        <h1 className="f6 f5-ns fw6 lh-title black mv0"> {this.props.user.name} </h1>
        <h2 className="f6 fw4 mt0 mb0 black-60">{this.props.user.email}</h2>
      </div>
      
    </article>
         
        
        
        {
          this.state.showMenu
            ? (
              <div style={{display:'flex',position:'fixed',top:10,right:0, background:'grey',flexFlow:'column', marginTop:'0px'}}
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                  <FadeIn> 
             <ul className="list mt0 pa0">
                 <li  className="ph3 link  f3 white pv0 bb b--light-silver">
                  <Link to='/profile' className="ph3 link f3 white pv0 bb b--light-silver">Profile</Link>
                 </li>
                 <li  className="ph3 link  f3 white pv0 bb b--light-silver">
                    <Link to='/signout' className="link dim white f3 f5-ns dib mr3" href="#" title="SignOut">Sign Out</Link>
                </li>
             </ul>
                </FadeIn>
        {/* <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">Profile</li>
        <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">Sign Out</li> */}
                {/* <a className="link  gray f2 f5-ns dib mr3" href="#" title="Profile">Profile</a>
                <a className="link dim gray f2 f5-ns dib mr3" href="#" title="SignOut">Sign Out</a> */}
                
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}
export default CardProfile;
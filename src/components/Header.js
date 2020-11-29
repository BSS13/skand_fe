import React from 'react';
import { connect } from 'react-redux';
import {  LOGOUT_REQUESTED } from '../redux/actions/user-action';
import { useHistory } from 'react-router-dom';

const Header = ({
    logout 
  })=>{
    const history = useHistory();
    const check = ()=>{
        logout();
        localStorage.removeItem("token");
        history.push("/");
    }
    return(
        <nav>
        <div class="nav-wrapper" style={{backgroundColor:'black',color:'#dfe3e6'}}>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/users">Home</a></li>   
        <li onClick={check} style={{cursor:'pointer'}}>Logout</li>
        </ul>
       </div>
      </nav>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
  })
  
  const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch({type: LOGOUT_REQUESTED})
  })
  
export default connect(mapStateToProps,mapDispatchToProps)(Header)

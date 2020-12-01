import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  GET_SPECIFIC_USER_REQUESTED } from '../redux/actions/user-action';
import Header from './Header';
import { Title, Title2 } from './Theme';


const User = ({
  user: {loading, users},
  getSpecificUser 
})=>{
    const uid = useParams().uid;
    useEffect(()=>{
        getSpecificUser(uid);
    },[getSpecificUser,uid]);

     return(
       <>
       <Header/>
         {loading && <div className="preloader-wrapper big active">
    <div className="spinner-layer spinner-blue-only">
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
    </div>
  </div>}
         
         <Title>Individual User Page</Title>
         {!loading &&  (
           <>
<div className="card" style={{border:'1px solid black',width:'90%',margin:'auto'}}>

       <div className="row">

        <div className="col s4">
            <i className="large material-icons">person</i><br/>
         </div>
         
        <div className="col s8">
          <Title2>{users.first_name} {users.last_name} ({users.id})</Title2>
          <Title2>Active: {String(users.active)}</Title2>
        </div>
      
       </div>      

        <div style={{backgroundColor:'#010203',padding:'5px'}} className="row">

           <div className="col s4" style={{color:'#dfe3e6'}}>
            <i className="material-icons">email</i><br/>{users.email}
           </div>

          <div className="col s4" style={{color:'#dfe3e6'}}>
             <i className="material-icons">assignment</i><br/>{users.jobs_count}
          </div>

          <div className="col s4" style={{color:'#dfe3e6'}}>
            <i className="material-icons">card_membership</i><br/>{users.slack_username}
           </div>

      </div>
     </div>

      </>
         )}
  </>
     )
};

User.propTypes = {
  getSpecificUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  getSpecificUser: (uid) => dispatch({type: GET_SPECIFIC_USER_REQUESTED, payload: uid})
})

export default connect(mapStateToProps,mapDispatchToProps)(User)


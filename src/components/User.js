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
    },[]);


     return(
       <>
         {loading && <h1>Still Loading ......</h1>}
         <Header/>
         <Title>Individual User Page</Title>
         { users &&  (
           <>
<div class="card">

       <div class="row">

        <div class="col s3">
            <i class="large material-icons">person</i><br/>
         </div>

        <div class="col s9">
          <Title2>{users.first_name} {users.last_name} ({users.id})</Title2>
          <Title2>Active: {String(users.active)}</Title2>
        </div>
      
       </div>      

        <div style={{backgroundColor:'#010203',padding:'5px'}} class="row">

           <div class="col s4" style={{color:'#dfe3e6'}}>
            <i class="material-icons">email</i><br/>{users.email}
           </div>

          <div class="col s4" style={{color:'#dfe3e6'}}>
             <i class="material-icons">assignment</i><br/>{users.jobs_count}
          </div>

          <div class="col s4" style={{color:'#dfe3e6'}}>
            <i class="material-icons">card_membership</i><br/>{users.slack_username}
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


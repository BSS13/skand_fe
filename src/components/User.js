import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {  GET_SPECIFIC_USER_REQUESTED } from '../redux/actions/user-action';
import { Button } from './Theme';
import {Link} from 'react-router-dom';

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
         
         <h1>Individual User Page</h1>
         <Button><Link to="/users">Back</Link></Button>
         { users &&  (
           <>
<div class="card">

       <div class="row">

        <div class="col s3">
            <i style={{ display:'inline-block'}}class="large material-icons">person</i><br/>
         </div>

        <div class="col s9">
          <h4>{users.first_name} {users.last_name} ({users.id})</h4>
          <h5>Active: {String(users.active)}</h5>
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

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  getSpecificUser: (uid) => dispatch({type: GET_SPECIFIC_USER_REQUESTED, payload: uid})
})

export default connect(mapStateToProps,mapDispatchToProps)(User)


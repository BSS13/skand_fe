import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {  GET_SPECIFIC_USER_REQUESTED } from '../redux/actions/user-action';
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
         <button><Link to="/users">Back</Link></button>

         {users && console.log(users)}
         
         { users &&  (
           <>
            <h4>{users.id}</h4>
            <h3>{users.email}</h3>
            <h3>{users.first_name}</h3>
            <h3>{users.last_name}</h3>
            <h3>{users.jobs_count}</h3>
            <h3>{users.slack_username}</h3>
            <h3>{users.active}</h3>
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


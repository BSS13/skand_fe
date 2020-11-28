import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { connect } from 'react-redux';
import {  GET_USERS_REQUESTED, DELETE_USER_REQUESTED } from '../redux/actions/user-action';

const Users = ({
    user: {loading, users},
    getUsers,
    deleteUser 
}) => {

    useEffect(()=>{
       getUsers();
    },[]);


    

    return(
        <>
        {loading && <h1>Loading details</h1>}
        
        <div>
        <h1>Hello User List Page</h1>
        <Link to="/createUser">Add New User</Link>
        <table>
          <thead>
              <th>ID</th>
              <th>Email</th>
              <th>Jobs Count</th>
              <th>Active</th>
              <th></th>
         </thead>  
        
         <tbody>
        
        
        { users &&  users.map((user)=>(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.jobs_count}</td>
                    <td>{user.active}</td>
                    <td>
                        <Link to={`/user/${user.id}`}>View</Link> 
                        <Link to={`/updateuser/${user.id}`}>Edit</Link>
                        <button onClick={deleteUser.bind(this,user.id)}>Delete</button>
                    </td>
                </tr>
            ))
            
        }
        </tbody>   
        </table>


       </div> 
       </>
    )
};

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => dispatch({type: GET_USERS_REQUESTED}),
    deleteUser: (id) => dispatch({type: DELETE_USER_REQUESTED, payload: id})
})

export default connect(mapStateToProps,mapDispatchToProps)(Users)
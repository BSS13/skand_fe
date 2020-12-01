import React, { useEffect, useState } from 'react'; 
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { Table } from './Table';
import { Title, Button2, Styles } from './Theme';
import {  GET_USERS_REQUESTED, DELETE_USER_REQUESTED } from '../redux/actions/user-action';



const Users = ({
    user: {loading, users},
    getUsers,
    deleteUser 
}) => {



    const color = ['#4CAF50','#24a0ed','#f0ad4e','#d9534f'];

    useEffect(()=>{
       getUsers();
    },[]);

    const columns = [
        {
          Header: 'ID',
          accessor: 'id',
          Cell: ({cell:{value}}) =>{

           
            return(
                <>
                <p>{value}</p>
                <Link to={`/user/${value}`}><Button2  color={color[1]}>View</Button2></Link>
                <Link to={`/updateuser/${value}`}><Button2 color={color[2]}>Edit</Button2></Link>
                <Button2 onClick={deleteUser.bind(this,value)} color={color[3]}>X</Button2>
                </>
            )
        },
          disableFilters: true
        }, {
          Header: 'Email',
          accessor: 'email',
        //   Filter: SelectColumnFilter
        }, {
          Header: 'Jobs Count',
          accessor: 'jobs_count',
          disableFilters: true
        }, {
          Header: 'Active',
          accessor: 'active',
        //   Filter: SelectColumnFilter
        }
      ];

      
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
        
         
        <Title>Registered Users</Title>
      
        
        <Link style={{textDecoration:'none', color:'#010203'}} to="/createUser"><Button2 color={color[0]}>Add New User</Button2></Link>     
        <Styles>
           {users && <Table data = {users} columns={columns}/>}
        </Styles>
        
       </>
    )
};

Users.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  }

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => dispatch({type: GET_USERS_REQUESTED}),
    deleteUser: (id) => dispatch({type: DELETE_USER_REQUESTED, payload: id})
})

export default connect(mapStateToProps,mapDispatchToProps)(Users)
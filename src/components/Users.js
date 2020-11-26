import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';

export const Users = () => {

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        let token = localStorage.getItem("token");
        console.log(token);

        fetch("/api/v2/users/", {
            method: "get",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
        })
        .then(response => response.json())
        .then((users) => {
          let usersArray = users.users;
          setUsers(usersArray);
          console.log(usersArray);
        })
    },[]);


    const deleteUser = (id)=>{
        fetch(`/api/v2/users/${id}`, {
            method: "delete",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
         .then( (response) => { 
         console.log("User deleted Successfully");
         setUsers([...users.filter(user => user.id !== id)])
         
          
    });
}

    return(
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
        
        {
            (users.map((user)=>(
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
            )
        }
        </tbody>   
        </table>


       </div> 
    )
};
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

export const User = ()=>{
     
    const [user,setUser] = useState([]);
    const uid = useParams().uid;
    useEffect(()=>{
        let token = localStorage.getItem("token");
        console.log(token);
        

        fetch(`/api/v2/users/${uid}`, {
            method: "get",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
        })
        .then(response => response.json())
        .then((user) => {
        
          console.log(user.users);
          setUser(user.users);
        })
    },[]);


     return(
         <div>
         <h1>Individual User Page</h1>
         <h4>{user.id}</h4>
         <h3>{user.email}</h3>
         <h3>{user.first_name}</h3>
         <h3>{user.last_name}</h3>
         <h3>{user.jobs_count}</h3>
         <h3>{user.slack_username}</h3>
         <h3>{user.active}</h3>
     </div>
     )
};


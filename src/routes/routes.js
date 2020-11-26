import React from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import { Login, Users, User, CreateUser, UpdateUser } from '../components';

export const Routes = (props) =>{
    return (
        <Router>
         
          <Switch>
            
            <Route exact path="/"><Login/></Route>
            <Route exact path="/users"><Users/></Route>
            <Route exact path="/user/:uid"><User/></Route>
            <Route exact path="/createUser"><CreateUser/></Route>
            <Route exact path="/updateuser/:uid"><UpdateUser/></Route>
          </Switch>

        </Router>
    )
}

import React from 'react';
import logo from './logo.svg';
import { Routes } from './routes/routes';
import { Provider } from 'react-redux';
import store from './redux/store';
import Users from './components/Users';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
       {/* <Users/> */}
       </Routes>
      </Provider> 
    </div>
  );
}

export default App;

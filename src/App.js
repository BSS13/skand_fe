import React from 'react';
import { Routes } from './routes/routes';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
       </Routes>
      </Provider> 
    </div>
  );
}

export default App;

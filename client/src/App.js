import React from 'react';
import ItemListContainer from './containers/main'
import { Route } from 'react-router-dom';
import LoginPages from './pages/loginPages'

function App() {
  return (
    <div className="App">
      <Route component = {ItemListContainer} path = '/' exact /> 
      <Route component = {LoginPages} path = '/login'/> 
    </div>
  );
}

export default App;

import React from 'react';
import ItemListContainer from './containers/main'
import { Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Route component = {ItemListContainer} path = '/'/> exact>
    </div>
  );
}

export default App;

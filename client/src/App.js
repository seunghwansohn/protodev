import React from 'react';
import ItemListContainer from './containers/itemList'
import MainHeader from './containers/common/MainHeader'
import LoginPages from './pages/loginPages'
import ItemListPage from './pages/itemListPage'
<<<<<<< HEAD
import ClientPage from './pages/clientPage'
import TestPage from './pages/TestPage'
=======
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329

import RegisterPage from './pages/RegisterPage';
import About from './containers/About'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

function App() {
  let match = useRouteMatch();
  return (
    <div className="App">
          <div>
            <MainHeader></MainHeader>
                  <Route path = "/about">
                      <About></About>
                  </Route>
                  <Route component = {ItemListPage} path = "/" exact/>
          
                  <Route path = "/login" >
                      <LoginPages></LoginPages>
                  </Route>
                  
                  <Route path = "/register" >
                      <RegisterPage></RegisterPage>
                  </Route>
<<<<<<< HEAD

                  <Route path = "/test" >
                      <TestPage></TestPage>
                  </Route>
                  
                  <Route component = {ClientPage} path = "/client" exact/>

=======
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
                  
          </div>
    </div>
  );
}

export default App;

import React from 'react';
import ItemListContainer from './containers/main'
import MainHeader from './containers/common/MainHeader'
import LoginPages from './pages/loginPages'
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
  console.log(match)
  return (
    <div className="App">
          <div>
            <MainHeader></MainHeader>
                  <Route path = "/about">
                      <About></About>
                  </Route>
                  <Route path = "/" exact>
                      <ItemListContainer></ItemListContainer>
                  </Route>
                  <Route path = "/login" >
                      <LoginPages></LoginPages>
                  </Route>
                  <Route path = "/register" >
                      <RegisterPage></RegisterPage>
                  </Route>
                  
          </div>
    </div>
  );
}

export default App;

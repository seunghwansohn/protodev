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
          <Router>
          <div>
            <MainHeader></MainHeader>
              <Switch>
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
                  
              </Switch>
          </div>
          </Router>
      
    </div>
  );
}

export default App;

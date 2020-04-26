import React from 'react';
import MainHeader from './containers/common/MainHeader'
import LoginPages from './pages/loginPages'
import ItemListPage from './pages/ItemListPage'
import ClientPage from './pages/clientPage'
import TestPage from './pages/TestPage1'
import SuppliersPage from './pages/SuppliersPage'
import RegisterPage from './pages/RegisterPage';
import MakersPage from './pages/MakersPage';
import QuotesPage from './pages/quotesPage';
import ProjectPage from './pages/projectPage';
import TaskPage from './pages/TaskPage';

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

              <Route path = "/test" >
                  <TestPage></TestPage>
              </Route>

              <Route path = "/suppliers" >
                <SuppliersPage></SuppliersPage>
              </Route>

              <Route path = "/makers" >
                <MakersPage></MakersPage>
              </Route>

              <Route path = "/quotes" >
                <QuotesPage></QuotesPage>
              </Route>

              <Route path = "/project" >
                <ProjectPage></ProjectPage>
              </Route>

              <Route path = "/task" >
                <TaskPage></TaskPage>
              </Route>

              <Route component = {ClientPage} path = "/client" exact/>
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import ItemListContainer from '../main'
import LoginPages from '../../pages/loginPages'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const MainHeader = () => {
  return (
    <div>

        <div>
            <ul>
                <li>
                    <Link to = "/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">register</Link>
                </li>
            </ul>

        </div>
    </div>
  );
};

export default MainHeader;
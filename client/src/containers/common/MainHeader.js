import React from 'react';
import ItemListContainer from '../main'
import LoginPages from '../../pages/loginPages'
import Button from '../../components/common/Button';
import { logout } from '../../store/modules/user'
import { useDispatch, useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

console.log(typeof logout)
const MainHeader = () => {
    const dispatch = useDispatch();
    const onLogout = () => {
        console.log('하하');
        dispatch(logout());
    }
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
            <Button onClick = {onLogout}>버튼</Button>
        </div>
    </div>
  );
};

export default MainHeader;
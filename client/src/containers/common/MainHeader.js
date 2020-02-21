import React, { useEffect } from 'react'
import Button from '../../components/common/Button';
import { logout } from '../../modules/user'
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../modules/auth'
import { authtest } from '../../modules/authtest'


import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import styled from 'styled-components';

const PaginationBlock = styled.div`
    min-width: 696px;
    list-style: none;
    padding-top: 20px;
    li {
        display: inline-block;
        padding: 5px;

    }
`;


const MainHeader = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const {loginJustNow} = useSelector(({ auth }) => ({ loginJustNow: auth.justNow }));
    
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    }
    const check = () => {
    }
    const onSignIn = () => {
        dispatch(signIn())
    }
    const onCheck = () => {
        dispatch(authtest())
    }
    useEffect(() => {
        if (loginJustNow !== false) {
        }
    }, [loginJustNow]);
  return (
    <div>
        <PaginationBlock>
            <ul>
                <li>
                    <Link to = "/">Home</Link>
                </li>
                <li>
                    <Link to = "/client">Clients</Link>
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
                <li><button onClick = {onSignIn}>확인</button></li>
                Login: {user ? user.username : '없음'}
                <Button onClick = {onLogout}>로그아웃</Button>
                <Button onClick = {onCheck}> 체크 </Button>
            </ul>
        </PaginationBlock>


    </div>
  );
};

export default MainHeader;
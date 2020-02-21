<<<<<<< HEAD
import React, { useEffect } from 'react'
import Button from '../../components/common/Button';
import { logout } from '../../modules/user'
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../modules/auth'
import { authtest } from '../../modules/authtest'

=======
import React from 'react';
import Button from '../../components/common/Button';
import { logout } from '../../store/modules/user'
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/modules/auth'
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329

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

<<<<<<< HEAD

const MainHeader = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const {loginJustNow} = useSelector(({ auth }) => ({ loginJustNow: auth.justNow }));
    
=======
console.log(typeof logout)

const MainHeader = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    }
    const check = () => {
    }
<<<<<<< HEAD
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
=======

    const onSignIn = () => {
        dispatch(signIn())
    }
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
  return (
    <div>
        <PaginationBlock>
            <ul>
                <li>
                    <Link to = "/">Home</Link>
                </li>
                <li>
<<<<<<< HEAD
                    <Link to = "/client">Clients</Link>
                </li>

                <li>
=======
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">register</Link>
                </li>
                <li><button onClick = {onSignIn}>확인</button></li>
<<<<<<< HEAD
                Login: {user ? user.username : '없음'}
                <Button onClick = {onLogout}>로그아웃</Button>
                <Button onClick = {onCheck}> 체크 </Button>
            </ul>
        </PaginationBlock>


=======
            </ul>
        </PaginationBlock>

            {user ? user.username : '없음'}
            <Button onClick = {onLogout}>로그아웃</Button>
            <Button onClick = {check}> 체크 </Button>
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
    </div>
  );
};

export default MainHeader;
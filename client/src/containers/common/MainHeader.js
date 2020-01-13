import React from 'react';
import Button from '../../components/common/Button';
import { logout } from '../../store/modules/user'
import { useDispatch, useSelector } from 'react-redux';

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

console.log(typeof logout)

const MainHeader = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const dispatch = useDispatch();
    const onLogout = () => {
        console.log('하하');
        dispatch(logout());
    }
    const check = () => {
        console.log(user)
    }
  return (
    <div>
        <PaginationBlock>
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
        </PaginationBlock>

            {user ? user.username : '없음'}
            <Button onClick = {onLogout}>로그아웃</Button>
            <Button onClick = {check}> 체크 </Button>
    </div>
  );
};

export default MainHeader;
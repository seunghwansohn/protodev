import React from 'react';
import styled, { css } from 'styled-components';
//styled-components는 css파일을 따로 만들지 않고
//js파일안에 css문법으로 style을 규정할 수 있는 라이브러리

import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

<<<<<<< HEAD

=======
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;

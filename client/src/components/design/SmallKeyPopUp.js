import React from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

const StyledPaper = styled(Paper)`
  font-size: 8px;
  border: 1px solid black;
  width: 22px;
  text-align: center;
`;

export default function SimplePaper({ children }) {
  const popUpKeyName = children
  return (
    <>
      <StyledPaper elevation={1}>{popUpKeyName}</StyledPaper>
    </>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: #dddddd;
  width: 10px;
  margin: 0px;
  padding: 0px;

  .MuiButton-label {
    font-size: 7px;
    color: red;
    margin: 0px;
    border: none;
    padding: 0px;
    width: 2px;
  }
  .MuiButton-root {
    font-size: 100px;
    color: green;
    border: none;
    margin: 0px;
    width: 10px;
  }
  .MuiButton-sizeSmall {
    font-size: 100px;
    color: green;
    border: none;
    margin: 0px;
    padding: 0px;
    width: 10px;
  }
`;

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0)
  },
  extendedIcon: {
    marginRight: theme.spacing(0)
  }
}));

export default function ButtonSizes() {
  const classes = useStyles();

  return (
    <StyledButton
      size="small"
      className={classes.margin}
      style={{ minWidth: 30 }}
    >
      Small
    </StyledButton>
  );
}

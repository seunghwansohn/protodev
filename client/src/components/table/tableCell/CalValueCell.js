import React, {useEffect, useState} from 'react';

import styled   from "styled-components";

import TextField        from '@material-ui/core/TextField';
import InputAdornment   from '@material-ui/core/InputAdornment';

import Input            from '@material-ui/core/Input';

import TableCell        from '@material-ui/core/TableCell';

const MiniHelperText = styled(TextField)`
  .MuiInput-root	 {
    font-size : 13px;
  }
  .MuiFormHelperText-root {
    font-size : 7px;
    color : red;
    width : 100%;
  }
`
const colors = {
  fixable : '#fff4e2',
  unFixable : '#D3D3D3',
  fixed : '#FF7F50'
}

const StyledInput = styled(Input)`
  background-color: #ffffff;
  width: ${props => props.width ? props.width : 'auto'};
  &:hover {
    background-color : #eef534;
    font-weight: bold;
  }
`

const StyledTableCell = styled(TableCell)`
  background-color: ${
    props => props.fixMode ? 
      props.fixable ? 
        props.fixed ?
          colors.fixed
        : colors.fixable
      : colors.unFixable 
    : '#ffffff'
  };
  border-style : ${props => props.updated ? 'ridge':'none'};
  &:hover {
    font-weight: bold;
  }
  max-width : ${props => props.size};
  width : ${props => props.size};
`

const CalValueCell = ({
  key,
  attr,
}) => {
  const {
    fixMode,
    fixed,
    size,
    fixable,
    header,
    data,
    index,
    handleChangeInput,
    confirmInputFixedVal,
    onKeyPressOnInput,
    colAttr
  } = attr
  return (
    <>
      <StyledTableCell 
        fixMode = {fixMode} 
        fixed = {fixed} 
        size = {size} 
        fixable = {fixable}
      >
        <StyledInput
            disable 
            onChange = {(event) => handleChangeInput(event, index, header)} 
            key = {header }
            value = {colAttr[header].value(index)} 
            onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}
        />
      </StyledTableCell>
    </>
  )
}

export default CalValueCell
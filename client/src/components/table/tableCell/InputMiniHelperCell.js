import React, {useEffect, useState} from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import styled   from "styled-components";

import TextField        from '@material-ui/core/TextField';
import InputAdornment   from '@material-ui/core/InputAdornment';

import TableCell        from '@material-ui/core/TableCell';

import SmallKeyPopUp      from '../../design/SmallKeyPopUp';

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

const InputMiniHelper = ({
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
    helperText,
    primaryCode,
    handleChangeInput,
    onKeyPressOnInput
  } = attr
  return (
    <>
      <StyledTableCell 
        fixMode = {fixMode} 
        fixed = {fixed} 
        size = {size} 
        fixable = {fixable}
      >
        <MiniHelperText
          key   = {header}
          size  = 'small'
          style = {{width : '100%'}}
          value = {data[index][header]} 
          onChange = {(event) => handleChangeInput(event, index, header)} 
          onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}
          helperText = {helperText[primaryCode] ? helperText[primaryCode][header] : ''}
          InputProps = {{
            endAdornment : 
              <InputAdornment position="end">
                <SmallKeyPopUp>Enter</SmallKeyPopUp>
                <SmallKeyPopUp>Tab</SmallKeyPopUp>
              </InputAdornment>
          }}
        >
        </MiniHelperText>
      </StyledTableCell>
    </>
  )
}

export default InputMiniHelper
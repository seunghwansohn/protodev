import React, { useState, useEffect } from 'react'

import TextField                  from '@material-ui/core/TextField'
import InputAdornment             from '@material-ui/core/InputAdornment';
import Grid                       from '@material-ui/core/Grid';
import IconButton                 from '@material-ui/core/IconButton';
import EditIcon                   from '@material-ui/icons/Edit';
import { withStyles, makeStyles } from "@material-ui/core/styles";

import produce  from 'immer'

import styled   from 'styled-components';

const TextFieldST = styled(TextField)`
  background-color: 
    ${props => {
      if (props.type == 'fixable' && props.fixMode == false) {
        return '#ffffff'
      } else if (props.type == 'fixable' && props.fixMode == true){ 
        return '#ffe6ff'}}};
  label.Mui-focused {
    color: green;
    font-size : 18px;
    vertical-align : text-top;

  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red;
    }
    &:hover fieldset {
      border-color: yellow;
    }
    &.Mui-focused fieldset {
      border-bottom: green;
    }
  }
  input:valid {
    border-bottom: 4px solid pink;
  }      
`


const InputST = ({
  title, 
  state, 
  setState, 
  attr, 
  type, 
  fixMode, 
  fixable, 
  fixedData, 
  setFixedData, 

  required,
  variant,
  fullWidth,

  validation
}) => {

  const onChangeValue = (event, func) => {
    setState(event.target.value)
    let temp = {}
    let tempArr = fixedData
    temp[title] = event.target.value
    setFixedData(
      produce(fixedData, draft => {
        fixedData[title] = event.target.value
      })
    )
  }
  const onKeyPressInput = (event) => {
    if (event.key == "Enter") {
      let temp = {}
      let tempArr = fixedData
      temp[title] = event.target.value
      setFixedData(
        produce(fixedData, draft => {
          fixedData[title] = event.target.value
        })
      )
    }
  }

  return (
    <React.Fragment>
      <TextFieldST
        label={title}
        id={title}
        type = {validation}
        style={{width: "100%"}}
        required = {required}
        variant= {variant}
        fullWidth = {fullWidth}
        size = {'small'}
        value = {state}
        margin = {'none'}
        onChange = {(event) => onChangeValue(event, setState)}
        onKeyPress = {(event) => onKeyPressInput(event)}

        disabled = {type == 'fixable' && fixMode == true ? false : true}

      />
    </React.Fragment>
  )
}


export default InputST
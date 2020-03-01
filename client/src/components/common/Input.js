import React, { useState, useEffect } from 'react'

import TextField        from '@material-ui/core/TextField'
import InputAdornment   from '@material-ui/core/InputAdornment';
import Grid             from '@material-ui/core/Grid';
import IconButton       from '@material-ui/core/IconButton';
import EditIcon         from '@material-ui/icons/Edit';
import { withStyles, makeStyles } from "@material-ui/core/styles";

import produce from 'immer'

import styled from 'styled-components';

const TextFieldST = styled(TextField)`
  background-color: 
    ${props => {
      if (props.type == 'fixable' && props.fixMode == false) {
        return '#ffffff'
      } else if (props.type == 'fixable' && props.fixMode == true){ 
        return '#ffe6ff'}}};
  label.Mui-focused {
    color: green;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red;
    }
    &:hover fieldset {
      border-color: yellow;
    }
    &.Mui-focused fieldset {
      border-color: green;
    }
  }      
`
const InputST = ({title, state, setState, attr, type, lodedData, fixMode, fixable, fixedData, setFixedData}) => {
  const onChangeValue = (event, func) => {
    setState(event.target.value)  
  }

  const onKeyPressInput = (event) => {
    if (event.key == "Enter") {
      let temp = {}
      let tempArr = fixedData
      temp[title] = event.target.value
      fixedData.map(obj => {
        if (Object.keys(obj).includes(title)) {
          tempArr = tempArr.filter(function(obj) {
            return !obj[title]
          })
        } 
      })
      tempArr.push(temp)
      setFixedData(tempArr)
    }
  }

  return (
    <React.Fragment>
      <TextFieldST
        label={title}
        id={title}
        type = {type}
        update = {type ? true : false}
        style={{width: "95%"}}
        fixMode = {fixMode}
        variant="outlined"
        value = {state}
        disabled = {type == 'fixable' && fixMode == true ? false : true}
        onChange = {(event) => onChangeValue(event, setState)}
        onKeyPress = {(event) => onKeyPressInput(event)}
      />
    </React.Fragment>
  )
}


export default InputST
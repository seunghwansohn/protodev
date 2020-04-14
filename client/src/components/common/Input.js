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
  .MuiInputLabel-root{
    color: red;
    font-size : 18px;
    vertical-align : text-top;
  }
  label.Mui-focused {
    color: pink;
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
    border-bottom: 5px solid green;
  }  
  input:invalid {
    border-bottom: 5px solid red;
  }   
`


const InputST = ({
  attr, 
  type, 
  fixMode, 

  title, 
  inputVal, 
  onChangeVal, 

  fixedData, 
  setFixedData, 
  onFixedVal
}) => {

  const [inputVal1, setInputVal1] = useState(inputVal)
  const handleChangeValue = (event) => {
    let value =  event.target.value
    const key = title
    onChangeVal(key, value)
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

  useEffect(() => {
    setInputVal1(inputVal)
  },[inputVal])


  return (
    <React.Fragment>
      <TextFieldST
        label={title}
        id={title}

        style={{width: "100%"}}
        size = {'small'}
        margin = {'none'}

        InputLabelProps={{
          shrink: true,
        }}

        value = {inputVal1}
        onChange = {(event) => handleChangeValue(event)}
        onKeyPress = {(event) => onKeyPressInput(event)}

        // disabled = {type == 'fixable' && fixMode == true ? false : true}

      />
    </React.Fragment>
  )
}


export default InputST
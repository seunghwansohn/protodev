import React, { useState, useEffect } from 'react';

import Checkbox                 from '@material-ui/core/Checkbox';
import Input                    from '@material-ui/core/Input';
import InputLabel                               from '@material-ui/core/InputLabel';
import Button                                   from '@material-ui/core/Button';

import Grid                     from '@material-ui/core/Grid';
import FormControl              from '@material-ui/core/FormControl';

import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles }                           from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

import SubSingleTask from './singleTask'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  grid: {
    padding: theme.spacing(0),
    textAlign: 'left',
    display: 'flex',
    backgroundColor : '#ecdfed'
  },
  fieldItem: {
    padding: theme.spacing(0.5),
    textAlign: 'left',
    display: 'flex',
    backgroundColor: '#ebf2f5'
  },
}));



const SingleTask = ({type, idx, onchecked, showData, rawData, addSub, id, subArr, children}) => {
  const classes     = useStyles();

  const onCheckBox = (e, index) => {
    onchecked(index, type, idx)
  }

  const onAddSub = () => {
    addSub(type, idx, id)
  }

  console.log(subArr)
  return (
    <React.Fragment>
      {children}
      <Grid container item xs = {12}>
        <Grid item xs = {11} className = {classes.grid}>
            <Checkbox idx = {idx} onChange = {(e, index) => onCheckBox(e, index)}>
            </Checkbox>

            <Button 
              size = 'small'
              onClick = {onAddSub}
            >
              <AddIcon fontSize = 'small'></AddIcon>
            </Button>

            {rawData.belongedId == null ? idx +'.' : ''}
            <TextField
              id="standard-full-width"
              style={{ width : 1000 }}
              placeholder=""
              fullWidth
              margin="dense"
              value = {showData}
              disabled
            />
        </Grid>
        <Grid item xs = {1} className = {classes.grid}>
          <Button >
            <DeleteIcon></DeleteIcon>
          </Button>
        </Grid>
      </Grid>
      {subArr && subArr.length > 0 ? 
        <SubSingleTask
        // type        = {projectName}
        // idx         = {index +1}
        // onchecked   = {onchecked}
        // className   = {classes.grid}
        rawData     = {subArr}
        // showData    = {note.note}
        // id          = {note.id}
        // addSub      = {addSubTask}
        // subArr      = {ArrMatched}
      >푸하하하하</SubSingleTask>
      :''}

    </React.Fragment>
  )
}

export default SingleTask
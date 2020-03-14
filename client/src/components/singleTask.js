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



const SingleTask = ({type, idx, onchecked, rawData}) => {
  const classes     = useStyles();

  const onCheckBox = (e, index) => {
    console.log(index, type, idx)
    onchecked(index, type, idx)
  }
  console.log(rawData)
  return (
    <React.Fragment>
      <Grid container item xs = {12}>
        <Grid item xs = {11} className = {classes.grid}>
            <Checkbox idx = {idx} onChange = {(e, index) => onCheckBox(e, index)}>
            </Checkbox>
            <TextField
              id="standard-full-width"
              style={{ width : 1000 }}
              placeholder=""
              fullWidth
              margin="dense"
              value = {rawData}
              disabled
            />
        </Grid>
        <Grid item xs = {1} className = {classes.grid}>
          <Button >
            <DeleteIcon></DeleteIcon>
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default SingleTask
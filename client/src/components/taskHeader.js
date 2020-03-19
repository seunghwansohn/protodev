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
    '& > *': {
      margin: theme.spacing(1),
    },
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



const TaskHeader = ({type, idx, setChecked}) => {
  const classes     = useStyles();

  const onCheckBox = (e, index) => {
    setChecked(index, type, idx)
  }

  return (
      <React.Fragment>

          <React.Fragment>
          <Grid container xs = {12} className = {classes.grid} spacing={0}>
            <Grid item xs = {11} className = {classes.grid}>
              <Checkbox idx = {idx} className = {classes.grid} onChange = {(e, index) => onCheckBox(e, index)}>
              </Checkbox>
                <TextField
                  id="standard-full-width"
                  label="Label"
                  style={{ margin: 8 }}
                  placeholder="Placeholder"
                  helperText="Full width!"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
            </Grid>
            <Grid item xs = {1} className = {classes.grid}>
              <Button >
                <DeleteIcon></DeleteIcon>
              </Button>
            </Grid>
          </Grid>
          </React.Fragment>
      </React.Fragment>
  )
}

export default TaskHeader
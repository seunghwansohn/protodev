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



const SingleTask = ({
  projectCode, 
  level, 
  idx, 
  belongedIdx, 
  onchecked, 
  showData, 
  rawData, 
  addSub, 
  id, 
  children, 
  rawArr
}) => {

  const classes     = useStyles();
  const projectName = projectCode

  const onCheckBox = (e, index) => {
    onchecked(index, projectCode, idx)
  }

  const onAddSub = () => {
    addSub(projectCode, level, belongedIdx, idx)
  }
  // console.log('rawArr은 ',  rawArr)

  const numberFormat = () => {
    let format = ''
    if (level == 0) {
      format = '.'
    }
    if (level == 1) {
      format = ')'
    }
    return format
  }

  let matchedArr = () => {
    let tempArr = []
    rawArr.map(obj => {
      if (obj.level == level) {
        tempArr.push(obj)
      }    
    })
    return tempArr
  }

  let matchedSubArr = () => {
    let tempArr = []
    rawArr.map(obj => {
      if (obj.level >= level + 1 && obj.belongedIdx == idx) {
        tempArr.push(obj)
      }    
    })
    return tempArr
  }

  console.log(matchedArr())
  console.log(matchedSubArr())

  return (
    matchedArr().map(obj => {
      return(
        <React.Fragment>
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

              {/* {rawData.belongedId == null ? idx + numberFormat() : ''} */}
              <TextField
                id="standard-full-width"
                style={{ width : 1000 }}
                placeholder=""
                fullWidth
                margin="dense"
                value = {obj.note}
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
    })
  )
}

export default SingleTask
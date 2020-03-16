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

import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

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
  onchecked, 
  addSub, 
  children, 
  rawArr,
  level,
  setAddSub
}) => {

  const classes     = useStyles();
  const projectName = projectCode

  // const onCheckBox = (e, index) => {
  //   onchecked(index, projectCode, idx)
  // }

  // const onAddSub = () => {
  //   addSub(projectCode, level, belongedIdx, idx)
  // }
  // // console.log('rawArr은 ',  rawArr)

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
  
  const indent = (count) =>{
    let blank = `　`
    for (let i=0; i < count; i++) {
      blank = blank + blank
    }
    return blank
  }

  const onAddSub = (obj) =>{
    setAddSub(obj)
  }

  console.log('레벨은 ', level)
  return (
    matchedArr().map((obj,index) => {

      let matchedSubArr = () => {
        let tempArr = []
        rawArr.map(subObj => {
          if (subObj.level >= obj.level + 1 && subObj.belongedIdx == obj.idx) {
            tempArr.push(subObj)
          }    
        })
        return tempArr
      }

      console.log(matchedSubArr())

      return(
        <React.Fragment>
          <Grid container item xs = {12}>
            <Grid item xs = {11} className = {classes.grid}>
              <Checkbox>
              </Checkbox>

              <Button 
                size = 'small'
                // onClick = {onAddSub}
              >
                <AddIcon fontSize = 'small'></AddIcon>
              </Button>
              <Button onClick = {(e) => setAddSub(obj)}>
                <SubdirectoryArrowRightIcon></SubdirectoryArrowRightIcon>
              </Button>
              {level > 0 ? indent(level - 0) : ''}
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
          <SingleTask
            key         = {index}
            level       = {level + 1}
            projectCode = {projectName}
            onchecked   = {onchecked}
            rawArr      = {matchedSubArr()}
            setAddSub    = {onAddSub}
          >
          </SingleTask>
        </React.Fragment>
      )
    })
  )
}

export default SingleTask
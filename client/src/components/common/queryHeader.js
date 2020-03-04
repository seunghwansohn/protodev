import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      display: 'flex'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color : 'white',
        backgroundColor :'#68869A',
        display: 'flex'

    },
}));

const QueryHeader = ({quoteNo, type, funcs, queryHeaderProps}) => {
  const classes = useStyles();

  const { onQuerySubmit } = funcs

  const [newColCount, setNewColCount] = React.useState(0);
  const [newColNo, setNewColNo] = React.useState(0);


  const [clientName, setClientName] = React.useState(null);

  const {selectedClientName, selectedClientRate} = useSelector(({quoteList}) => ({
      selectedClientName : quoteList.query.clients.result.clientName,
      selectedClientRate : quoteList.query.clients.result.clientRate

  }))

  useEffect(() => {
    let tempArr = []
    queryHeaderProps.map((obj, index) => {
      if (obj.newCol) {
        tempArr.push(index)
      }
    })
    setNewColNo(tempArr)
  },[])
  console.log(newColNo)

  const onClientSubmit = (e) => {
      e.preventDefault()
      const type = 'clients'
      onQuerySubmit(type, clientName)
  }

  const handleValueChange = e => {
      e.preventDefault()
      setClientName(e.target.value)
  }

  // useEffect(() => {
  //     queryHeaderProps.map(prop =>{
  //         if (loadedTempData.hasOwnProperty(prop.title)) {
  //             obj.setState(loadedTempData[prop.title])
  //         }
  //     })
  // },[])

  return (
    <div className = {classes.root}>

    <Grid container spacing={0}>
      {queryHeaderProps.map(arr => {
        let tempCompArr = []
        arr.map(obj => {
          if (obj.size !== undefined) {
            console.log('사이즈있음', obj.size)
            tempCompArr.push(
              <Grid>
              {obj.title}
            </Grid>
            )
          }
          console.log(obj)
        })
        return tempCompArr
      })}
      <Grid item xs = {3}> 
        <Paper className={classes.paper}> 
          Customer: <input type = 'text' onClick = {onClientSubmit} value = {selectedClientName}/>
        </Paper>
        <Paper className={classes.paper}> 
          Customer Rate: {selectedClientRate}
        </Paper>
      </Grid>

      <Grid item xs = {3}> 
      </Grid>
      <Grid item xs = {3}> 
      </Grid>
    </Grid>
    </div>
  )
}

export default QueryHeader
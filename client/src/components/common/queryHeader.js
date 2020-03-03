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
      <Grid>
        {/* {queryHeaderProps.map(prop => {
          if(prop.type == 'input') {
            return(
              <Paper className={classes.paper}>
                {prop.title}:
                <Input>
                </Input>
              </Paper>
            )
          }else if(prop.type == 'paper') {
            return(
              <Paper className={classes.paper}>
                {prop.title}: {prop.state}
              </Paper>
            )
          }
        })} */}

        {(function(){
          return(
            (function(){
              let temp = []
              for (let i = 0; i < newColNo[1]; i++) {
                temp.push(
                  <Paper className={classes.paper}>
                    {queryHeaderProps[i].title}:
                    <Input>
                    </Input>
                  </Paper>
                )
              }
              console.log(temp)
              return temp
            })()
          )
        })()}
        {/* {(fuction(){return(queryHeaderProps.map((prop, index) => {
          if(prop.type == 'input') {
            return(
              <Paper className={classes.paper}>
                {prop.title}:
                <Input>
                </Input>
              </Paper>
            )
          }else if(prop.type == 'paper') {
            return(
              <Paper className={classes.paper}>
                {prop.title}: {prop.state}
              </Paper>
            )
          }
        })} */}
      </Grid>

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
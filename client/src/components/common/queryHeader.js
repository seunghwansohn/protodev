import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

import Box from '@material-ui/core/Box';

import styled   from "styled-components";


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
    buttonRight:{
      alignItems: 'flex-end',
    }
}));


const QueryPaper = styled(Paper)`
  background-color: tomato;
  width : '10%';
  height : 37px;
  /* border-style : ${props => props.updated ? 'ridge':'none'}; */
  color : 'white';
  display: 'flex';
  text-align : 'left';
  &:hover {
    background-color : #eef534;
  }
`

const QueryHeader = ({quoteNo, funcs, queryHeaderProps, mother, randomNo}) => {
  const classes = useStyles();

  const [newColCount, setNewColCount] = React.useState(0);
  const [newColNo, setNewColNo]       = React.useState(0);

  const [clientName, setClientName]   = React.useState(null);

  const {selectedClientName, selectedClientRate} = useSelector(({quoteList}) => ({
      selectedClientName : quoteList.query.clients.result.clientName,
      selectedClientRate : quoteList.query.clients.result.clientRate

  }))

  const type = 'queryHeaderComponent'
  const componentNo = type + '_' + randomNo
  

  console.log(queryHeaderProps)
  const { onQuerySubmit,  submitChanged, headerInputChanged, onKeyPressOnForms} = funcs

  useEffect(() => {
    let tempArr = []
    queryHeaderProps.map((obj, index) => {
      if (obj.newCol) {
        tempArr.push(index)
      }
    })
    setNewColNo(tempArr)
  },[])

  console.log(mother, randomNo)
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

      <Grid container>
        {(function(){
          let returnArr = []
          queryHeaderProps.map(arr => {
            let returnChildren = []
            arr.map(obj => {
              if (obj.type == 'paper') {
                returnChildren.push(
                  <QueryPaper>
                    {obj.title}
                  </QueryPaper>
                )
              } else if (obj.type == 'input') {
                returnChildren.push(
                  <QueryPaper>
                    <Grid Container className = {classes.root}>
                      <Grid item xs = {5}>
                        {obj.title}
                      </Grid>
                      <Grid item xs = {1}>
                        :
                      </Grid>
                      <Grid item xs = {6}>
                        <Input className = {classes.buttonRight} onKeyPress = {(e) => {onKeyPressOnForms(componentNo, obj.title, randomNo, e)}} onChange = {e => {headerInputChanged(obj.title, e)}}>find</Input>
                      </Grid>
                    </Grid>
                  </QueryPaper>
                )
              }
            })
            returnArr.push(
              <Grid xs = {arr[0].size}>
                {returnChildren}
              </Grid>
            )
          })
          return returnArr
        })()}
      </Grid>
    
    </div>
  )
}

export default QueryHeader
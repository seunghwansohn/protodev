import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

import Box from '@material-ui/core/Box';

import styled   from "styled-components";

import {generateRandom}                         from '../../lib/funcs/fCommon';

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

const QueryHeader = ({motherType, motherNo, funcs, queryHeaderProps}) => {
  const classes = useStyles();

  const [newColCount, setNewColCount] = useState(0);
  const [newColNo, setNewColNo]       = useState(0);

  const [clientName, setClientName]   = useState(null);

  const {selectedClientName, selectedClientRate} = useSelector(({quote}) => ({
      selectedClientName : quote.query.clients.result.clientName,
      selectedClientRate : quote.query.clients.result.clientRate

  }))

  const [frameNo, setFrameNo] = useState(motherNo ? motherNo : generateRandom())
  const currentType = 'queryHeaderComponent'
  const componentNo = currentType + '_' + frameNo


  // console.log('현Comp는 (', type, ', ', frameNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')', '커런트넘버는 ', currentNo)


  const { onQuerySubmit,  submitChanged, headerInputChanged, onKeyPressOnInput} = funcs

  useEffect(() => {
    let tempArr = []
    queryHeaderProps.map((obj, index) => {
      if (obj.newCol) {
        tempArr.push(index)
      }
    })
    setNewColNo(tempArr)
  },[])

  const onClientSubmit = (e) => {
      e.preventDefault()
      const type = 'clients'
      onQuerySubmit(type, clientName)
  }

  const handleValueChange = e => {
      e.preventDefault()
      setClientName(e.target.value)
  }

  return (
    <div className = {classes.root}>

      <Grid container>
        {(function(){
          let returnArr = []
          queryHeaderProps.map((arr, idx1) => {
            let returnChildren = []
            arr.map((obj, idx2) => {
              if (obj.type == 'paper') {
                returnChildren.push(
                  <QueryPaper key = {idx2}>
                    <Grid container className = {classes.root}>
                      <Grid item xs = {5}>
                        {obj.title}
                      </Grid>
                      <Grid item xs = {1}>
                        :
                      </Grid>
                      <Grid item xs = {6}>
                        {obj.state}
                      </Grid>
                    </Grid>
                  </QueryPaper>
                )
              } else if (obj.type == 'input') {
                returnChildren.push(
                  <QueryPaper key = {idx2}>
                    <Grid container className = {classes.root}>
                      <Grid item xs = {5}>
                        {obj.title}
                      </Grid>
                      <Grid item xs = {1}>
                        :
                      </Grid>
                      <Grid item xs = {6}>
                        <Input 
                          className = {classes.buttonRight} 
                          onKeyPress = {(e) => {onKeyPressOnInput(frameNo, obj.title, e)}} 
                          onChange = {e => {headerInputChanged(obj.title, e)}}
                        >find</Input>
                      </Grid>
                    </Grid>
                  </QueryPaper>
                )
              }
            })
            returnArr.push(
              <Grid item xs = {arr[0].size} key = {idx1}>
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
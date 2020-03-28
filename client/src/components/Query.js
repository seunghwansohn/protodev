import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import TextField        from '@material-ui/core/TextField'
import InputAdornment   from '@material-ui/core/InputAdornment';
import Grid             from '@material-ui/core/Grid';
import IconButton       from '@material-ui/core/IconButton';
import EditIcon         from '@material-ui/icons/Edit';
import { makeStyles }   from '@material-ui/core/styles';
import Divider          from '@material-ui/core/Divider';
import Typography       from '@material-ui/core/Typography';
import Button       from '@material-ui/core/Button';

import Notes from './common/notes'

import styled           from "styled-components";

import InputST          from './common/Input'

const useStyles = makeStyles(theme => ({

}))

const Query = ({loadedTempData, type, queryProps}) => {
  const [fixMode, setFixMode] = useState(false)
  const [lodedData, setLodedData] = useState([])
  const [fixedData, setFixedData] = useState([])
  const [primaryKey, setPrimaryKey] = useState('')
  const [primaryCode, setPrimaryCode] = useState('')

  const classes = useStyles();

  const onModeChange = () => {
    fixMode == false ? setFixMode(true) : setFixMode(false)
  }

  const getPrimaryKey = () => {
    queryProps.map(obj => {
      if (obj.type == 'primary') {
          setPrimaryKey(obj.title)
          setPrimaryCode(obj.state)
        }
      })
  }

  const getPrimaryCode = () => {
    queryProps.map(obj => {
      if (obj.type == 'primary') {
          setPrimaryCode(obj.title)
        }
      })
  }

  useEffect(() => {
    setLodedData(loadedTempData)
    queryProps.map(obj => {
      console.log(loadedTempData)
      console.log(obj.title)
      if (loadedTempData.hasOwnProperty(obj.title)) {
        console.log('있음')
        obj.setState(loadedTempData[obj.title])
      }
    })
  },[loadedTempData])

  useEffect(() => {
    getPrimaryKey()
  },[queryProps])

  return (
      <React.Fragment>
        <Grid container>
          {queryProps.map(row => {
            if(row.type !== 'divider') {
              return(
                <Grid item xs ={row.size}>
                  <InputST
                    title = {row.title}
                    attr  = {'regular'}
                    type  = {row.type}
                    fixMode = {fixMode}
                    state = {row.state}
                    setState = {row.setState}
                    fixedData = {fixedData}
                    setFixedData = {setFixedData}
                    lodedData = {lodedData ? lodedData : null}
                  ></InputST>
                </Grid>
              )
            }else if (row.type == 'divider') {
              return(
                <Grid item xs = {12}>
                  <br/>
                  <Divider/>
                    <Typography
                      className={classes.dividerFullWidth}
                      color="textSecondary"
                      display="block"
                      variant="caption"
                    >
                      Divider
                    </Typography>
                </Grid>
              )
            }
          })}
        </Grid>

        <Notes type = {type} primaryKey = {primaryKey} primaryCode = {primaryCode}></Notes>
        <Button onClick = {onModeChange}>모드 변경</Button>

      </React.Fragment>
  )
}


export default Query
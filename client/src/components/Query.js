import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import Grid             from '@material-ui/core/Grid';
import { makeStyles }   from '@material-ui/core/styles';
import Divider          from '@material-ui/core/Divider';
import Typography       from '@material-ui/core/Typography';
import Button           from '@material-ui/core/Button';

import Notes            from './common/notes'
import InputST          from './common/Input'

import {generateRandom} from '../lib/common';


const useStyles = makeStyles(theme => ({
  flex: {
    flexGrow: 1,
    display: 'flex'
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#ffdbfd',
  },
}))



//loadedTempData: Query의 정보를 담은 rawData. 값형식 : obj
//queryProps    : Query의 각 input을 어떻게 표시할건가 정보를 담은 배열 값형식: arr
//updateData    : 업데이트 함수
const Query = ({motherType, motherNo, loadedTempData, onUpdate, queryProps}) => {
  const [fixMode, setFixMode]         = useState(false)
  const [fixedData, setFixedData]     = useState([])

  const [lodedData, setLodedData]     = useState([])
  
  const [primaryKey, setPrimaryKey]   = useState('')
  const [primaryCode, setPrimaryCode] = useState('')

  const classes = useStyles();

  //개체 기본 속성
  const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
  const type = 'Query'
  const containerNo = type + '_' + frameNo
  const dataType = 'item'


  //픽스모드 설정
  const onModeChange = () => {
    fixMode == false ? setFixMode(true) : setFixMode(false)
  }

  //primary키 설정
  //queryProps조회해서 프라이머리 키 받아서 react state로 설정
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
    getPrimaryKey()
  },[queryProps])



  //업데이트 함수
  const onFixedVal = (fixedArr) => {
    let tempObj = {}
    tempObj.ref = {}
    tempObj.vals = {}
    tempObj.ref[primaryKey] = primaryCode
    Object.keys(fixedData).map(key => {
      tempObj.vals[key] = fixedData[key]
    })
    onUpdate(tempObj)
  }



  //컨테이너에서 내려받은 api의 Data에서 queryProps에 규정된 것만 추출하여
  //state로 저장.
  useEffect(() => {
    setLodedData(loadedTempData)
    queryProps.map(obj => {
      if (loadedTempData.hasOwnProperty(obj.title)) {
        obj.setState(loadedTempData[obj.title])
      }
    })
  },[loadedTempData])


  
  return (
    <React.Fragment>
      <Grid container className = {classes.flex}>
        <Grid item xs = {11}>
          <Typography variant="h4">
            {motherType}
          </Typography>
        </Grid>
        <Grid item xs = {1}>
          <Button className = {classes.right} onClick = {onModeChange}>Fix</Button>

        </Grid>
        
        <Divider/>
      </Grid>
      <br/>
      <Grid container>
        {queryProps.map(row => {
          if(row.type !== 'divider') {
            return(
              <Grid item xs ={row.size}>
                <InputST
                  title         = {row.title}
                  attr          = {'regular'}
                  type          = {row.type}
                  fixMode       = {fixMode}
                  state         = {row.state}
                  setState      = {row.setState}
                  fixedData     = {fixedData}
                  setFixedData  = {setFixedData}
                  onFixedVal    = {onFixedVal}
                  lodedData     = {lodedData ? lodedData : null}
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
      <Button onClick = {onFixedVal}>Update</Button>

    </React.Fragment>
  )
}


export default Query
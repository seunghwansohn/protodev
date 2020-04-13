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
import {getIncludingKeys,
  withoutIncludingKeys }  from '../lib/common'

import axios                from '../lib/api/axios'
import produce  from 'immer'


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
const Query = ({motherType, motherNo, loadedTempData, onUpdate, attr}) => {
  const [fixMode, setFixMode]         = useState(false)
  const [fixedData, setFixedData]     = useState({})

  const [loadedData, setLoadedData]     = useState([])
  
  const [primaryKey, setPrimaryKey]   = useState('')
  const [primaryCode, setPrimaryCode] = useState('')

  const classes = useStyles();

  //개체 기본 속성
  const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
  const type = 'Query'
  const containerNo = type + '_' + frameNo
  const {dataType} = attr

  //테이블 관련
  const [tableRawData, 
    setTableRawData]                = useState([])
  const [includingKeys, 
      setIncludingKeys]               = useState([]);
  const [findingKeys, 
      setFindingKeys]               = useState([]);

  //픽스모드 설정
  const onModeChange = () => {
    fixMode == false ? setFixMode(true) : setFixMode(false)
  }

  console.log(fixMode)
  
  //primary키 설정
  //queryProps조회해서 프라이머리 키 받아서 react state로 설정

  //테이블 각열 Attr 
  const queryProps = () => {
    let tempObj = {
      maker : [
        {type : 'primary', newRow : true, size : 5, title: 'makerCode', style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'makerName', style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'}
      ]
    }
    return tempObj
    // {type : 'fixable', newRow : false, size : 5, title: 'ceo', state : ceo, setState : setCeo, style:'regular'},
  }


  //primaryCode와 primaryKey를 설정
  const getPrimaryKey = () => {
    queryProps()[dataType].map(obj => {
      if (obj.type == 'primary') {
          setPrimaryKey(obj.title)
          setPrimaryCode(loadedData[obj.title])
      }
    })
  }
  useEffect(() => {
    getPrimaryKey()
  },[queryProps])


  const getRawData = async () => {
    let queryObj = {}
    queryObj[attr.data.header] = attr.data.value

    let request = {queryObj : queryObj, findingKeys, includingKeys}

    await axios.post('/api/' + dataType + '/query', request).then(res => {
      setTableRawData(res.data)
      setLoadedData(res.data)
    })
  }


  useEffect(() => {
    getRawData()
  },[])

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


  const onChangeVal = (key, value) => {
    console.log(key, value)
    setLoadedData(
      produce(loadedData, draft => {
        draft[key] = value
      })
    )
    setFixedData(
      produce(fixedData, draft => {
        draft[key] = value
      })
    )
  }
  
  return (
    <React.Fragment>
      {dataType}
      <Grid container className = {classes.flex}>
        <Grid item xs = {11}>
          <Typography variant="h4">
            {tableRawData.makerName}
          </Typography>
        </Grid>
        <Grid item xs = {1}>
          <Button className = {classes.right} onClick = {onModeChange}>Fix</Button>
        </Grid>
        
        <Divider/>
      </Grid>
      <br/>
      <Grid container>
        {queryProps().maker.map(obj => {
          if(obj.type !== 'divider') {
            return(
              <Grid item xs ={obj.size}>
                <InputST
                  attr          = {'regular'}
                  type          = {obj.type}
                  fixMode       = {fixMode}

                  title         = {obj.title}
                  inputVal      = {loadedData[obj.title]}
                  onChangeVal   = {onChangeVal}

                  fixedData     = {fixedData}
                  setFixedData  = {setFixedData}
                  onFixedVal    = {onFixedVal}
                ></InputST>
              </Grid>
            )
          }else if (obj.type == 'divider') {
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
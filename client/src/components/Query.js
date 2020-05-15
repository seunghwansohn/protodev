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
  withoutKeys,
  getOnlyFiles }  from '../lib/common'

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
  const currentType = 'Query'
  const containerNo = currentType + '_' + frameNo
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

  //primary키 설정
  //queryProps조회해서 프라이머리 키 받아서 react state로 설정

  //테이블 각열 Attr 
  const queryProps = () => {
    let tempObj = {
      maker : [
        {type : 'primary', newRow : true, size : 5, title: 'makerCode', style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'makerName', style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'}
      ],
      supplier : [
        {type : 'primary', newRow : true, size : 5, title: 'supplierCode', style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'supplierName', style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'}
      ],
      item : [
        {type : 'primary', newRow : true, size : 5, title: 'itemCode', style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'itemName', style:'regular'},
        {type : 'fixable', newRow : true, size : 12, title: 'description', style:'regular'},
        {type : 'fixable', newRow : true, size : 3, title: 'weight', style:'regular'},
        {type : 'fixable', newRow : true, size : 3, title: 'width', style:'regular'},
        {type : 'fixable', newRow : true, size : 3, title: 'depth', style:'regular'},
        {type : 'fixable', newRow : true, size : 3, title: 'height', style:'regular'},
        {type : 'fixable', newRow : true, size : 6, title: 'importTaxRate', style:'regular'},
        {type : 'fixable', newRow : true, size : 6, title: 'VNPrice', style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'}
      ],
      client : [
        {type : 'primary', newRow : true, size : 5, title: 'clientCode', style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'clientName', style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'}
      ],
      expense : [
        {type : 'primary', newRow : true, size : 5, title: 'expenseCode', style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'description', style:'regular'},
        {type : 'fixable', newRow : true, size : 12, title: 'memo', style:'regular'},

        {type : 'divider', typoGraphy : 'basicInfo'}
      ],
      project : [
        {type : 'primary', newRow : true, size : 5, title: 'projectCode', style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'projectName', style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'}
      ],
    }
    return tempObj
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

console.log(dataType)
const [filesKeys, 
  setFilesKeys]                   = useState([]);
const [attachedFiles, 
  setAttachedFiles]               = useState([]);
  
  
  //api값을 받아와 설정
  const getRawData = async () => {
    let queryObj = {}
    queryObj[attr.clickedHeader] = attr.clickedVal
    let request = {queryObj : queryObj, findingKeys, includingKeys}
    await axios.post('/api/' + dataType + '/query', request).then(res => {
      console.log(res.data)
      setTableRawData(res.data.vals)
      setLoadedData(res.data.vals)
      setIncludingKeys(res.data.primaryKey)
      setFindingKeys(res.data.findingKeys)
      if (filesKeys) {
        setAttachedFiles(getOnlyFiles(res.data.vals))
      }
    })
  }
  useEffect(() => {
    getRawData()
  },[])

  //업데이트 함수
  const onFixedVal = (fixedArr) => {
    onUpdate()
  }

  console.log(tableRawData)

  //input값 변경 기능
  const onChangeVal = (key, value) => {
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
      <Typography variant="h4">
        {dataType}
      </Typography>
      <Grid container className = {classes.flex}>
        <Grid item xs = {11}>
          <Typography variant="h4">
            {tableRawData[dataType + 'Name']}
          </Typography>
        </Grid>
        <Grid item xs = {1}>
          <Button className = {classes.right} onClick = {onModeChange}>Fix</Button>
        </Grid>
        
        <Divider/>
      </Grid>
      <br/>
      <Grid container>
        {queryProps()[dataType].map(obj => {
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

      <Notes 
        type = {dataType} 
        primaryKey = {primaryKey} 
        primaryCode = {primaryCode}
        attachedFiles = {attachedFiles}
      >
      </Notes>

      <Button onClick = {onModeChange}>모드 변경</Button>
      <Button onClick = {onFixedVal}>Update</Button>

    </React.Fragment>
  )
}


export default Query
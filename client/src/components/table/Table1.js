import React, {useEffect, useState} from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import { makeStyles }   from '@material-ui/core/styles';

import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableContainer   from '@material-ui/core/TableContainer';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';
import TablePagination  from '@material-ui/core/TablePagination';

import Input            from '@material-ui/core/Input';
import InputAdornment   from '@material-ui/core/InputAdornment';

import Checkbox         from '@material-ui/core/Checkbox';

import InputMiniHelperCell    from './tableCell/InputMiniHelperCell';
import SelectCell             from './tableCell/SelectCell';
import SingleNoteCell         from './tableCell/SingleNoteCell';
import ChkBoxWithAlertCell    from './tableCell/ChkBoxWithAlertCell';
import QueryInputCell         from './tableCell/QueryInputCell';
import DropZoneCell           from './tableCell/DropZoneCell';
import IncludingManyCell      from './tableCell/IncludingManyCell';
import CalValueCell           from './tableCell/CalValueCell';

import Menu             from '@material-ui/core/Menu';
import MenuItem         from '@material-ui/core/MenuItem';

import Button           from '@material-ui/core/Button';

import List             from '@material-ui/core/List';
import ListItemText     from '@material-ui/core/ListItemText';
import ListSubheader    from '@material-ui/core/ListSubheader';

import PopQuestionDlg     from '../dialogs/PopQuestionDlg';
import DialogActions      from '@material-ui/core/DialogActions';
import DialogContent      from '@material-ui/core/DialogContent';
import DialogContentText  from '@material-ui/core/DialogContentText';
import DialogTitle        from '@material-ui/core/DialogTitle';
import Dialog             from '@material-ui/core/Dialog';

import Paper               from '@material-ui/core/Paper';

import {generateRandom}     from '../../lib/funcs/fCommon';
import axios                from '../../lib/api/axios'
import {getIncludingKeys,
    withoutKeys,
    getOnlyFiles }          from '../../lib/funcs/fCommon'

import {spacelize}                      from '../../lib/funcs/fString'
import {getDate_yyyymmddhhmm}           from '../../lib/funcs/fGetDate'

import {filterArrayBySearchKeyword}     from '../../lib/funcs/fSearch'
import {selectMultipleStates, 
  unSelectMultipleStates}               from '../../lib/funcs/fTable'
import {monolizeObj}                    from '../../lib/funcs/fSequelize'
import {
  checkValid
}                                       from '../../lib/funcs/fValidation';
    

import { actSelect, 
  actSetFrame, 
  actAddNewBlankQuery}  from '../../modules/query'

import styled   from "styled-components";
import produce  from 'immer'

const colors = {
  fixable : '#fff4e2',
  unFixable : '#D3D3D3',
  fixed : '#FF7F50'
}

const StyledTable = styled(Table)`
  background-color: #6772e5;
`

const StyledTableHeader = styled(TableHead)`
  background-color: #e4f4e5;
`
const StyledTableBody = styled(TableBody)`
  .MuiTableCell-root {
    padding : 0px;
    padding-left : 10px;
    padding-right : 10px;
  }
  background-color: #7772e5;
  &:hover {
    background-color : #e4f4e5;
  }
`
const StyledCheckBox = styled(Checkbox)`

  background-color: #ffffff;
  &:hover {
    background-color : #e4f4e5;
  }
`
const StyledTableCell = styled(TableCell)`
  background-color: ${
    props => props.fixMode ? 
      props.fixable ? 
        props.fixed ?
          colors.fixed
        : colors.fixable
      : colors.unFixable 
    : '#ffffff'
  };
  border-style : ${props => props.updated ? 'ridge':'none'};
  &:hover {
    font-weight: bold;
  }
  max-width : ${props => props.size};
  width : ${props => props.size};
`

const StyledInput = styled(Input)`
  background-color: #ffffff;
  width: ${props => props.width ? props.width : 'auto'};
  &:hover {
    background-color : #eef534;
    font-weight: bold;
  }
`

const StyledTableContainer = styled(TableContainer)`
  height : ${props => props.size ? props.size : 'auto'};
`

const STTable = ({
  motherType,
  motherFrameNo,  
  motherNo,

  dataType,

  attr,
  acts 
}) => {

  const {
    onDialogOpen,
    onSubmitNewAdded,
    onSubmitUpdatedVals,
    onDelete,
    onTableCol,
    onTableChip,
    onUpdateChange
  }                   = acts

  const {
    flagAble, //행마다 체크박스 표시할 건지 말건지
    fixModable,
    colAttr, 
    tableButton, 
    setFindOneResult, 
    initialFilter,
    directQuery,
    gMotherAttr
  }                   = attr

  const dispatch = useDispatch()


  //개체 기본 속성
  const [frameNo, setFrameNo]      = useState(motherFrameNo ? motherFrameNo : generateRandom())
  const [currentNo, setCurrentNo]  = useState(generateRandom())

  const currentType = motherType + 'Table'

  const debugMode   = useSelector(state => state.common.debugMode)
  const { user }    = useSelector(({ user }) => ({ user: user.user }));

  //api에서 tableRawData 및 key 설정
  const [rawData, 
    setRawData]                     = useState([])
  const [includingKeys, 
    setIncludingKeys]               = useState([]);
  const [filesKeys, 
    setFilesKeys]                   = useState([]);
  const [findingKeys, 
    setFindingKeys]                 = useState([]);
  const [attachedFiles, 
    setAttachedFiles]               = useState([]);
  const [includingManyKeys, 
    setIncludingManyKeys]           = useState([]);
  const getRawData = async () => {
    const config = {
      headers: {
        'x-access-token' : document.cookie
      },
    }
    await axios.get('/api/' + dataType + '/load', config).then(res => {
      setPrimaryKey(res.data.primaryKey)
      setIncludingKeys(res.data.includingKeys)
      setFindingKeys(res.data.findingKeys)
      setFilesKeys(res.data.filesKeys)
      setIncludingManyKeys(res.data.includingManyKeys)
      if (filesKeys.length > 0) {
        setAttachedFiles(getOnlyFiles(res.data.vals))
      }
      setRawData(withoutKeys(res.data.vals))
    })
  }
  useEffect(() => {
    getRawData()
  },[])

  //초기 헤더 설정 기능
  let headers = colAttr && Object.keys(colAttr).length > 0 ? Object.keys(colAttr) : []
  const [tableHeaderVals, setTableHeaderVals] = useState([]);
  // -- 아예 삭제할 컬럼 설정
  useEffect(() => {
    const deleteKey = 'id'
    headers = headers.filter(function (el) {
      return el !== deleteKey
    })
    setTableHeaderVals(headers)
  },[rawData])

  //테이블 필터
  const [filterKeyword, setFilterKeyword]     = useState('');
  const [filteredData, setFilteredData]       = useState(rawData);
    //검색어 필터 기능
  useEffect(() => {
    setFilteredData(rawData)
  },[rawData])
    //검색어 인풋 기능
  const onInputFilterKeyword = (e) => {
    e.preventDefault(); 
    setFilterKeyword(e.target.value)
  }
    //initial 필터 기능
  useEffect(() => {
    setFilterKeyword(initialFilter)
  },[initialFilter])
    //검색결과 하나일때
  useEffect(() => {
    if (filteredData.length == 1 && initialFilter == filterKeyword) { 
      if (directQuery && setFindOneResult && typeof setFindOneResult == "function") {
        setFindOneResult(filteredData[0])
        dispatch(onDialogOpen(false, 'client_' + frameNo))
      }
    }
  },[filteredData])
  useEffect(() => {
    if (filterKeyword !== null && filterKeyword !== undefined && filterKeyword !== ''){
      setFilteredData(filterArrayBySearchKeyword(filterKeyword, rawData, primaryKey))
    } else {
      setFilteredData(rawData)
    }
  },[filterKeyword, rawData])


  //테이블 새로 추가 state
  const [addedNew, setAddedNew]               = useState([]);
  const onClickSubmitNewAdded = async () => {
    await addedNew.map(obj => {
      onSubmitNewAdded(obj, primaryKey, includingKeys, findingKeys)
    })
    await setAddedNew([])
  }

  //테이블 업데이트
  const [fixedVals, setFixedVals]             = useState([]);
  const [updated, setUpdated]                 = useState(false);
  const {update} = useSelector((state => state[dataType].table))
  if (update) {
    getRawData()
    onUpdateChange(false)
    setUpdated(true)
  }

  //테이블값 수정
  const onClickSubmitUpdatedVals = async (fixedVals) => {
    await fixedVals.map(arr => {
      onSubmitUpdatedVals(arr)
        // dispatch(actUpdate(arr))
    })
    await setFixedVals([])
  }

  //테이블값 삭제
  const onClickDelete = async (codes) =>{
    await codes.map(code => {
        onDelete(dataType, code[primaryKey])
    })
    setChecked([])
    await setUpdated(true)
  }

  //각 컬럼 성격 설정 기능
  const [primaryKey, setPrimaryKey]           = useState('');
  const [nameKey, setNameKey]                 = useState('');

  const [hided, setHided]                     = useState([]);
  const [fixableCols, setFixableCols]         = useState([]);
  useEffect(() => {
    let tmpPrimaryKey = ''
    let tmpNameKey = ''
    let tmpDefaultHided = []
    let tempFixableCols = []
    Object.keys(colAttr).map(key => {
      if(colAttr[key].defaultHided){
        tmpDefaultHided.push(key)
      }
      if(colAttr[key].fixableUser == user){
        tempFixableCols.push(key)
      }
      if(colAttr[key].primary){
        setPrimaryKey(key)
      }
      if(colAttr[key].nameKey){
        setNameKey(key)
      }
    })
    setHided(tmpDefaultHided)
    setFixableCols(tempFixableCols)
    setPrimaryKey(tmpPrimaryKey)
    setNameKey(tmpNameKey)
  },[])
  const isHidedCulumn = name => hided.indexOf(name)       !== -1;
  const isFixable     = name => fixableCols.indexOf(name) !== -1;
  const isMatchedType = (header) => {
    let ox = false
    let type = colAttr[header] ? colAttr[header].type ? colAttr[header].type : '' : ''
    return type
  }

  //각 셀 콤포넌트의 attr 모두 집합한 get함수
  const getCompAttr = (idxRow, header) => {
    let fixed         = onFix.checkCellFixed(idxRow, header)
    let isfixableCol  = isFixable(header)
    let size          = colAttr[header] ? colAttr[header].size ? colAttr[header].size : '10px' :'10px'
    let primaryCode   = getPrimaryCode(idxRow)

    const getMatchedFinding = (type) => {
      let tempMatched = ''
      findingKeys.map(obj => {
        Object.keys(obj).map(key => {
          if (type == key) {
            tempMatched = obj
          }
        })
      })
      return tempMatched[type]
    }

    let compAttrObj = {
      motherFrameNo : frameNo,
      motherNo      : currentNo,
      motherType    : currentType,
      colAttr,
      fixMode,
      fixed,
      fixable : isfixableCol,
      size : size,
      primaryCode : primaryCode,
      primaryKey  : primaryKey,
      data        : filteredData,
      setData     : setFilteredData,
      dataType    : colAttr[header].dataType,
      matchedData     : filteredData[idxRow],
      matchedColAttr  : colAttr[header],
      header      : header,
      index       : idxRow,
      helperText      : updateHelperTexts,
      user : user,
      attachedFiles,
      onTableChip,
      includingManyKeys,
      codeNName : getMatchedFinding(colAttr[header].dataType),
      label     : colAttr[header].dataType,
      fixedVals,
      setFixedVals,
      setTempFixedVal,
      dialogOpened,
      onDialogOpen,
      confirmInputFixedVal  : confirmInputFixedVal,
      handleChangeInput     : handleChangeInput,
      onKeyPressOnInput     : onKeyPressOnInput,
      addedNew,
      setAddedNew,
    }
    return compAttrObj
  }

  //테이블 셀렉트
  const [checked, setChecked]         = useState([]);
    //체크박스 체크됏는지 여부
  const isSelected    = code => {
    let ox = false
    checked.map(obj => {
      if (obj[primaryKey] == code) {
        ox = true
      }
    })
    return ox
  }


  //인덱스값만 넣어서 primaryCode를 얻는 기능
  const getPrimaryCode = (index) => {
    return filteredData[index][primaryKey]
  }

  //업데이트 잠시동안 표시 기능
  const [showUpdatedSign, setShowUpdatedSign] = useState(false);
  useEffect(() => {
    if (updated) {
      setShowUpdatedSign(true)
      setTimeout(() => {
        setShowUpdatedSign(false)
        setFixedVals([])
      }, 3000);
      getRawData()
      setUpdated(false)
    }
  },[updated])


  //픽스모드 관련기능
  const [fixMode, setFixMode]                 = useState(false);
  const [fixableCells, setFixableCells]       = useState({});
  const onFix = {
    onSetfixMode : () => {
      if (fixModable) {
        if (fixMode) {
          setFixMode(false)
          if (colAttr[primaryKey].defaultHided) {
            setHided(
              produce(hided, draft => {
                hided.push(primaryKey)
              }) 
            )
          }
        } else {
          setFixMode(true)
          let newHided = hided.filter(function(str) { //픽스모드 on시 primaryKey 컬럼이 숨겨져있을 경우 unhide.
            return str !== primaryKey
          })
          setHided(newHided)
        }
      }
      else if (!fixModable) {
        setFixMode(false)
      }
    },
    checkColFixable : (index, header) => {
      let ox = false
      if (fixableCells.row == index){
        if(fixableCells.header == header){
          ox = true
        }
      }
      else {
        ox = false
      }
      return ox
    },
    checkCellFixed : (index, header) => {
      let ox = false
      fixedVals.map(obj => {
        if (Object.keys(obj).length > 0 && obj.location.index == index && Object.keys(obj.vals).includes(header)) {
          ox = true
        }
      })
      return ox
    }
  }


  //다이얼로그 관련
  const dialogOpened                  = useSelector(state => state.dialogs.opened)
  const [dialogInfo, setDialogInfo]   = useState({})
  const simpleQuery = 'simpleQuery'
  const detailQuery = 'detailQuery'


  //테이블 클릭
  const [clickedCol, 
    setClickedCol]     = useState({});
  useEffect(() => {
    if (Object.keys(clickedCol).length > 0) {
      onTableCol(clickedCol)
    } 
  },[clickedCol])
  const onClickCols = (value, row, header) => {
    let tempObj2 = {}
    tempObj2.value  = value
    tempObj2.row    = row
    tempObj2.header = header
    tempObj2.dataType = colAttr[header].dataType
    tempObj2.clickType = colAttr[header].clickType
    tempObj2.queryType = colAttr[header].queryType
    tempObj2.primaryCode = getPrimaryCode(row)
    if (fixMode){
      const temp = {row : row, header : header}
      setFixableCells(temp)
      if (tempFixedVal.location && tempFixedVal.vals !== {} && !checkNoValidationErrorAtAll()) {
        if (tempObj2.row !== tempFixedVal.location.index || tempObj2.header !== tempFixedVal.location.header) {
          setOpenConfirmDialog(true)
        }
      }
    }
    else {
      setClickedCol(tempObj2)
    }
  }
  //      테이블 클릭시 가격 클릭이랑 나머지 클릭이랑 따로 
  useEffect(() => {
    let keys = Object.keys(clickedCol)
    const {colAttr} = attr
    const colAttrKeys = Object.keys(colAttr)
    const {header, row, value, dataType, primaryCode, queryType} = clickedCol
    const {clickType} = attr.colAttr[header] ? attr.colAttr[header] : ''
    if (keys.length > 0) {
      let aColAttr = attr.colAttr[clickedCol.header]
      let {clickType, dataType} = aColAttr
      let queryType = ''
      colAttrKeys.map(key => {
        if (key == header) {
          queryType = colAttr[key].queryType
        }
      })
      let tempObj = {
        frameNo     : frameNo,
        currentNo   : currentNo,
        currentType : currentType, 
        motherNo    : motherNo, 
        motherType  : motherType,
        gMotherAttr,

        clickedHeader       : header,
        clickedIndex        : row,
        clickedVal          : value,
        clickedType         : queryType,
        clickedPrimaryCode  : primaryCode,

        dataType      : dataType, 
        initialFilter : '',
      }
      onDialogOpen(tempObj)
    }
    dialogOpened.map(obj => {
      if(obj.frameNo == frameNo && obj.currentNo == currentNo) {
        setDialogInfo(obj)
      }
    })
  },[clickedCol])


  //  --값 update 후 미확정 상태로 다른 컬럼 클릭했을 때 다이얼로그
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }


//빈 새열 추가 기능
  //---HelperText 및 error 구현기능
  const [newAddedhelperTexts, setNewAddedHelperTexts] = useState([])
  const [newAddedError, setNewAddedError] = useState([])
  //--------------------------
  const onAddNewBlank = () => {
    const lengthBefore = addedNew.length
    const lengthNow    = lengthBefore + 1
    let tempObj      = {}
    let tempObjH     = {}
    headers.map(header => {
      if (colAttr[header] && colAttr[header].defaultCodeType && colAttr[header].defaultCodeType ==  'yymmddhhminRandom') {
        let dateTime = getDate_yyyymmddhhmm()
        let randomNo = generateRandom(100,999)
        tempObj[header] = dateTime + randomNo
      } else {
        tempObj[header] = ''
      }
      const validArr = checkValid(colAttr, '', header, '')
      let joinedValidStr = validArr.join(', ')
      tempObjH[header] = joinedValidStr
      setNewAddedHelperTexts(    
        produce(newAddedhelperTexts, draft => {
          draft.push(tempObjH)
        })
      )
      let tempOx = {}
      tempOx[header] = false
      if (validArr == []) {
        tempOx[header] = true
      }
      setNewAddedError(    
        produce(newAddedError, draft => {
          draft.push(tempOx)
        })
      )
    })
    setAddedNew(
      produce(addedNew, draft => {
        draft.push(tempObj)
      }) 
    )
  }
  //newAdded 값 변경 기능
  const handleChangeNewAddedInput = (event, index, header, memo) => {
    let type = ''
    let tempValObj = {}
    let val = ''
    if (Object.keys(event)[0] == 'value') {
      tempValObj[header] = event.value
      val = event.value
    } else {
      type = event.target.type
      if (colAttr[header].type == 'approveCheckBox') {
        tempValObj[header + 'By'] = user.username
      }
      if (memo) {
        tempValObj[header + 'Memo'] = event.target.value
      } else {
        if (type == 'checkbox') {
          tempValObj[header] = event.target.checked
          val = event.target.checked
        } else {
          tempValObj[header] = event.target.value
          val = event.target.value
        }
      }
    }
    setAddedNew(
      produce(addedNew, draft => {
        draft[index] = Object.assign(draft[index], tempValObj)
      })
    )
    const validArr = checkValid(colAttr, index, header, val)
    let joinedValidStr = validArr.join(', ')
    setNewAddedHelperTexts(    
      produce(newAddedhelperTexts, draft => {
        draft[index][header] = joinedValidStr
      })
    )
    if (validArr == []) {
      setNewAddedError(    
        produce(newAddedError, draft => {
          draft[index][header] = true
        })
      )
    } else {
      setNewAddedError(    
        produce(newAddedError, draft => {
          draft[index][header] = false
        })
      )
    }
  }
  //newAddedSelectType 값 변경 기능
  const [addedNewSelectedVal, setAddedNewSelectedVal]             = useState({})
  const [addedNewSelectMenuOpened, setAddedNewSelectMenuOpened]   = useState([])
  const handleChangeNewAddedSelect = (event, index, header) => {
    const {value, label} = event
    const temp = value
    setAddedNewSelectedVal(
      produce(addedNewSelectedVal, draft => {
        draft[index] = value
      })
    )
    setAddedNew(
      produce(addedNew, draft => {
        delete draft[index][header]
        draft[index][colAttr[header].code] = temp
      })
    )
  }

  //값 update시 인풋 처리 기능
  const [tempFixedVal, setTempFixedVal]     = useState({});
  const [updateHelperTexts, 
    setUpdateHelperTexts]                   = useState({})
  const [updateValidationError, 
    setUpdateValidationError]               = useState({})

  //방금 고친 값 발리데이션 에러 있는지 체크
  const checkNoValidationErrorAtAll = () =>{
    let ox = false
    if (!tempFixedVal == {}) {
      const {location} = tempFixedVal
      const {header} = location ? location : ''
      const primaryCode = getPrimaryCode(location.index)
      ox = updateValidationError[primaryCode][header] == true ? true : false
    }
    return ox
  }

  //인풋값 fixed한 후 submit전에 엔터쳐서 임시로 확정
  const confirmInputFixedVal = () => {
    const temp = {}
    const isNowError = checkNoValidationErrorAtAll()
    if (isNowError == true) {
    }else {
      setFixableCells(temp)
      if(tempFixedVal && Object.keys(tempFixedVal).length > 0)  {
        let existOx  = false
        let existIdx = ''
        fixedVals.map((obj, idx) => {
          if (obj.location.index == tempFixedVal.location.index && obj.location.header == tempFixedVal.location.header) {
            existOx = true
            existIdx = idx
          }
        })
        if (existOx) {
          console.log('픽스값 이미 존재')
          setFixedVals(
            produce(fixedVals, draft => {
              draft[existIdx] = tempFixedVal
            })
          )
        } else {
          setFixedVals(
            produce(fixedVals, draft => {
              draft.push(tempFixedVal)
            })
          )
        }
      }
      setTempFixedVal({})
    }
  }
  const onKeyPressOnInput = (e, index, header) => {
    if (e.key === "Enter") {
      confirmInputFixedVal()
    }
  }

  useEffect(() => {
    let type = ''
    if (tempFixedVal.location && tempFixedVal.location.header) {
      console.log(colAttr[tempFixedVal.location.header].type)
      type = colAttr[tempFixedVal.location.header].type
    }
    if (type == 'select') {
      confirmInputFixedVal()
    }
  }, [tempFixedVal])

  const handleChangeInput = (e, index, header, memo) => {
    setFilteredData(
      produce(filteredData, draft => {
        draft[index][header] = e.target.value 
      })
    )
    const {type} = e.target
    let temp1 = {}
    temp1.ref = {}
    temp1.vals = {}
    temp1.location = {index : index, header, header}

    if (Object.keys(tempFixedVal).length > 0) {
      temp1 = tempFixedVal
    }

    temp1.ref[primaryKey] = filteredData[index][primaryKey]
    if (memo) {
      temp1.vals[header + 'Memo'] = e.target.value
    } else {
      if (type == 'checkbox') {
        temp1.vals[header] = e.target.checked
      } else {
        temp1.vals[header] = e.target.value
      }
    }
    if (colAttr[header].type == 'approveCheckBox') {
      temp1.vals[header + 'By'] = user.username
    }
    setTempFixedVal(temp1)
    const validArr = checkValid(colAttr, index, header, e.target.value)
    let joinedValidStr = validArr.join(', ')

    const primaryCode = getPrimaryCode(index)

    setUpdateHelperTexts(    
      produce(updateHelperTexts, draft => {
        draft[primaryCode] = draft[primaryCode] ? draft[primaryCode] : {}
        draft[primaryCode][header] = joinedValidStr
      })
    )
    if (validArr.length > 0) {
      setUpdateValidationError(    
        produce(updateValidationError, draft => {
          draft[primaryCode] = draft[primaryCode] ? draft[primaryCode] : {}
          draft[primaryCode][header] = true
        })
      )
    } else {
      setUpdateValidationError(    
        produce(updateValidationError, draft => {
          draft[primaryCode] = draft[primaryCode] ? draft[primaryCode] : {}
          draft[primaryCode][header] = false
        })
      )
    }
  }

  console.log(fixedVals)
  
  //쿼리인풋 기능
  const querySelected     = useSelector(state => state.query[frameNo])
  useEffect(() => {
    dispatch(actSetFrame(frameNo))
  },[frameNo])
  const onKeyPressOnNewAddedInput = (e, header) => {
    
  }
  useEffect(()=>{
    if (querySelected && querySelected.newAdded) {
      querySelected.newAdded.map((rowObj, index) => {
        if (rowObj !== {}) {
          Object.keys(rowObj).map(key => {
            let primaryKey = rowObj[key].primaryKey
            let nameKey = key
            let primaryValue = rowObj[key].primaryValue
            if(addedNew[index]) {
              setAddedNew(
                produce(addedNew, draft => {
                  draft[index][primaryKey] = rowObj[key].primaryValue
                  delete draft[index][nameKey]
                })
              )
            }
          })
        }
      })
    }
  },[querySelected])
 

  //헤더 메뉴 기능
  const [menuActivated, setMenuActivated]     = useState('');
  const [menuAnchoredEl, setMenuAnchoredEl]   = useState(null);
  const onMouseHover = (event, header) => {
    setMenuAnchoredEl(event.currentTarget)
    setMenuActivated(header)
  }
  const checkMenuActivated = (header) => {
    return (header, menuActivated == header)
  }
  const handleMenuClose = () => {
    setMenuActivated(null)
  }
  const onHidedCulumn   = selectMultipleStates
  const handleClickFlag = selectMultipleStates
  const unhide          = unSelectMultipleStates



  //정렬 기능
  const [order, setOrder]                     = useState('asc');
  const [orderBy, setOrderBy]                 = useState('calories');
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }



  //페이지 기능
  const [page, setPage]                       = useState(0);
  const [rowsPerPage, setRowsPerPage]         = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //CoppiedNew 기능
  const [addCopiedNewDialogOpen, 
    setAddCopiedNewDialogOpen]          = useState(false)
  const [howManyCopiedNew, 
    setHowManyCopiedNew]                = useState(null)
  const setAddCopiedNew = (qty) => {
    setHowManyCopiedNew(qty)
    let tempObj = {}
    Object.keys(checked[0]).map(header => {
      tempObj[header] = checked[0][header]
    })

    let tempArr = []
    for (let i = 0; i < qty; i++) {
      tempArr.push(tempObj)
    }
    setAddedNew(tempArr)
  }
  const onClickCopiedNew = () => {
    setAddCopiedNewDialogOpen(true)
  }
  const addCopiedNewNoDialogAttr = {
    question : 'How many new copied?',
    openState : addCopiedNewDialogOpen,
    setOpenState : setAddCopiedNewDialogOpen,
    answer : howManyCopiedNew,
    setAnswer : setAddCopiedNew
  }

  const [tableSize, setTableSize] = useState(null)

  return (
    <React.Fragment>
      {debugMode ? <Paper style = {{color : 'red'}}> 프레임넘버는 {frameNo}, 현Comp는 {currentType}, {currentNo}, 마더comp는 {motherType}, {motherNo} </Paper>: '디버그모드false'}

      <Dialog
        open = {openConfirmDialog}
        onClose = {handleCloseConfirmDialog}
        onExit = {() => {
          setTempFixedVal({})
        }}
        onKeyPress={(event) => {
          event.preventDefault()
          if (event.key == 'Enter') {
            confirmInputFixedVal()
            handleCloseConfirmDialog()
          }
        }}
      >
        <DialogTitle id="alert-dialog-title">Are you confirm the data you input?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you want to input the data, please press the 'Enter' key now.
            If you cancel the date, please press the 'Esc' key now.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Disagree
          </Button>
          <Button onClick={handleCloseConfirmDialog} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <PopQuestionDlg
        attr = {addCopiedNewNoDialogAttr}
      ></PopQuestionDlg>

      {/* 숨긴 열 표시 부분 */}
      <div>
        {hided.map((columns, idx) => {
          return(
            <button key = {idx} onClick = {event => unhide(columns, hided, setHided)}>{columns}</button>
          )
        })}
      </div>
      
      {/* 검색필터창 */}
      <Input 
        id = 'sea'
        label  = 'dfe'
        onChange = {(e) => {onInputFilterKeyword(e)}}
        value    = {filterKeyword}
      ></Input>

      {/* 픽스모드 버튼 */}
      {fixModable ? <button onClick = { onFix.onSetfixMode }>fixmode</button> :''}

      <StyledTableContainer size = {tableSize}>
        <StyledTable >
          <StyledTableHeader>
            <TableRow>
              {tableHeaderVals && flagAble ? 
                <StyledTableCell size = '10px'></StyledTableCell>:''
              }
              {tableHeaderVals !== [] ? <StyledTableCell size = '10px'>No</StyledTableCell> : ''}  
              {tableHeaderVals ? tableHeaderVals.map((header, index) => {
                let isColumnHided = isHidedCulumn(header)
                if (!isColumnHided) {
                  return (
                    <StyledTableCell key = {index} style = {{textAlign : 'center'}}>
                      {spacelize(header)}
                      <Menu
                        key="menu"
                        open={checkMenuActivated(header)}
                        anchorEl={menuAnchoredEl}
                        onClose={handleMenuClose}
                        transitionDuration = {0}
                        autoFocus = {true}>
                        <MenuItem onClick={event => onHidedCulumn(header, null, hided, setHided)}>
                          Hide
                        </MenuItem>
                        <MenuItem>
                          Filter
                        </MenuItem>
                        <List>
                          <ListSubheader>Nested List Items</ListSubheader>
                          <ListItemText>fefe</ListItemText>
                        </List>
                      </Menu>
                    </StyledTableCell>
                  )
                }
              }) : ''}
              {tableButton ? tableButton.map((obj, index) => {
                return(
                  <StyledTableCell key = {index}>
                    {obj.title}
                  </StyledTableCell>
                )
              }):''}

            </TableRow>
          </StyledTableHeader>
          
          <StyledTableBody>
            {filteredData ? stableSort(filteredData, getComparator(order, orderBy))
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             .map((row, idxRow) => {
              const labelId = `enhanced-table-checkbox-${idxRow}`;
              // console.log(filteredData[row])
              const isSelectedRow = isSelected(filteredData[idxRow][primaryKey])
              return(
                <TableRow 
                  key = {tableHeaderVals[idxRow]}
                  // style = {{height : '200px'}}
                >
                  {flagAble ? 
                    <StyledTableCell style = {{padding : '0px', margin : '0px'}}>
                      <StyledCheckBox
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={event => handleClickFlag(row, null, checked, setChecked)}
                        checked= {isSelectedRow}
                      />
                    </StyledTableCell>:''
                  }
                  <StyledTableCell>
                    {idxRow+1}
                  </StyledTableCell>

                  {tableHeaderVals.map((header) => {
                    let fixable                   = onFix.checkColFixable(idxRow, header)
                    let fixed                     = onFix.checkCellFixed(idxRow, header)

                    let isfixableCol              = isFixable(header)
                    let isInputCol                = colAttr[header].defaultInput
                    let isCalValueCol             = colAttr[header].calValue
                    let isQueryCol                = colAttr[header].query
                    let isColumnHided             = isHidedCulumn(header)

                    let matchedType               = isMatchedType(header)

                    let size = colAttr[header] ? colAttr[header].size ? colAttr[header].size : '10px' :'10px'

                    const compAttr = getCompAttr(idxRow, header)

                    if (!isColumnHided) {
                      if (fixable && isfixableCol) {
                        return (<InputMiniHelperCell attr = {compAttr}/>)
                      }
                      else if (matchedType == 'select' && fixMode){
                        return(<SelectCell  key = {'select' + idxRow} attr = {compAttr}/>)
                      } 
                      else if (matchedType == 'file'){
                        return(<DropZoneCell attr = {compAttr}/>)
                      } 
                      else if (matchedType == 'singleNote'){
                        return(<SingleNoteCell attr = {compAttr}/>)
                      } 
                      else if (matchedType == 'approveCheckBox') { 
                        return(<ChkBoxWithAlertCell attr = {compAttr}/>)
                      } 
                      else if (matchedType == 'includingMany') {
                        return (<IncludingManyCell attr = {compAttr}/>)
                      }
                      else if (fixMode && isQueryCol) { 
                        return (<QueryInputCell attr = {compAttr}/>)
                      } 
                      else if (isCalValueCol) { 
                        return (<CalValueCell attr = {compAttr}/>)
                      }
                      else if (isInputCol) { 
                        return (
                          <StyledTableCell fixable = {isfixableCol}>
                            <StyledInput 
                              onChange = {(event) => handleChangeInput(event, idxRow, header)} 
                              key = {header }
                              endAdornment = {<InputAdornment position="start">fdfe</InputAdornment>}
                              startAdornment={<InputAdornment position="start">$</InputAdornment>}
                              value = {filteredData[idxRow][header]} 
                              onKeyPress = {(event) => onKeyPressOnInput(event, idxRow, header)}
                            />fdf
                          </StyledTableCell>
                        )
                      }

                      else if (true) {
                        return(
                          <StyledTableCell fixMode = {fixMode} fixed = {fixed} size = {size} fixable = {isfixableCol} onClick = {() => {onClickCols(row[header], idxRow, header)}}>
                            {row[header]}
                          </StyledTableCell>
                        )
                      }
                    }
                  })}

                  {tableButton ? tableButton.map((button, idx4) => {
                    const {title, type, func, mother} = button
                    return(
                      <StyledTableCell key = {idx4}>
                        <button onClick = {e => {
                          let selected = {}
                          selected[nameKey] = {}
                          selected[nameKey].name = filteredData[idxRow][nameKey]
                          selected[nameKey].primaryKey = primaryKey
                          selected[nameKey].primaryValue = filteredData[idxRow][primaryKey]
                          selected.value = row
                          button.func(selected)
                        }}>
                          {button.title}
                        </button>
                      </StyledTableCell>
                    )
                  }):''}
                </TableRow>
              )
            }) :''}


            {addedNew && addedNew.length > 0 ? addedNew.map((row, idxRow) => {
              return (
                <TableRow>
                  <StyledTableCell style = {{padding : '0px', margin : '0px'}}>
                    <StyledCheckBox/>
                  </StyledTableCell>
                  <StyledTableCell>{idxRow + 1}</StyledTableCell>
                    {headers.map((header, idx6) => {
                      const isColumnHided = isHidedCulumn(header)
                      let   isQueryCol    = colAttr[header].query
                      let   matchedType   = isMatchedType(header)
                      const compAttr      = getCompAttr(idxRow, header)

                      if (!isColumnHided && header !== 'id') {
                        if (isQueryCol) {
                          let queryColType  = 'newAdded'
                          return (<QueryInputCell isNew = {true} attr = {compAttr}/>)
                        } 
                        else if (matchedType == 'select') {
                          return (<SelectCell isNew = {true} key = {'select' + idxRow} attr = {compAttr}/>)
                        } 
                        else if (matchedType == 'singleNote') {
                          return(<SingleNoteCell isNew = {true} attr = {compAttr}/>)
                        } 
                        else if (matchedType == 'approveCheckBox') { 
                          return(<ChkBoxWithAlertCell isNew = {true} attr = {compAttr}/>)
                        } 
                        else if (matchedType == 'file') {
                          return(<DropZoneCell isNew = {true} attr = {compAttr}/>)
                        } 
                        else {
                          return (<InputMiniHelperCell isNew = {true} attr = {compAttr}/>)
                        }
                      }
                  })}
                </TableRow>
              )})
            :''}


          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData ? filteredData.length : ''}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <Button onClick = {onAddNewBlank}>add New</Button>
      <Button onClick = {() => onClickSubmitNewAdded(addedNew)}>     Submit New </Button>
      <Button onClick = {() => onClickSubmitUpdatedVals(fixedVals)}> Submit     </Button>
      {checked && checked.length !== 0 ? <Button onClick = {() => {onClickDelete(checked)}}>Delete</Button> :''}
      {checked && checked.length !== 0 ? <Button onClick = {() => {onClickCopiedNew(checked)}}>Copied New</Button> :''}

    </React.Fragment>
  )
}

export default STTable
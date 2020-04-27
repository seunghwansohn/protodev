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

import Checkbox         from '@material-ui/core/Checkbox';
import Input            from '@material-ui/core/Input';

import Menu             from '@material-ui/core/Menu';
import MenuItem         from '@material-ui/core/MenuItem';

import Button           from '@material-ui/core/Button';

import List             from '@material-ui/core/List';
import ListItemText     from '@material-ui/core/ListItemText';
import ListSubheader    from '@material-ui/core/ListSubheader';

import PopQuestionDlg     from '../common/dialogs/PopQuestionDlg';
import DialogActions      from '@material-ui/core/DialogActions';
import DialogContent      from '@material-ui/core/DialogContent';
import DialogContentText  from '@material-ui/core/DialogContentText';
import DialogTitle        from '@material-ui/core/DialogTitle';
import Dialog             from '@material-ui/core/Dialog';

import STInput            from '../common/Input';
import InputAdornment     from '@material-ui/core/InputAdornment';
import QueryInput         from './QueryInput';
import TextField          from '@material-ui/core/TextField';

import SmallKeyPopUp      from './SmallKeyPopUp';

import {generateRandom}     from '../../lib/common';
import axios                from '../../lib/api/axios'
import {getIncludingKeys,
    withoutIncludingKeys }  from '../../lib/common'

import spacelize                        from '../../lib/spacelize'
import filterArrayBySearchKeyword       from '../../lib/filterArrayBySearchKeyword'
import {selectMultipleStates, 
  unSelectMultipleStates}               from '../../lib/tableFuncs'
import {checkDecimal, 
  percent, 
  hasWhiteSpace, 
  maxValue, isPlus}                     from '../../lib/validation';
    
import Paper from '@material-ui/core/Paper';

import DropZone            from './DropZone';
import SingleNote          from './SingleNote';



import { actSelect, 
  actSetFrame, 
  actAddNewBlankQuery}    from '../../modules/query'


import styled   from "styled-components";
import produce  from 'immer'

import Select from 'react-select'

const colors = {
  fixable : '#fff4e2',
  unFixable : '#D3D3D3',
}
const useStyles = makeStyles({
  root: {
    width: '100%',
    flexShrink: 0,
  },
  container: {
    maxHeight: 800,
    color: 'red',
    fontSize :24
  },
  tableHeader: {
    backgroundColor: '#5F9EA0',
    fontSize :18
  }
});

const StyledTable = styled(Table)`
  background-color: #6772e5;
`

const StyledTableHeader = styled(TableHead)`
  background-color: #e4f4e5;
`
const StyledTableBody = styled(TableBody)`
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
  background-color: ${props => props.fixMode ? props.fixable ? colors.fixable : colors.unFixable : '#ffffff'};
  border-style : ${props => props.updated ? 'ridge':'none'};
  &:hover {
    background-color : #eef534;
  }
  max-width : ${props => props.size};
  width : ${props => props.size};
  padding : 0px;
  margin : 0px;
`

const StyledInput = styled(Input)`
  background-color: #ffffff;
  width: ${props => props.width ? props.width : 'auto'};
  &:hover {
    background-color : #eef534;
  }
`
const MiniHelperText = styled(TextField)`
  .MuiFormHelperText-root {
    font-size : 11px;
    color : red;
    width : 100%;
  }
`

const STTable = ({
  motherType,
  motherFrameNo,  
  motherNo,

  dataType,
  states, 
  setStates, 

  attr, 
  acts
}) => {
  
  const {
    onDialogOpen,
    onSubmitNewAdded,
    onSubmitUpdatedVals,
    onDelete,
    onTableCol,
    onUpdateChange
  }                   = acts

  const {
    flagAble,
    fixModeAble,
    queryColSelect,
    colAttr, 
    tableButton, 
    setFindOneResult, 
    initialFilter,
    directQuery,
    reqNo,
  }                   = attr

  const dispatch = useDispatch()


  //개체 기본 속성
  const [frameNo, setFrameNo]  = useState(motherFrameNo ? motherFrameNo : generateRandom())
  const [currentNo, setCurrentNo]  = useState(generateRandom())

  const currentType = motherType + 'Table'
  const containerNo = currentType + '_' + frameNo

  const debugMode                   = useSelector(state => state.common.debugMode)

  //api에서 tableRawData 및 key 설정
  const [rawData, 
    setRawData]                       = useState([])
  const [includingKeys, 
      setIncludingKeys]               = useState([]);
  const [findingKeys, 
      setFindingKeys]                 = useState([]);
  const getRawData = async () => {
    await axios.get('/api/' + dataType + '/load').then(res => {
      setPrimaryKey(res.data.primaryKey)
      setIncludingKeys(res.data.includingKeys)
      setRawData(withoutIncludingKeys(res.data.vals))
      setFindingKeys(res.data.findingKeys)
    })
  }
  useEffect(() => {
    getRawData()
  },[])


  //테이블 필터
  const [filterKeyword, setFilterKeyword]     = useState('');
  const [filteredData, setFilteredData]       = useState(rawData);
  //검색어 필터 기능
  useEffect(() => {
    setFilteredData(rawData)
  },[rawData])
  useEffect(() => {
    if (filteredData.length == 1 && initialFilter == filterKeyword) { 
      console.log('검색결과 하나임')
      if (directQuery && setFindOneResult && typeof setFindOneResult == "function") {
        setFindOneResult(filteredData[0])
        console.log('검색결과하나입력')
        dispatch(onDialogOpen(false, 'client_' + frameNo))
      }
    }
  },[filteredData])
  const onInputFilterKeyword = (e) => {
    e.preventDefault(); 
    setFilterKeyword(e.target.value)
  }
  useEffect(() => {
    setFilterKeyword(initialFilter)
  },[initialFilter])
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
  const {update} = useSelector(({ item }) => ({ update : item.table.update }));
  if (update) {
    getRawData()
    onUpdateChange(false)
    setUpdated(true)
  }


  //초기 헤더 설정 기능
  let headers = rawData && rawData.length > 0 ? Object.keys(rawData[0]) : []
  const [tableHeaderVals, setTableHeaderVals] = useState([]);
  // -- 아예 삭제할 컬럼 설정
  useEffect(() => {
    const deleteKey = 'id'
    headers = headers.filter(function (el) {
      return el !== deleteKey
    })
    setTableHeaderVals(headers)
  },[rawData])


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
    setSelected([])
    await setUpdated(true)
  }

  //각 컬럼 성격 설정 기능
  const [hided, setHided]                     = useState([]);
  const [fixableCols, setFixableCols]         = useState([]);
  const [primaryKey, setPrimaryKey]           = useState('');
  const [nameKey, setNameKey]                 = useState('');
  const [inputCols, setInputCols]             = useState([]);
  const [calValueCols, setCalValueCols]       = useState([]);
  const [queryCols, setQueryCols]             = useState([]);
  useEffect(() => {
    let tmpPrimaryKey = ''
    let tmpNameKey = ''
    let tmpDefaultHided = []
    let tempFixableCols = []
    let tmpDefaultInput = []
    let tmpCalValueCols = []
    let tmpQueryCols    = []
    Object.keys(colAttr).map(key => {
      if(colAttr[key].defaultHided){
        tmpDefaultHided.push(key)
      }
      if(colAttr[key].fixable){
        tempFixableCols.push(key)
      }
      if(colAttr[key].primary){
        tmpPrimaryKey = key
      }
      if(colAttr[key].nameKey){
        tmpNameKey = key
      }
      if(colAttr[key].defaultInput){
        tmpDefaultInput.push(key)
      }
      if(colAttr[key].calValue){
        tmpCalValueCols.push(key)
      }
      if(colAttr[key].query){
        tmpQueryCols.push(key)
      }
    })
    setHided(tmpDefaultHided)
    setFixableCols(tempFixableCols)
    setPrimaryKey(tmpPrimaryKey)
    setNameKey(tmpNameKey)
    setInputCols(tmpDefaultInput)
    setCalValueCols(tmpCalValueCols)
    setQueryCols(tmpQueryCols)
  },[])
  const isHidedCulumn = name => hided.indexOf(name)       !== -1;
  const isFixable     = name => fixableCols.indexOf(name) !== -1;
  const isInput       = name => inputCols.indexOf(name) !== -1;
  const isCalValue    = name => calValueCols.indexOf(name) !== -1;
  const isQuery       = name => queryCols.indexOf(name) !== -1;
  const isSelected    = code => {
    let ox = false
    selected.map(obj => {
      if (obj[primaryKey] == code) {
        ox = true
      }
    })
    return ox
  }
  const isSelectType  = header => {
    let ox = false
    let type = colAttr[header] ? colAttr[header].type ? colAttr[header].type : '' : ''
    if (type == 'select') {
      ox = true
    }
    return ox
  }
  const isFileType  = header => {
    let ox = false
    let type = colAttr[header] ? colAttr[header].type ? colAttr[header].type : '' : ''
    if (type == 'file') {
      ox = true
    }
    return ox
  }
  const isSingleNoteType  = header => {
    let ox = false
    let type = colAttr[header] ? colAttr[header].type ? colAttr[header].type : '' : ''
    if (type == 'singleNote') {
      ox = true
    }
    return ox
  }



  //selectType 관련
  const [selectOptions, setSelectOptions] = useState({})
  const [selectedVal, setSelectedVal]     = useState({})

  useEffect(() => {
    let colAttrKeys = Object.keys(colAttr)
    colAttrKeys.map(async key => {
      let type = await colAttr[key].type ? colAttr[key].type : ''
      if (type == 'select') {
        // console.log(type)
        let dataType = await colAttr[key].dataType
        await axios.get('/api/' + dataType + '/load').then(res => {
          let tempOptionsArr = []
          let tempNamesArr = []
          let vals = res.data.vals
          let code = colAttr[key].code
          let name = colAttr[key].name
          vals.map(obj => {
            let tempObj = {}
            tempObj.value = obj[code]
            tempObj.label = obj[name]
            tempOptionsArr.push(tempObj)
          })
          setSelectOptions(
            produce(selectOptions, draft => {
              draft[key] = tempOptionsArr
            })
          )
        })
      }
    })
  },[])
  const handleChangeSelect = (event, index) => {
    setSelectedVal(
      produce(selectedVal, draft => {
        draft[index] = event
      })
    )
  }


  //인덱스값만 넣어서 primaryCode를 얻는 기능
  const getPrimaryCode = (index) => {
    return filteredData[index][primaryKey]
  }

  //업데이트 기능
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
  const onSetfixMode = () => {
    if (fixModeAble) {
      fixMode ? setFixMode(false) : setFixMode(true)
    }
    else if (!fixModeAble) {
      setFixMode(false)
    }
  }
  const checkColFixable = (index, header) => {
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
  }
  const checkCellFixed = (index, header) => {
    let ox = false
    fixedVals.map(obj => {
      if (obj.location.index == index && Object.keys(obj.vals).includes(header)) {
        ox = true
      }
    })
    return ox
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

  //      테이블 클릭시 가격 클릭이랑 나머지 클릭이랑 따로 나눔
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

  //  --값 update 후 다른 컬럼 클릭했을 때
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }
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

  //Validation기능
  const checkValid = (index, header, value) => {
    let tempArr = []
    let funcs = {    
      number : val => val && isNaN(Number(val)) ? 'Only Number' : undefined,
      code   : val => val && hasWhiteSpace(val) ? 'Space(x)' : undefined,
      string   : val => undefined,
      percent   : val => val && percent(val) ? 'Space(x)' : undefined,
      decimal : val => val && hasWhiteSpace(val) ? 'Space(x)' : undefined,
      plus : val => val && isPlus(val) ? 'only Plus or 0' : undefined,
      minValue15 : val => val && maxValue(val, 15) ? 'Value is exceed maximum' : undefined,
      maxValue5 : val => val && maxValue(val, 5) ? 'Value is exceed maximum' : undefined,
      max1 : val => val && maxValue(val, 1) ? 'Value is exceed maximum' : undefined,
      max15 : val => val && maxValue(val, 15) ? 'Value is exceed maximum' : undefined,
      decimal2 : val => val && checkDecimal(val, 2) == true ? '1.xx (o), 1.xxx (x)' : undefined
    }
    if (colAttr[header].validate) {
      colAttr[header].validate.map(str => {
        if (funcs[str] && funcs[str](value) !== undefined) {
          tempArr.push(funcs[str](value))
        }
      })
    }
    return tempArr
  }
  //    -- QueryInput error props 반환용 함수
  const getValid = (header) => {
    let valid = ''
    Object.keys(colAttr).map(key => {
      if(header == key) {
        valid = colAttr[key].validate
      }
    })
    return valid
  }


//빈 새열 추가 기능
  //---HelperText 및 error 구현기능
  const [newAddedhelperTexts, setNewAddedHelperTexts] = useState([])
  const [newAddedError, setNewAddedError] = useState([])
  //--------------------------
  const onAddNewBlank = () => {
    let tempObj = {}
    headers.map(header => {
      tempObj[header] = null
    })
    setAddedNew(
      produce(addedNew, draft => {
        draft.push(tempObj)
      }) 
    )
    setNewAddedHelperTexts(
      produce(newAddedhelperTexts, draft => {
        draft.push({})
      })
    )
    setNewAddedError(
      produce(newAddedError, draft => {
        draft.push({})
      })
    )
    // dispatch(actAddNewBlankQuery(frameNo))
  }
  //newAdded 값 변경 기능
  const handleChangeNewAddedInput = (event, index, header) => {
    const temp = event.target.value
    setAddedNew(
      produce(addedNew, draft => {
        draft[index][header] = temp
      })
    )
    const validArr = checkValid(index, header, event.target.value)
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


  //값 update시 인풋 처리 기능
  const [tempFixedVal, setTempFixedVal]     = useState({});
  const [updateHelperTexts, 
    setUpdateHelperTexts]                   = useState({})
  const [updateValidationError, 
    setUpdateValidationError]               = useState({})

  //방금 고친 값 발리데이션 에러 있는지 체크
  const checkNoValidationErrorAtAll = () =>{
    const {location} = tempFixedVal
    const {header} = location
    const primaryCode = getPrimaryCode(location.index)
    return updateValidationError[primaryCode][header] == true ? true : false
  }
  //인풋값 fixed한 후 submit전에 엔터쳐서 임시로 확정
  const confirmInputFixedVal = () => {
    console.log('컨펌인풋픽스드')
    const temp = {}
    const isNowError = checkNoValidationErrorAtAll()
    if (isNowError == true) {
    }else {
      setFixableCells(temp)  
      setFixedVals(
        produce(fixedVals, draft => {
          draft.push(tempFixedVal)
        })
      )
      setTempFixedVal({})
    }
  }
  const onKeyPressOnInput = (e, index, header) => {
    if (e.key === "Enter") {
      confirmInputFixedVal()
    }
  }
  const handleChangeInput = (e, index, header) => {
    setFilteredData(
      produce(filteredData, draft => {
        draft[index][header] = e.target.value 
      })
    )
    let temp1 = {}
    temp1.ref = {}
    temp1.vals = {}
    temp1.location = {index : index, header, header}
    temp1.ref[primaryKey] = filteredData[index][primaryKey]
    temp1.vals[header] = e.target.value

    setTempFixedVal(temp1)
    const validArr = checkValid(index, header, e.target.value)
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
    Object.keys(selected[0]).map(header => {
      tempObj[header] = selected[0][header]
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


  //테이블 셀렉트
  const [selected, setSelected]         = useState([]);

  const check = () => {
    console.log(addedNew)
  }

  useEffect(() => {
    console.log(selected)
  },[selected])




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
            console.log('엔터키눌림')
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

      <div>
        {hided.map((columns, idx) => {
          return(
            <button key = {idx} onClick = {event => unhide(columns, hided, setHided)}>{columns}</button>
          )
        })}
      </div>

      <Input 
        id = 'sea'
        label  = 'dfe'
        onChange = {(e) => {onInputFilterKeyword(e)}}
        value    = {filterKeyword}
      ></Input>

      {fixModeAble ? <button onClick = { onSetfixMode }>fixmode</button> :''}

      <TableContainer>
        <StyledTable size = {'small'}>

          <StyledTableHeader>
            <TableRow>
              {tableHeaderVals && attr.flagAble ? 
                <StyledTableCell size = '10px'></StyledTableCell>:''
              }
              {tableHeaderVals !== [] ? <StyledTableCell size = '10px'>No</StyledTableCell> : ''}  
              {tableHeaderVals ? tableHeaderVals.map((header, index) => {
                const isColumnHided = isHidedCulumn(header)
                if (!isColumnHided) {
                  return (
                    <TableCell key = {index} style = {{textAlign : 'center'}}>
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
                    </TableCell>
                  )
                }
              }) : ''}
              {tableButton ? tableButton.map((obj, index) => {
                return(
                  <TableCell key = {index}>
                    {obj.title}
                  </TableCell>
                )
              }):''}

            </TableRow>
          </StyledTableHeader>
          
          <StyledTableBody>
            {filteredData ? stableSort(filteredData, getComparator(order, orderBy))
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             .map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              // console.log(filteredData[row])
              const isSelectedRow = isSelected(filteredData[index][primaryKey])
              return(
                <TableRow 
                  key = {tableHeaderVals[index]}
                >
                  {attr.flagAble ? 
                    <TableCell style = {{padding : '0px', margin : '0px'}}>
                      <StyledCheckBox
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={event => handleClickFlag(row, null, selected, setSelected)}
                        checked= {isSelectedRow}
                      />
                    </TableCell>:''
                  }
                  <StyledTableCell>
                    {index+1}
                  </StyledTableCell>

                  {tableHeaderVals.map((header) => {
                    let fixable             = checkColFixable(index, header)
                    let fixed               = checkCellFixed(index, header)
                    let isfixableCol        = isFixable(header)
                    let isInputCol          = isInput(header)
                    let isCalValueCol       = isCalValue(header)
                    let isQueryCol          = isQuery(header)
                    let isColumnHided       = isHidedCulumn(header)
                    let isSelectTypeCol     = isSelectType(header)
                    let isFileTypeCol       = isFileType(header)
                    let isSingleNoteTypeCol = isSingleNoteType(header)

                    let queryColType  = 'fixSelect'

                    let primaryCode = getPrimaryCode(index)

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

                    const getSelectedValue = (key) => {
                      let values = null
                      querySelected.map(obj => {
                        if (obj.reqType == queryColType && obj.key == index) {
                          values = obj.selected
                        }
                      })
                      return values                        
                    }

                    const selectedValue = getSelectedValue()
                    let name = selectedValue && selectedValue.value ? selectedValue.value[header] :''

                    if (!isColumnHided) {
                      if (fixable && isfixableCol) {
                        return (
                          <StyledTableCell fixable = {isfixableCol}>
                            <MiniHelperText 
                              key = {header }
                              value = {filteredData[index][header]} 
                              onChange = {(event) => handleChangeInput(event, index, header)} 
                              onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}
                              helperText = {updateHelperTexts[primaryCode] ? updateHelperTexts[primaryCode][header] : ''}
                              InputProps = {{
                                endAdornment : <InputAdornment position="end"><SmallKeyPopUp>Enter</SmallKeyPopUp><SmallKeyPopUp>Tab</SmallKeyPopUp></InputAdornment>
                              }}
                            />
                          </StyledTableCell>
                        )
                      } else if (isSelectTypeCol){
                        return(
                          <StyledTableCell fixable = {isfixableCol} style = {{width:'150px'}}>
                            <Select 
                              onChange = {event => handleChangeSelect(event, index)}
                              options={selectOptions.sort} 
                            />
                          </StyledTableCell>
                        )
                      } else if (isFileTypeCol){
                          let size = colAttr[header] ? colAttr[header].size ? colAttr[header].size : '10px' :'10px'
                          return(
                            <StyledTableCell fixable = {isfixableCol} size = {size}>

                              <DropZone 
                                // onChange = {event => handleChangeSelect(event, index)}
                                // options={selectOptions.sort} 
                              />
                            </StyledTableCell>
                        )
                      } else if (isSingleNoteTypeCol){
                        let size = colAttr[header] ? colAttr[header].size ? colAttr[header].size : '10px' :'10px'
                        return(
                          <StyledTableCell fixable = {isfixableCol} size = {size}>

                            <SingleNote 
                              // onChange = {event => handleChangeSelect(event, index)}
                              // options={selectOptions.sort} 
                            />
                          </StyledTableCell>
                        ) 
                      } else if (fixMode && isQueryCol) { 
                        let dataType      =  colAttr[header].dataType

                        return (
                          <StyledTableCell fixable = {isfixableCol} style = {{width:'150px'}}>
                            <QueryInput
                              motherFrameNo = {frameNo}
                              motherNo      = {currentNo}
                              motherType    = {currentType}

                              reqType       = {queryColType}
                              dataType      = {dataType}
                              codeNName     = {getMatchedFinding(dataType)}
                              primaryKey    = {primaryKey}

                              addedNo       = {index}
                              label         = {colAttr[header].dataType}
                              initialValue  = {filteredData[index][header]}
                              filteredData  = {filteredData}
                              fixedVals     = {fixedVals}
                              setFixedVals  = {setFixedVals}
                            />
                          </StyledTableCell>
                        )
                      }else if (isInputCol) { 
                        return (
                          <StyledTableCell fixable = {isfixableCol}>
                            <StyledInput 
                              onChange = {(event) => handleChangeInput(event, index, header)} 
                              key = {header }
                              endAdornment = {<InputAdornment position="start">fdfe</InputAdornment>}
                              startAdornment={<InputAdornment position="start">$</InputAdornment>}
                              value = {filteredData[index][header]} 
                              onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}
                            />
                          </StyledTableCell>
                        )
                      }else if (isCalValueCol) { 
                        return (
                          <StyledTableCell fixable = {isfixableCol}>
                            <StyledInput
                              disable 
                              onChange = {(event) => handleChangeInput(event, index, header)} 
                              key = {header }
                              value = {colAttr[header].value(index)} 
                              onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}
                            />
                          </StyledTableCell>
                        )
                      }else if (fixed) {
                        return(
                          <StyledTableCell updated = {showUpdatedSign} style = {{backgroundColor : "lightblue"}} onClick = {() => {onClickCols(row[header], index, header)}}>
                            {row[header]}
                          </StyledTableCell>
                        )
                      }
                      else if (true) {
                        let size = colAttr[header] ? colAttr[header].size ? colAttr[header].size : '10px' :'10px'
                        return(
                          <StyledTableCell fixMode = {fixMode} size = {size} fixable = {isfixableCol} onClick = {() => {onClickCols(row[header], index, header)}}>
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
                          selected[nameKey].name = filteredData[index][nameKey]
                          selected[nameKey].primaryKey = primaryKey
                          selected[nameKey].primaryValue = filteredData[index][primaryKey]
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


            {addedNew && addedNew.length > 0 ? addedNew.map((row, index) => {
              return (
                <TableRow>
                  <StyledCheckBox

                  />
                  <StyledTableCell>{index + 1}<button onClick = {check}></button></StyledTableCell>
                    {headers.map((header, idx6) => {
                      const isColumnHided = isHidedCulumn(header)
                      let   isQueryCol    = isQuery(header)
                      let   valid         = getValid(header)
                      let   isSelectTypeCol = isSelectType(header)

                      if (!isColumnHided && header !== 'id') {
                        if (isQueryCol) {
                          let queryColType  = 'newAdded'
                          let findingKey    = header
                          let dataType      =  colAttr[header].dataType

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

                          const getSelectedValue = (key) => {
                            let values = null
                            querySelected.map(obj => {
                              if (obj.reqType == queryColType && obj.key == index) {
                                values = obj.selected
                              }
                            })
                            return values                        
                          }

                          const selectedValue = getSelectedValue()
                          let name = selectedValue && selectedValue.value ? selectedValue.value[header] :''
                          return(
                            <StyledTableCell>
                              <QueryInput
                                motherFrameNo = {frameNo}
                                motherNo      = {currentNo}
                                motherType    = {currentType}

                                reqType       = {queryColType}
                                dataType      = {dataType}
                                codeNName     = {getMatchedFinding(dataType)}
                                primaryKey    = {primaryKey}

                                addedNo       = {index}
                                label         = {colAttr[header].dataType}
                                initialValue  = {filteredData[index][header]}
                                filteredData  = {filteredData}
                                addedNew      = {addedNew}
                                setAddedNew   = {setAddedNew}
                              />
                            </StyledTableCell>
                          )
                        } else if (isSelectTypeCol) {
                          return (
                            <Select 
                              onChange = {event => handleChangeSelect(event, index)}
                              options={selectOptions.sort} 
                            />
                          )
                        } else {
                            return(
                              <StyledTableCell>
                                <MiniHelperText
                                  value      = {row[header]}
                                  error      = {newAddedError[index][header]} 
                                  style      = {{width : '100%'}}
                                  onChange   = {(event) => handleChangeNewAddedInput(event, index, header)} 
                                  onKeyPress = {(event) => onKeyPressOnNewAddedInput(event, index, header)}
                                  helperText = {newAddedhelperTexts[index][header]}
                                />
                              </StyledTableCell>
                            )
                        }
                      }
                  })}
                </TableRow>
              )})
            :''}


          </StyledTableBody>
        </StyledTable>
      </TableContainer>
      
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
      {selected && selected.length !== 0 ? <Button onClick = {() => {onClickDelete(selected)}}>Delete</Button> :''}
      {selected && selected.length !== 0 ? <Button onClick = {() => {onClickCopiedNew(selected)}}>Copied New</Button> :''}

    </React.Fragment>
  )
}

export default STTable
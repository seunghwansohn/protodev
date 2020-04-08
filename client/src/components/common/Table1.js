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
import IconButton       from '@material-ui/core/IconButton';

import List             from '@material-ui/core/List';
import ListItemText     from '@material-ui/core/ListItemText';
import ListSubheader    from '@material-ui/core/ListSubheader';

import { ExpandLess, 
  ExpandMore, 
  FilterDrama}          from '@material-ui/icons';

import InputDialog      from '../common/InputDialog';
import STInput          from '../common/Input';
import {generateRandom}     from '../../lib/common';


import { actSelect, actSetFrame, actAddNewBlankQuery}               from '../../modules/query'


import BasicFormControl          from './BasicFormControl';

import QueryInput       from './QueryInput';


import TextField from '@material-ui/core/TextField';


import spacelize                        from '../../lib/spacelize'
import filterArrayBySearchKeyword       from '../../lib/filterArrayBySearchKeyword'
import {selectMultipleStates, 
  unSelectMultipleStates}               from '../../lib/tableFuncs'
import {hasWhiteSpace, maxValue}        from '../../lib/validation';


import styled   from "styled-components";
import produce  from 'immer'

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
  background-color: #ffffff;
  width : '10%';
  border-style : ${props => props.updated ? 'ridge':'none'};
  &:hover {
    background-color : #eef534;
  }
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
  }
`

const STTable = ({
  motherType,  
  motherNo,    
  type,
  attr, 
  states, 
  setStates, 
  funcs, 
}) => {
  
  const {
    rawData,
    updated,
    clickedCol,
    addedNew, 
    selected, 
    filterKeyword, 
    filteredData
  }                   = states
  const {
    setRawData, 
    setUpdated, 
    setClickedCol, 
    setAddedNew, 
    setSelected, 
    setFilterKeyword, 
    setFilteredData
  }                   = setStates

  const {
    load, 
    onSubmitUpdatedVals, 
    onDialogOpen, 
    onDelete, 
    onSubmitNewAdded
  }                   = funcs

  const {
    flagAble,
    fixModeAble,
    queryColSelect,
    colAttr, 
    tableButton, 
    setFindOneResult, 
    initialFilter,
    directQuery,
    reqNo
  }                   = attr

  const dispatch = useDispatch()


  //개체 기본 속성
  const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
  const containerNo = type + '_' + frameNo


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


  console.log(addedNew)
  //체크박스 체크 기능
  const [allSelected, setAllselected]         = useState(false);
  const isChecked     = name => selected.indexOf(name)    !== -1;



  


  //업데이트 기능
  const [showUpdatedSign, setShowUpdatedSign] = useState(false);
  useEffect(() => {
    if (updated) {
      setShowUpdatedSign(true)
      setTimeout(() => {
        setShowUpdatedSign(false)
        setFixedVals([])
      }, 3000);
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



  //컬럼 클릭 기능
  const onClickCols = (value, row, header) => {
    const tempObj = {
      value : value,
      type  : type,
      index : row,
      header: header,
      primaryKey : primaryKey
    }
    let tempObj1 = {}
    tempObj1[primaryKey] = rawData[row][primaryKey]

    let tempObj2 = {}
    tempObj2.value  = value
    tempObj2.row    = row
    tempObj2.header = header
    if (fixMode){
      const temp = {row : row, header : header}
      setFixableCells(temp)
    }
    else {
      setClickedCol(tempObj2)
    }
  }

  //값 인풋 처리 기능
  const [fixedVals, setFixedVals]             = useState([]);
  const onKeyPressOnInput = (e, index, header) => {
    if (e.key === "Enter") {
      const temp = {}
      setFixableCells(temp)
      let temp1 = {}
      temp1.ref = {}
      temp1.vals = {}
      temp1.location = {index : index, header, header}
      temp1.ref[primaryKey] = filteredData[index][primaryKey]
      temp1.vals[header] = e.target.value
      setFixedVals(
        produce(fixedVals, draft => {
          draft.push(temp1)
        })
      )
    }
  }
  const handleChangeInput = (e, index, header) => {
    setFilteredData(
      produce(filteredData, draft => {
        draft[index][header] = e.target.value
      })
    )
  }

  //쿼리인풋 기능
  const querySelected     = useSelector(state => state.query[frameNo])
  useEffect(() => {
    dispatch(actSetFrame(frameNo))
  },[frameNo])
  const onKeyPressOnNewAddedInput = (e, header) => {
    
  }


  console.log(querySelected)


  //새로운 행 추가 기능
  //    ---새로운행 validation 기능
  // const checkValid = (row, header) => {
  //   console.ro
  // }

      //---HelperText 및 error 구현기능
  const [helperTexts, setHelperTexts] = useState([])
  const [newAddedError, setNewAddedError] = useState([])

  const checkValid = (index, header, value) => {
    let tempArr = []
    let funcs = {    
      number : val => val && isNaN(Number(val)) ? 'Only Number' : undefined,
      code   : val => val && hasWhiteSpace(val) ? 'Space(x)' : undefined,
      string   : val => val && hasWhiteSpace(val) ? 'Space(x)' : undefined,
      percent   : val => val && hasWhiteSpace(val) ? 'Space(x)' : undefined,
      decimal : val => val && hasWhiteSpace(val) ? 'Space(x)' : undefined,
      minValue15 : val => val && maxValue(val, 15) ? 'Value is exceed maximum' : undefined,
      maxValue5 : val => val && maxValue(val, 5) ? 'Value is exceed maximum' : undefined
    }
    colAttr[header].validate.map(str => {
      if (funcs[str](value) !== undefined) {
        tempArr.push(funcs[str](value))
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

    })
    let joinedStr = tempArr.join(', ')
    setHelperTexts(    
      produce(helperTexts, draft => {
        draft[index][header] = joinedStr
      })
    )
    // setNewAddedError(    
    //   produce(newAddedError, draft => {
    //     draft[index][header] = true
    //   })
    // )
  }

  const getValid = (header) => {
    let valid = ''
    Object.keys(colAttr).map(key => {
      if(header == key) {
        valid = colAttr[key].validate
      }
    })
    return valid
  }
//  -- 빈 새열 추가 기능
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
    setHelperTexts(
      produce(helperTexts, draft => {
        draft.push({})
      })
    )
    setNewAddedError(
      produce(newAddedError, draft => {
        draft.push({})
      })
    )
    dispatch(actAddNewBlankQuery(frameNo))
  }
  const handleChangeNewAddedInput = (event, index, header) => {
    const temp = event.target.value
    setAddedNew(
      produce(addedNew, draft => {
        draft[index][header] = temp
      })
    )
    checkValid(index, header, event.target.value)
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



  //검색어 필터 기능
  useEffect(() => {
    setFilteredData(rawData)
  },[rawData])
  useEffect(() => {
    if (filteredData.length == 1) {
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

  const check = () => {
    console.log(addedNew)
  }



  return (
    <React.Fragment>

      <InputDialog
        attr = {addCopiedNewNoDialogAttr}
      ></InputDialog>

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
                <StyledTableCell></StyledTableCell>:''
              }
              {tableHeaderVals !== [] ? <StyledTableCell>No</StyledTableCell> : ''}  
              {tableHeaderVals ? tableHeaderVals.map((header, index) => {
                const isColumnHided = isHidedCulumn(header)
                if (!isColumnHided) {
                  return (
                    <TableCell key = {index}>
                      {header}
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
              const isItemSelected = isChecked(row)
              const labelId = `enhanced-table-checkbox-${index}`;
              return(
                  <TableRow 
                    key = {tableHeaderVals[index]}
                  >
                    {attr.flagAble ? 
                      <TableCell padding="checkbox">
                        <StyledCheckBox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={event => handleClickFlag(row, null, selected, setSelected)}
                        />
                      </TableCell>:''
                    }
                    <StyledTableCell>
                      {index+1}
                    </StyledTableCell>
                    {tableHeaderVals.map((header, idx3) => {
                      let fixable = checkColFixable(index, header)
                      let fixed = checkCellFixed(index, header)
                      let isfixableCol = isFixable(header)
                      let isInputCol   = isInput(header)
                      let isCalValueCol   = isCalValue(header)
                      let isQueryCol      = isQuery(header)
                      let isColumnHided = isHidedCulumn(header)

                      if (!isColumnHided) {
                        if (fixable && isfixableCol) {
                          return (
                            <StyledTableCell>
                              <Input 
                              onChange = {(event) => handleChangeInput(event, index, header)} 
                              key = {header }
                              value = {filteredData[index][header]} 
                              onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}/>
                            </StyledTableCell>
                          )
                        }else if (isInputCol) { 
                          return (
                            <StyledTableCell>
                              <Input 
                                onChange = {(event) => handleChangeInput(event, index, header)} 
                                key = {header }
                                value = {filteredData[index][header]} 
                                onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}
                              />
                            </StyledTableCell>
                          )
                        }else if (isCalValueCol) { 
                          return (
                            <StyledTableCell>
                              <Input
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
                        }else if (true) {
                          return(
                            <StyledTableCell key = {'basic' + idx3} onClick = {() => {onClickCols(row[header], index, header)}}>
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
                {headers.map(header => {
                  const isColumnHided = isHidedCulumn(header)
                  let   isQueryCol    = isQuery(header)
                  let   valid         = getValid(header)
                  if (!isColumnHided && header !== 'id') {

                    if (isQueryCol) {
                      //자꾸 리렌더링되므로 이것도 state로 바꾸어야 함.
                      // dispatch(actSelect(frameNo, reqNo, {}))
                      return(
                        <StyledTableCell>
                          <QueryInput
                            motherType  = {type}
                            motherNo    = {frameNo}
                            addedNo     = {index}
                            valuee     = {querySelected.newAdded[index].supplierCode}                            
                            dialog     = {colAttr[header].dialog} 
                            onChange   = {(event) => handleChangeNewAddedInput(event, index, header)} 
                            onKeyPress = {(event) => onKeyPressOnNewAddedInput(event, index, header)}
                            selectFunc = {queryColSelect}
                            helperText =  "Incorrect entry."
                            reqType      = {'newAdded'}
                          />
                        </StyledTableCell>
                      )
                    }else {
                      return(
                        <StyledTableCell>
                          <MiniHelperText
                            value      = {row[header]}
                            error      = {newAddedError[index][header]} 
                            onChange   = {(event) => handleChangeNewAddedInput(event, index, header)} 
                            onKeyPress = {(event) => onKeyPressOnNewAddedInput(event, index, header)}
                            helperText = {helperTexts[index][header]}
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
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}/>

      <Button onClick = {onAddNewBlank}>add New</Button>
      <Button onClick = {() => onSubmitNewAdded(addedNew)}>     Submit New </Button>
      <Button onClick = {() => onSubmitUpdatedVals(fixedVals)}> Submit     </Button>
      {selected && selected.length !== 0 ? <Button onClick = {() => {onDelete(selected)}}>Delete</Button> :''}
      {selected && selected.length !== 0 ? <Button onClick = {() => {onClickCopiedNew(selected)}}>Copied New</Button> :''}

    </React.Fragment>
  )
}

export default STTable
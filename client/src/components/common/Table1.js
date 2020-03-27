import React, {useEffect, useState} from 'react';
import {useDispatch}                from 'react-redux';

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

import TextField from '@material-ui/core/TextField';


import spacelize                               from '../../lib/spacelize'
import filterArrayBySearchKeyword              from '../../lib/filterArrayBySearchKeyword'
import {selectMultipleStates, 
  unSelectMultipleStates}                      from '../../lib/tableFuncs'

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

const STTable = ({
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
    colAttr, 
    tableButton, 
    setFindOneResult, 
    frameNo, 
    initialFilter
  }                   = attr
  

  let headers = rawData && rawData.length > 0 ? Object.keys(rawData[0]) : []

  const [tableHeaderVals, setTableHeaderVals] = useState([]);

  const [hided, setHided]                     = useState([]);
  const [fixableCols, setFixableCols]         = useState([]);
  const [primaryKey, setPrimaryKey]           = useState('');
  const [inputCols, setInputCols]             = useState([]);
  const [calValueCols, setCalValueCols]       = useState([]);


  const [order, setOrder]                     = useState('asc');
  const [orderBy, setOrderBy]                 = useState('calories');
  const [page, setPage]                       = useState(0);
  const [rowsPerPage, setRowsPerPage]         = useState(10);

  const [allSelected, setAllselected]         = useState(false);

  const [fixMode, setFixMode]                 = useState(false);
  const [fixableCells, setFixableCells]       = useState({});

  const [fixedVals, setFixedVals]             = useState([]);

  const [showUpdatedSign, setShowUpdatedSign] = useState(false);

  const [menuActivated, setMenuActivated]     = useState('');
  const [menuAnchoredEl, setMenuAnchoredEl]   = useState(null);

  const [addCopiedNewDialogOpen, 
        setAddCopiedNewDialogOpen]          = useState(false)

  const [howManyCopiedNew, 
        setHowManyCopiedNew]                = useState(null)

  const dispatch = useDispatch()



  useEffect(() => {
    setFilterKeyword(initialFilter)
  },[initialFilter])

  useEffect(() => {
    setFilteredData(rawData)
  },[rawData])

  useEffect(() => {
    const deleteKey = 'id'
    headers = headers.filter(function (el) {
      return el !== deleteKey
    })
    setTableHeaderVals(headers)
  },[rawData])

  useEffect(() => {
    if (filteredData.length == 1) {
      console.log('검색결과 하나임')
      if (setFindOneResult && typeof setFindOneResult == "function") {
         setFindOneResult(filteredData[0])
         console.log('검색결과하나입력')
         dispatch(onDialogOpen(false, 'client_' + frameNo))
      }
    }
  },[filteredData])

  useEffect(() => {
    console.log('필터실행중')
    if (filterKeyword !== null && filterKeyword !== undefined && filterKeyword !== ''){
      setFilteredData(filterArrayBySearchKeyword(filterKeyword, rawData, primaryKey))

    } else {
      console.log('엘스실행됨')
      setFilteredData(rawData)
    }
  },[filterKeyword, rawData])

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
  
  useEffect(() => {
    let tmpPrimaryKey = ''
    let tmpDefaultHided = []
    let tempFixableCols = []
    let tmpDefaultInput = []
    let tmpCalValueCols = []

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
      if(colAttr[key].defaultInput){
        tmpDefaultInput.push(key)
      }
      if(colAttr[key].calValue){
        tmpCalValueCols.push(key)
      }
    })
    setHided(tmpDefaultHided)
    setFixableCols(tempFixableCols)
    setPrimaryKey(tmpPrimaryKey)
    setInputCols(tmpDefaultInput)
    setCalValueCols(tmpCalValueCols)
  },[])

  console.log(inputCols)
  const isChecked     = name => selected.indexOf(name)    !== -1;
  const isHidedCulumn = name => hided.indexOf(name)       !== -1;
  const isFixable     = name => fixableCols.indexOf(name) !== -1;
  const isInput       = name => inputCols.indexOf(name) !== -1;
  const isCalValue    = name => calValueCols.indexOf(name) !== -1;



  const onHidedCulumn   = selectMultipleStates
  const handleClickFlag = selectMultipleStates
  const unhide          = unSelectMultipleStates

  const checkColFixablity = (key) => {
    return {
      'supplierCode' : true
    }[key]
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
  
  const checkDefaultInputCol = (header) => {

  }
  
  const onSetfixMode = () => {
    fixMode ? setFixMode(false) : setFixMode(true)
  }

  const onClickCols = (value, row, header) => {
    const tempObj = {
      value : value,
      type  : type,
      index : row,
      header: header
    }
    if (fixMode){
      const temp = {row : row, header : header}
      setFixableCells(temp)
    }
    else {
      setClickedCol(tempObj)
    }
  }

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
  }

  const handleChangeNewAddedInput = (event, index, header) => {
    const temp = event.target.value
    setAddedNew(
      produce(addedNew, draft => {
        draft[index][header] = temp
      })
    )
  }



  const onKeyPressOnNewAddedInput = (e, header) => {
  }

  const onMouseHover = (event, header) => {
    setMenuAnchoredEl(event.currentTarget)
    setMenuActivated(header)
  }

  const openMenu = (e, header) =>{
  }

  const checkMenuActivated = (header) => {
    return (header, menuActivated == header)
  }
  
  const handleMenuClose = () => {
    setMenuActivated(null)
  }

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const onInputFilterKeyword = (e) => {
    e.preventDefault(); 
    setFilterKeyword(e.target.value)
  }

  return (
    <React.Fragment>

      <InputDialog
        attr = {addCopiedNewNoDialogAttr}
      ></InputDialog>

      <div>
        {hided.map(columns => {
          return(
            <button onClick = {event => unhide(columns, hided, setHided)}>{columns}</button>
          )
        })}
      </div>
      {/* <SearchBar> */}
        <Input 
          id = 'sea'
          label  = 'dfe'
          onChange = {(e) => {onInputFilterKeyword(e)}}
          value    = {filterKeyword}
        ></Input>
      {/* </SearchBar> */}
      <button onClick = { onSetfixMode }>fixmode</button>
      <TableContainer>
        <StyledTable size = {'small'}>
          <StyledTableHeader>
            <TableRow>
              {tableHeaderVals && attr.flag ? 
                <StyledTableCell></StyledTableCell>:''
              }
              {tableHeaderVals !== [] ? <StyledTableCell>No</StyledTableCell> : ''}  
              {tableHeaderVals ? tableHeaderVals.map((header, index) => {
                const isColumnHided = isHidedCulumn(header)
                if (!isColumnHided) {
                  return (
                    <TableCell>
                      {header}
                      <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick = {(event) => onMouseHover(event, header)}>
                        <ExpandMore />
                      </IconButton>
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
              {tableButton ? tableButton.map(obj => {
                return(
                  <TableCell>
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
                    {attr.flag ? 
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
                    {tableHeaderVals.map(header => {
                      let fixable = checkColFixable(index, header)
                      let fixed = checkCellFixed(index, header)
                      let isfixableCol = isFixable(header)
                      let isInputCol   = isInput(header)
                      let isCalValueCol   = isCalValue(header)

                      console.log(isCalValueCol)
                      const isColumnHided = isHidedCulumn(header)
                      if (!isColumnHided) {
                        if (fixable & isfixableCol) {
                          return (
                            <Input 
                            onChange = {(event) => handleChangeInput(event, index, header)} 
                            key = {header }
                            value = {filteredData[index][header]} 
                            onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}/>
                          )
                        }else if (isInputCol) { 
                          return (
                            <Input 
                              onChange = {(event) => handleChangeInput(event, index, header)} 
                              key = {header }
                              value = {filteredData[index][header]} 
                              onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}
                            />
                          )
                        }else if (isCalValueCol) { 
                          console.log(colAttr[header].value(index))
                          console.log(header)
                          return (
                            <Input
                              disable 
                              onChange = {(event) => handleChangeInput(event, index, header)} 
                              key = {header }
                              value = {colAttr[header].value(index)} 
                              onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}
                            />
                          )
                        }else if (fixed) {
                            return(
                              <StyledTableCell updated = {showUpdatedSign} style = {{backgroundColor : "lightblue"}} onClick = {() => {onClickCols(row[header], index, header)}}>
                                {row[header]}
                              </StyledTableCell>
                            )
                        }else if (true) {
                            return(
                              <StyledTableCell onClick = {() => {onClickCols(row[header], index, header)}}>
                                {row[header]}
                              </StyledTableCell>
                            )
                        }
                    }
                    })}
                    {tableButton ? tableButton.map(obj => {
                      return(
                        <StyledTableCell>
                          <button onClick = {e => obj.func(row)}>
                            {obj.title}
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
                <StyledTableCell>{index + 1}</StyledTableCell>
                {headers.map(header => {
                  const isColumnHided = isHidedCulumn(header)
                  if (!isColumnHided && header !== 'id') {
                    return(
                      <StyledTableCell>
                        <Input
                          value      = {row[header]} 
                          onChange   = {(event) => handleChangeNewAddedInput(event, index, header)} 
                          onKeyPress = {(event) => onKeyPressOnNewAddedInput(event, index, header)}/>
                      </StyledTableCell>
                    )
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
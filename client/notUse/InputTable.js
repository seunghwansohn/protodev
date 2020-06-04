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


import {spacelize}                  from '../../lib/funcs/fString'
import filterArrayBySearchKeyword   from '../../lib/filterArrayBySearchKeyword'
import {selectMultipleStates, 
  unSelectMultipleStates}           from '../../lib/tableFuncs'

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
  }                   = funcs

  const {
    colAttr, 
    tableButton, 
    setFindOneResult, 
    frameNo, 
    initialFilter,
    directQuery
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
      if (directQuery && setFindOneResult && typeof setFindOneResult == "function") {
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

  const isChecked     = name => selected.indexOf(name)    !== -1;
  const isHidedCulumn = name => hided.indexOf(name)       !== -1;
  const isFixable     = name => fixableCols.indexOf(name) !== -1;
  const isInput       = name => inputCols.indexOf(name) !== -1;
  const isCalValue    = name => calValueCols.indexOf(name) !== -1;

  const onHidedCulumn   = selectMultipleStates
  const handleClickFlag = selectMultipleStates
  const unhide          = unSelectMultipleStates

  const checkCellFixed = (index, header) => {
    let ox = false
    fixedVals.map(obj => {
      if (obj.location.index == index && Object.keys(obj.vals).includes(header)) {
        ox = true
      }
    })
    return ox
  }
  

  
  const onSetfixMode = () => {
    fixMode ? setFixMode(false) : setFixMode(true)
  }

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
    if (fixMode){
      const temp = {row : row, header : header}
      setFixableCells(temp)
    }
    else {
      setClickedCol(tempObj1)
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

  const onKeyPressOnNewAddedInput = (e, header) => {
  }

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

  const onInputFilterKeyword = (e) => {
    e.preventDefault(); 
    setFilterKeyword(e.target.value)
  }

  return (
    <React.Fragment>

      <div>
        {hided.map(columns => {
          return(
            <button onClick = {event => unhide(columns, hided, setHided)}>{columns}</button>
          )
        })}
      </div>
        <Input 
          id = 'sea'
          label  = 'dfe'
          onChange = {(e) => {onInputFilterKeyword(e)}}
          value    = {filterKeyword}
        ></Input>
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
                      let fixed = checkCellFixed(index, header)
                      let isfixableCol = isFixable(header)
                      let isInputCol   = isInput(header)
                      let isCalValueCol   = isCalValue(header)

                      const isColumnHided = isHidedCulumn(header)
                      if (!isColumnHided) {

                        if (isInputCol) { 
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
          onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <Button onClick = {() => onSubmitUpdatedVals(fixedVals)}> Submit     </Button>
      {selected && selected.length !== 0 ? <Button onClick = {() => {onDelete(selected)}}>Delete</Button> :''}

    </React.Fragment>
  )
}

export default STTable
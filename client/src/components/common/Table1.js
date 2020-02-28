import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {ArrayKeysToColumns, objArrKeysToArr, onArrangeCols} from '../../lib/arrayKeysToColumns'
import Checkbox from '@material-ui/core/Checkbox';
import {checkedItem, IsThereSelected, selectItems} from '../../modules/itemList'
import {setSupplierUpdate} from '../../modules/supplier'

import {setQuoteListHeader, setAddHeader, addStoreValue, onAlreadyPickedCheck} from '../../modules/quote'
import {selectMultipleStates, unSelectMultipleStates} from '../../lib/tableFuncs'
import styled from "styled-components";
import Input from '@material-ui/core/Input';

import produce from 'immer'

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

const STTable = (props) => {
  const {tableArr, attr} = props

  let headers = tableArr ? Object.keys(tableArr[0]) : []

  const [tableHeaderVals, setTableHeaderVals] = useState([]);
  const [hided,    setHided]                  = useState([]);
  const [selected, setSelected]               = useState([]);
  const [allSelected, setAllselected]         = useState(false);
  const [fixMode, setFixMode]                 = useState(false);
  const [fixableCols, setFixableCols]         = useState({});
  const [tableVals, setTableVals]             = useState(tableArr);
  const [fixedVals, setFixedVals]             = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    setTableVals(tableArr)
  },[tableArr])
  

  useEffect(() => {
    const deleteKey = 'id'
    headers = headers.filter(function (el) {
      return el !== deleteKey
    })
    setTableHeaderVals(headers)
  },[tableVals])

  const isSelected    = name => selected.indexOf(name) !== -1;
  const isHidedCulumn = name => hided.indexOf(name) !== -1;

  const onHidedCulumn   = selectMultipleStates
  const handleClickFlag = selectMultipleStates
  const unhide = unSelectMultipleStates

  const checkFixablity = (key) => {
    return {
      'supplierCode' : true
    }[key]
  }

  const onSetfixMode = () => {
    fixMode ? setFixMode(false) : setFixMode(true)
  }

  const onClickRows = (row, header) => {
    if (fixMode){
      const temp = {row : row, header : header}
      setFixableCols(temp)
    }
    else {
    }
  }

  const onKeyPressOnCol = (e, index, header) => {
    if (e.key === "Enter") {
      const temp = {}
      setFixableCols(temp)

      let temp1 = {}
      temp1[header] = e.target.value
      temp1.index = index
      temp1.code = tableVals[index].supplierCode
  
      setFixedVals(
        produce(fixedVals, draft => {
          draft.push(temp1)
        })
      )
    }
  }

  console.log(fixedVals)

  const handleChangeFixableCol = (e, index, header) => {
    setTableVals(
      produce(tableVals, draft => {
        draft[index][header] = e.target.value
      })
    )
    // let temp = tableVals
    // temp[index][header] = e.target.value
    // setTableVals([...temp])
  }

  const checkFixable = (index, header) => {
    let ox = false
    if (fixableCols.row == index){
      if(fixableCols.header == header){
        ox = true
      }
    }
    else {
      ox = false
    }
    return ox
  }

  const checkFixed = (index, header) => {
    let ox = false
    fixedVals.map(obj => {
      console.log(obj)
      if (obj.index == index && Object.keys(obj)[0] == header) {
        ox = true
      }
    })
    return ox
  }
  
  const onSubmit = () => {
    console.log(fixedVals)
    dispatch(setSupplierUpdate(fixedVals))
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
      <button onClick = { onSetfixMode}>fixmode</button>
      <StyledTable>
        <TableContainer>
          <StyledTableHeader>
            <TableRow>
              {tableHeaderVals && attr.flag ? 
                <StyledTableCell>

                </StyledTableCell>:''
              }
              {tableHeaderVals !== [] ? <StyledTableCell>No</StyledTableCell> : ''}  
              {tableHeaderVals ? tableHeaderVals.map((header, index) => {
                const isColumnHided = isHidedCulumn(header)
                if (!isColumnHided) {
                  return (
                    <StyledTableCell
                      onClick={event => onHidedCulumn(header, null, hided, setHided)}
                    >
                      {header}
                    </StyledTableCell>
                  )
                }
              }) : ''}
            </TableRow>
          </StyledTableHeader>
          <StyledTableBody>
            {tableVals ? tableVals.map((row, index) => {
              const isItemSelected = isSelected(row)
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
                    let fixable = checkFixable(index, header)
                    let fixed = checkFixed(index, header)

                    if (fixable) {
                      return (
                        <Input 
                        onChange = {(event) => handleChangeFixableCol(event, index, header)} 
                        key = {header }
                        value = {tableVals[index][header]} 
                        onKeyPress = {(event) => onKeyPressOnCol(event, index, header)}/>
                      )
                    } else {
                      if (fixed) {
                        return(
                          <StyledTableCell style = {{backgroundColor : "lightblue"}} onClick = {() => {onClickRows(index, header)}}>
                            {row[header]}
                          </StyledTableCell>
                        )
                      }
                      else {
                        return(
                            <StyledTableCell onClick = {() => {onClickRows(index, header)}}>
                              {row[header]}
                            </StyledTableCell>
                        )
                      }
                    }

                  })}

                </TableRow>
              )
            }) :''}
          </StyledTableBody>
        </TableContainer>
      </StyledTable>
      <Button onClick = {onSubmit}>Submit</Button>
    </React.Fragment>
  )
  
}


export default STTable
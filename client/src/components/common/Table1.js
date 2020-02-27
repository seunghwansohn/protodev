import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {ArrayKeysToColumns, objArrKeysToArr, onArrangeCols} from '../../lib/arrayKeysToColumns'
import Checkbox from '@material-ui/core/Checkbox';
import {checkedItem, IsThereSelected, selectItems} from '../../modules/itemList'
import {setQuoteListHeader, setAddHeader, addStoreValue, onAlreadyPickedCheck} from '../../modules/quote'
import {selectMultipleStates, unSelectMultipleStates} from '../../lib/tableFuncs'
import styled from "styled-components";
import Input from '@material-ui/core/Input';

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

  const [tableHeaderVals, setTableHeaderVals]           = useState([]);

  const [hided,    setHided]           = useState([]);
  const [selected, setSelected]        = useState([]);
  const [allSelected, setAllselected]  = useState(false);
  const [fixMode, setFixMode]  = useState(false);
  const [fixableCols, setFixableCols]  = useState({});
  const [tableVals, setTableVals]  = useState(tableArr);

  useEffect(() => {
    const deleteKey = 'id'
    headers = headers.filter(function (el) {
      return el !== deleteKey
    })
    setTableHeaderVals(headers)
    // if (tableArr) {tableArr.map(arr => {
    //   delete arr[deleteKey]
    // })}
    // setTableBodyVals(tableArr)
  },[tableVals])

  useEffect(() => {
    setTableVals(tableArr)
  },[tableArr])

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

  const chek = () => {
    console.log(checkFixablity('supplierCode'))
  }

  const checkRow =(key) => {
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

  const handleChangeFixableCol = (e, index, header) => {
    let temp = tableVals
    temp[index][header] = e.target.value
    setTableVals([...temp])

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

  const onKeyPressOnCol = (e) => {
    if (e.key === "Enter") {
      console.log('엔터눌러짐')
    }
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
      <button onClick = { chek}>쿨쿨</button>
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
                    const fixable = checkFixable(index, header)
                    if (fixable) {
                      return (
                        <Input 
                        onChange = {(event) => handleChangeFixableCol(event, index, header)} 
                        key = {header }
                        value = {tableVals[index][header] } 
                        onKeyPress = {onKeyPressOnCol}/>
                      )
                    } else {
                      return(
                        <StyledTableCell onClick = {() => {onClickRows(index, header)}}>
                          {row[header]}
                        </StyledTableCell>
                      )
                    }

                  })}

                  <StyledTableCell>
                    <button onClick = {() => {checkRow(headers[index])}}></button>
                  </StyledTableCell>
                </TableRow>
              )
            }) :''}
          </StyledTableBody>
        </TableContainer>
      </StyledTable>
    </React.Fragment>
  )
  
}


export default STTable
import React, {useEffect, useState} from 'react';
import {useDispatch}                from 'react-redux';

import { makeStyles }   from '@material-ui/core/styles';
import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import Button           from '@material-ui/core/Button';
import TableContainer   from '@material-ui/core/TableContainer';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';
import Checkbox         from '@material-ui/core/Checkbox';
import Input            from '@material-ui/core/Input';

import {selectMultipleStates, unSelectMultipleStates}       from '../../lib/tableFuncs'

import styled from "styled-components";
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
  states, 
  setStates, 
  tableArr, 
  attr, 
  funcs, 
}) => {
  
  const {suppliers, updated}        = states
  const {setSuppliers, setUpdated}  = setStates
  const {load, onSubmitUpdatedVals, onDialogOpen} = funcs

  let headers = suppliers && suppliers.length > 1 ? Object.keys(suppliers[0]) : []

  const [tableHeaderVals, setTableHeaderVals] = useState([]);
  const [hided,    setHided]                  = useState([]);
  const [selected, setSelected]               = useState([]);
  const [allSelected, setAllselected]         = useState(false);
  const [fixMode, setFixMode]                 = useState(false);
  const [fixableCols, setFixableCols]         = useState({});
  const [tableVals, setTableVals]             = useState(suppliers);
  const [fixedVals, setFixedVals]             = useState([]);
  const [showUpdatedSign, setShowUpdatedSign] = useState(false);

  const dispatch = useDispatch()
  
  useEffect(() => {
    setTableVals(suppliers)
  },[suppliers])

  useEffect(() => {
    const deleteKey = 'id'
    headers = headers.filter(function (el) {
      return el !== deleteKey
    })
    setTableHeaderVals(headers)
  },[suppliers])

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

  const isChecked     = name => selected.indexOf(name)  !== -1;
  const isHidedCulumn = name => hided.indexOf(name)     !== -1;

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
  const checkColFixed = (index, header) => {
    let ox = false
    fixedVals.map(obj => {
      if (obj.index == index && Object.keys(obj)[0] == header) {
        ox = true
      }
    })
    return ox
  }
  
  const onSetfixMode = () => {
    fixMode ? setFixMode(false) : setFixMode(true)
  }

  const onClickCols = (row, header) => {
    console.log(suppliers)
    console.log(row,header)
    console.log(suppliers[row][header])
    if (fixMode){
      const temp = {row : row, header : header}
      setFixableCols(temp)
    }
    else {
      dispatch(onDialogOpen(true, 'supplierQuery'))
    }
  }

  const onKeyPressOnInput = (e, index, header) => {
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

  const handleChangeInput = (e, index, header) => {
    setTableVals(
      produce(tableVals, draft => {
        draft[index][header] = e.target.value
      })
    )
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
      <button onClick = { onSetfixMode }>fixmode</button>
      <StyledTable>
        <TableContainer>
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
                    let fixed = checkColFixed(index, header)

                    if (fixable) {
                      return (
                        <Input 
                        onChange = {(event) => handleChangeInput(event, index, header)} 
                        key = {header }
                        value = {tableVals[index][header]} 
                        onKeyPress = {(event) => onKeyPressOnInput(event, index, header)}/>
                      )
                    }else{
                      if (fixed) {
                        return(
                          <StyledTableCell updated = {showUpdatedSign} style = {{backgroundColor : "lightblue"}} onClick = {() => {onClickCols(index, header)}}>
                            {row[header]}
                          </StyledTableCell>
                        )
                      }else{
                        return(
                          <StyledTableCell onClick = {() => {onClickCols(index, header)}}>
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
      <Button onClick = {() => {onSubmitUpdatedVals(fixedVals)}}>Submit</Button>
    </React.Fragment>
  )
}

export default STTable
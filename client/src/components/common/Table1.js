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
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import {checkedItem, IsThereSelected, selectItems} from '../../modules/itemList'
import {setQuoteListHeader, setAddHeader, addStoreValue, onAlreadyPickedCheck} from '../../modules/quote'
import {onDialogOpen} from '../../modules/dialogs'
import {selectMultipleStates, unSelectMultipleStates} from '../../lib/tableFuncs'


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

const STTable = (props) => {
  const {tableArr, attr} = props
  
  const headers = tableArr ? Object.keys(tableArr[0]) : []

  const [hided,    setHided]             = useState([]);
  const [selected, setSelected]       = useState([]);

  const isSelected    = name => selected.indexOf(name) !== -1;
  const isHidedCulumn = name => hided.indexOf(name) !== -1;

  const onHidedCulumn   = selectMultipleStates
  const handleClickFlag = selectMultipleStates

  const unhide = unSelectMultipleStates

  console.log(hided)
  return (
    <React.Fragment>
      <div>
        {hided.map(columns => {
          return(
          <button onClick = {event => unhide(columns, hided, setHided)}>{columns}</button>
          )
        })}
      </div>
      <TableContainer>
        <TableHead>
          <TableRow>
            {headers ? headers.map((header, index) => {
              const isColumnHided = isHidedCulumn(header)
              if (!isColumnHided) {
                return (
                  <TableCell
                    onClick={event => onHidedCulumn(header, null, hided, setHided)}
                  >
                    {header}
                  </TableCell>
                )
              }
            }) : ''}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableArr ? tableArr.map((row, index) => {
            const isItemSelected = isSelected(row)
            const labelId = `enhanced-table-checkbox-${index}`;
            return(
              <TableRow>
                {attr.flag ? 
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                      onClick={event => handleClickFlag(row, null, selected, setSelected)}
                    />
                  </TableCell>:''
                }
                <TableCell>
                  {index}
                </TableCell>
                <TableCell>
                  {row.supplierCode}
                </TableCell>
              </TableRow>
            )
          }) :''}
        </TableBody>
      </TableContainer>
    </React.Fragment>
  )
  
}


export default STTable
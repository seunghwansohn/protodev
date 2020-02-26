import React, {useEffect} from 'react';
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


const STTableHeader = (props) => {
  const {headers} = props
  return (
    <TableHead>
      <TableRow>
        {headers ? headers.map(header => {
          return(
            <TableCell>
              {header}
            </TableCell>
          )}
        ) : ''}
      </TableRow>
    </TableHead>
  )
} 
const STTable = (props) => {
  const {tableArr} = props
  const keys = tableArr ? Object.keys(tableArr[0]) : []
  const check = () => {
    console.log(tableArr)
  }

  return (
    <React.Fragment>
      <TableContainer>
        <STTableHeader headers = {keys}></STTableHeader>
        <TableBody>
          {tableArr ? tableArr.map((row, index) => {
            return(
              <TableRow>
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
      <button onClick = {check}></button>
    </React.Fragment>
  )
  
}


export default STTable
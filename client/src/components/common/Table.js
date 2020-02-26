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

export default function StickyHeadTable(
  {
    type,
    table,
    funcs,
    defaultHideCols,
    arrangeRules,
    colTypes,
  }) 
{
  const classes = useStyles();

  const {contents, header} = table
  const {
    onInsertButton,
    onRecordToDB, 
    onChangeInput, 
    onSetHeader, 
    onSetSeletedItems
  } = funcs

  const rows = contents
  
  const dispatch       = useDispatch()

  //헤더 설정 기능
  let columnNameArr = objArrKeysToArr(rows)
  let arrangedColumns = onArrangeCols(columnNameArr, arrangeRules)
  const addHeader = async () => {
    await dispatch(setAddHeader('amount'))
    let arrangedColumns = await onArrangeCols(columnNameArr, arrangeRules)
    await dispatch(onSetHeader(arrangedColumns))
  }
  //--- 헤더 설정기능

  const [page, setPage]               = React.useState(0);
  const [checked, setChecked]         = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected]       = React.useState([]);
  const [hided, setHided]             = React.useState([]);

  
  useEffect(() => {
    onSetHeader(arrangedColumns)
  },[])
  
  useEffect(() => {
      onHandleClickColumn(null, defaultHideCols)
  }, []);

  useEffect(() => {
    if (selected.length !== 0) {
      dispatch(IsThereSelected(true))
    }
    else { 
      dispatch(IsThereSelected(false))
    }
  }, [selected.length]);


  var types = {}
  const typesFunc = () => {
    switch(type) {
      case 'quoteList' :
        types.flags = false
        types.columns = [
        ]
        types.insertButton = false
        return types
      case 'itemList' :
        types.flags = true
        types.insertButton = true
        return types
      
      case 'client' :
        types.flags = false
        types.insertButton = true
        return types
    }
  }
  typesFunc()

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (event, name, itemCode) => {
    const selectedIndex = selected.indexOf(itemCode);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, itemCode);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    onSetSeletedItems(newSelected)
  };

  const onHandleClickColumn = (itemCode, defaultHideArray) => {
    const hidedIndex = hided.indexOf(itemCode);
    let newHided = [];
    if (defaultHideArray !== null && defaultHideArray !== undefined) {
      newHided = defaultHideArray
    }
    if (hidedIndex === -1) {
      newHided = newHided.concat(hided, itemCode);
    } else if (hidedIndex === 0) {
      newHided = newHided.concat(hided.slice(1));
    } else if (hidedIndex === hided.length - 1) {
      newHided = newHided.concat(hided.slice(0, -1));
    } else if (hidedIndex > 0) {
      newHided = newHided.concat(
        hided.slice(0, hidedIndex),
        hided.slice(hidedIndex + 1),
      );
    }
    var filtered = newHided.filter(function (el) {
      return el != null;
    });
    setHided(filtered);
  }

  const unhide = (columns) => {
    let newHided = [];
    const hidedIndex = hided.indexOf(columns);
    newHided = newHided.concat(hided)
    newHided.splice(hidedIndex, 1)
    setHided(newHided);
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;
  const isHidedCulumn = name => hided.indexOf(name) !== -1;

  const handleChangeInput = e => {
    e.preventDefault();
    const {id, name, value} = e.target
    onChangeInput(id, name, value)
  }

  const handleClickTableCol = async (value, column) => {
    if (column == 'itemName') {
      const ox = true
      await dispatch(onDialogOpen(ox, 'itemQuery', value))
    }
  }

  return (
    <Paper className={classes.root}>
      <div>
        {hided.map(columns => {
          return(
          <button onClick = {event => unhide(columns)}>{columns}</button>
          )
        })}
      </div>
      {/* <button onClick = { addHeader}> 체크</button> */}
      <TableContainer className={classes.container}>
        <Table size = "small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {types.flags ? <TableCell className = {classes.tableHeader} padding="checkbox"/> : ''}
              {header.map(column => {
                const isColumnHided = isHidedCulumn(column)
                if (!isColumnHided) {
                  return(
                    <TableCell className = {classes.tableHeader}
                      key={column}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      onClick={event => onHandleClickColumn(column)}
                    >
                      {column}
                    </TableCell>
                    )
                }
              })}
                {types.insertButton ? 
                <TableCell className = {classes.tableHeader}> 
                  Insert
                </TableCell> : ''}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const isItemSelected = isSelected(row.itemCode)
              
              if(isItemSelected == true) {}
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow 
                  hover role="checkbox" 
                  tabIndex={-1}
                  key={row.id}
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                    {types.flags ? 
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={event => handleClick(event, row.id, row.itemCode)}
                        />
                      </TableCell>:''}
                      
                  {header.map(column => {
                    const value = row[column];
                    const isColumnHided = isHidedCulumn(column)
                    if (!isColumnHided) {
                      if(colTypes.hasOwnProperty(column)){
                        if(colTypes[column].style == 'input') {
                          return (
                            <TableCell key={column} align={column.align}>
                              <input 
                                type = {colTypes[column].type} 
                                name = {column}
                                id = {row.id} 
                                onChange = {handleChangeInput}
                                value = {value}
                                placeholder = {0}/>
                            </TableCell>
                          );
                        }
                      }
                      else {
                        return (
                          <TableCell key={column} align={column.align} onClick = {() => handleClickTableCol(value, column)}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                          
                        );
                      }

                    }
                  })}
                    
                    {types.insertButton ? <TableCell> 
                        <button onClick= {function(e){
                            e.preventDefault();
                            onInsertButton(row);
                        }}>Insert

                        </button>
                    </TableCell> : ''}
                </TableRow>

              );
            }): ''}
            {type == 'quoteList' ? 
              <>
                <TableRow>
                  <TableCell>Sub Total :</TableCell>
                  <TableCell>{table.totalValues.subTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>VAT:</TableCell>
                  <TableCell>{table.totalValues.VAT}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total:</TableCell>
                  <TableCell>{table.totalValues.total}</TableCell>
                </TableRow>
              </>
              : ''}
          </TableBody>
        </Table>
        <button onClick = {onRecordToDB}>제출</button>
      </TableContainer>
      {rows ? <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> : ''}
    </Paper>
  );
}

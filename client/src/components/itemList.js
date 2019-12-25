import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles, useTheme, lighten } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


//pagenation 지원하는 material-ui 테이블에 필요한 기본요소들
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
//----------------------------
//pagenation 지원하는 material-ui 테이블의 head메뉴들. map으로 자동으로 다 띄워줌.
const headCells = [
  { id: 'No', numeric: false, disablePadding: false, label: 'No' },
  { id: 'Code', numeric: false, disablePadding: false, label: 'Code' },
  { id: 'Name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'Description', numeric: false, disablePadding: false, label: 'Description' },
];
//-------------------------------
//pagenation 지원하는 material-ui 테이블의 head부분 콤포넌트
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
//----------------------------
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));
//pagenation 지원하는 material-ui 테이블의 툴바
const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Item List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));
//-----------------------------

//pagenation 지원하는 material-ui 테이블의 주 콤포넌트. 기본 export됨.
export default function EnhancedTable(
  {
    code,
    onFetch,
    itemList,
    alreadyPickedCheck,
    useStateLog,
    onLoadApi,
    items,
    searchingNow,
    setSearchingNow
  }) 
  
  {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  //검색창(appBar.js)에서 검색어 넣고 엔터치면 searchingNow라는 state를 true로 바꿔줌
  //그때 페이지를 0으로 자동으로 넘겨주는 역할을 함.
  if (searchingNow === true) {
    async function setPageAndReset() {
      await console.log('a')
      await setPage(0)
      await setSearchingNow(false)
    }
    setPageAndReset()
  }
  //------------------------------------

  const rows = itemList  //row에다가 api에서 받아온 itemList 객체를 넣어줌.


  //굳이 건드릴 필요없는 pagenation-material-ui 이벤트 함수들.
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = event => {
    setDense(event.target.checked);
  };
  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  //---------------------------------

  //공백 넣어 띄워쓴 검색어 모두가 존재하는 것만 반환하도록 필터링하여 객체를 가공하는
  //내가 만든 함수
  var result = [];
  const itemListFilteredMap = () => {
          var matchedid = [];
          itemList.map (function(num) {
            var values = Object.values(num);
            var joinedString = values.join(',');
            joinedString = joinedString.toLowerCase() //리스트 문자열 합친걸 모두 소문자화
            code = code.toLowerCase() //검색어를 모두 소문자화
            code = code.replace(/\s*$/,''); //마지막 공백을 모두 제거
            // var spaceCount = (code.split(" ").length - 1); //중간에 들어간 공백의 숫자
            let codeArray = code.split(' ')
            let matchedTrue = ''
            for(let i=0, k = 0; i < codeArray.length; i++) {
              var trueSearched = joinedString.indexOf(codeArray[i]) > - 1;
              if (trueSearched === true) {
                k = k + 1
              }
              if (k === codeArray.length) {matchedTrue = true} //공백으로 나눠진 단어 모두가 검색되는지를 true여부로 반환
              else {matchedTrue = false} 
            }
            if (matchedTrue === true) {
              matchedid.push(num.id);   //matchedid라는 미리 선언된 배열변수에, 검색어를 포함한 아이템들의 id값만 담음.
              }
          })
          var returnWords = function(){
              var matchedData = [];
              var findDataId = '';
                  for (var i=0; i < matchedid.length; i++){
                    findDataId = matchedid[i];
                    function searchMatchedData(id, itemList) {
                      for (var i = 0; i < itemList.length; i++) {
                        if (itemList[i].id === id)  {
                          return itemList[i];
                        }
                      }
                    }
                    result.push(searchMatchedData(findDataId, itemList))
         
                    matchedData.push(itemList[matchedid[i]])
                  }
              return result;
            }
            return returnWords();
  }
  const alreadyCheck = (c) => {
    // function add(arr, id) {
    //   const { length } = arr;
    //   const found = arr.some(el => el.id === id.id);
    //   if (!found) {
    //     id.no = arr.length + 1
        alreadyPickedCheck(c)}
      // ;
    // }
    // add(useStateLog, c)
  // }
  //검색어 결과로 filtered된 배열값이 아래의 변수이름임
  const filteredItemArray = itemListFilteredMap()
  //-----------------------------------------

  
  const onPageZero = () => {
    setPage(0)
  }

  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {itemList[0] !== undefined ? stableSort(filteredItemArray, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((filteredItemArray, index) => {
                  const isItemSelected = isSelected(filteredItemArray.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, filteredItemArray.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={filteredItemArray.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {filteredItemArray.id}
                      </TableCell>
                      <TableCell align="left">{filteredItemArray.itemCode}</TableCell>
                      <TableCell align="left">{filteredItemArray.itemName}</TableCell>
                      <TableCell>                      
                        <button onClick= {
                          function(e){
                            e.preventDefault();
                            alreadyCheck(filteredItemArray);
                          }}>삽입
                         </button>
                      </TableCell>
                    </TableRow>
                  );
                }) : ''}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredItemArray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <button onClick = {onPageZero}> show itemList</button>
      
    </div>
  );
}


const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));



//기존에 쓰던 ui없는 테이블 코드 -> 폐기
// const ItemListComponent = (
//   {
//     code,
//     onFetch,
//     itemList,
//     inputItem,
//     useStateLog,
//     onLoadApi,
//     items,
//     count, 
//     page, 
//     rowsPerPage, 
//     onChangePage,
//   }) => 
  
//   {
//     const classes = useStyles1();
//     const theme = useTheme();
//     var result = [];
//     const itemListFilteredMap = () => {
//             var matchedid = [];
//             itemList.map (function(num) {
//               var values = Object.values(num);
//               var joinedString = values.join(',');
//               joinedString = joinedString.toLowerCase() //리스트 문자열 합친걸 모두 소문자화
//               code = code.toLowerCase() //검색어를 모두 소문자화
//               code = code.replace(/\s*$/,''); //마지막 공백을 모두 제거
//               // var spaceCount = (code.split(" ").length - 1); //중간에 들어간 공백의 숫자
//               let codeArray = code.split(' ')
//               let matchedTrue = ''
//               for(let i=0, k = 0; i < codeArray.length; i++) {
//                 var trueSearched = joinedString.indexOf(codeArray[i]) > - 1;
//                 if (trueSearched === true) {
//                   k = k + 1
//                 }
//                 if (k === codeArray.length) {matchedTrue = true} //공백으로 나눠진 단어 모두가 검색되는지를 true여부로 반환
//                 else {matchedTrue = false} 
//               }
//               if (matchedTrue === true) {
//                 matchedid.push(num.id);   //matchedid라는 미리 선언된 배열변수에, 검색어를 포함한 아이템들의 id값만 담음.
//                 }
//             })
//             var returnWords = function(){
//                 var matchedData = [];
//                 var findDataId = '';
//                     for (var i=0; i < matchedid.length; i++){
//                       findDataId = matchedid[i];
//                       function searchMatchedData(id, itemList) {
//                         for (var i = 0; i < itemList.length; i++) {
//                           if (itemList[i].id === id)  {
//                             return itemList[i];
//                           }
//                         }
//                       }
//                       result.push(searchMatchedData(findDataId, itemList))
           
//                       matchedData.push(itemList[matchedid[i]])
//                     }
//                 return result;
//               }
//               returnWords();
//     }
//     const alreadyCheck = (c) => {
//       function add(arr, id) {
//         const { length } = arr;
//         const found = arr.some(el => el.id === id.id);
//         if (!found) {
//           id.no = arr.length + 1
//           inputItem(id)}
//         ;
//       }
//       add(useStateLog, c)
//     }
//     const itemListMap = () => {
//         itemListFilteredMap();
//         return result.map((c, index) => {
//             return(
//                 <TableRow key = {index}>
//                     <TableCell>{c.id}</TableCell>
//                     <TableCell>{c.itemCode}</TableCell>
//                     <TableCell>{c.itemName}</TableCell>
//                     <TableCell> <button onClick = {onFetch}>+1</button></TableCell>
//                     <TableCell> <button onClick = {itemListFilteredMap}>-1</button></TableCell>
//                     <TableCell> 
//                       <button onClick= {
//                         function(e){
//                           e.preventDefault();
//                           alreadyCheck(c);
//                         }}>삽입
//                       </button>
//                     </TableCell> 
//                 </TableRow>
//         )})
//     }
//     //페이지 나눔으로 인한 이벤트 부분
//     const handleFirstPageButtonClick = event => {
//       onChangePage(event, 0);
//     };
  
//     const handleBackButtonClick = event => {
//       onChangePage(event, page - 1);
//     };
  
//     const handleNextButtonClick = event => {
//       onChangePage(event, page + 1);
//     };
  
//     const handleLastPageButtonClick = event => {
//       onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//     };
//     //----------------------
//     return(
//     <div className = {classes.root}>
//         <button onClick = {onLoadApi}>Load</button>
//         <hr></hr>

//          <Table className = {classes.table}>
//             <TableHead>
//               <TableRow>
//               <TableCell align = "right">No</TableCell>
//               <TableCell>Code</TableCell>
//               <TableCell>Item</TableCell>
//               <TableCell>Plus</TableCell>
//               <TableCell>Minus</TableCell>
//               <TableCell>삽입</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//                 {itemListMap()}
//             </TableBody>
//             <TableFooter>
//             </TableFooter>
//         </Table>
//         <EnhancedTable itemList = {itemList}/>
//     </div>
//     )
// }
// // export default ItemListComponent
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
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
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
  { id: 'Code', numeric: false, disablePadding: false, label: 'Code' },
  { id: 'Name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'VN U/P', numeric: false, disablePadding: false, label: 'VN U/P' },
  { id: 'Description', numeric: false, disablePadding: false, label: 'Description' },
];
//-------------------------------
//pagenation 지원하는 material-ui 테이블의 head부분 콤포넌트
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            <TableSortLabel>
              {headCell.label}
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
    itemList,
    alreadyPickedCheck,
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
        alreadyPickedCheck(c)
  }

  const filteredItemArray = itemListFilteredMap()
  //-----------------------------------------
  
  const onPageZero = () => {
    setPage(0)
  }

  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              rowCount={rows.length}
            />
            <TableBody>
              {itemList[0] !== undefined ? stableSort(filteredItemArray, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((filteredItemArray, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, filteredItemArray.name)}
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell align="left">{filteredItemArray.itemCode}</TableCell>
                      <TableCell align="left">{filteredItemArray.itemName}</TableCell>
                      <TableCell align="left">{filteredItemArray.VNSellingPrice}</TableCell>
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
    </div>
  );
}


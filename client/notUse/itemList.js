import React from 'react'
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles, lighten } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import searchObjectArray from '../functions/search'
import { useDispatch } from 'react-redux';

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

//pagenation 지원하는 material-ui 테이블의 주 콤포넌트. 기본 export됨.
export default function EnhancedTable(
  {
    itemListArr,
    onAlreadyPickedCheck,
    searchProps
  }) 
  {
  
  let { searchKeyword } = searchProps;
  var result = [];
  const itemListFilteredMap = () => {
    var matchedid = [];
    itemListArr.map (function(num) {
      var values = Object.values(num);
      var joinedString = values.join(',');
      joinedString = joinedString.toLowerCase() //리스트 문자열 합친걸 모두 소문자화
      searchKeyword = searchKeyword.toLowerCase() //검색어를 모두 소문자화
      searchKeyword = searchKeyword.replace(/\s*$/,''); //마지막 공백을 모두 제거
      // var spaceCount = (code.split(" ").length - 1); //중간에 들어간 공백의 숫자

      let codeArray = searchKeyword.split(' ')
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
              function searchMatchedData(id, itemListArr) {
                for (var i = 0; i < itemListArr.length; i++) {
                  if (itemListArr[i].id === id)  {
                    return itemListArr[i];
                  }
                }
              }
              result.push(searchMatchedData(findDataId, itemListArr))
    
              matchedData.push(itemListArr[matchedid[i]])
            }
        return result;
    }
    returnWords();
  }

  const dispatch = useDispatch()
  const alreadyCheck = (items) => {
    dispatch(onAlreadyPickedCheck(items))
  }
  const mappedTableBody = () => {
    itemListFilteredMap();
    return (
      result.map((items, index) => 
        <TableRow key = {index}>
          <TableCell>{items.id}</TableCell>
          <TableCell>{items.itemCode}</TableCell>
          <TableCell>{items.itemName}</TableCell>
          <TableCell>{items.KRsupplier}</TableCell>
          <TableCell> 
            <button onClick= {
              function(e){
                e.preventDefault();
                alreadyCheck(items);
              }}>삽입
            </button>
          </TableCell> 
        </TableRow>
      )
    )
  }
  
  //---------------------------------

  return (
    <div>
      <Paper>
        <Table
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
        >
          <TableContainer>
              <EnhancedTableHead/>
              {/* <TableBody>
                  {itemListArr.length !== 0  ? mappedTableBody() : ''}
              </TableBody> */}


          </TableContainer>
        </Table>
        {searchProps.searchKeyword}
      </Paper>
    </div>
  );
}


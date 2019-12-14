import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

const ItemListComponent = ({code, onFetch, itemList, inputItem, useStateLog}) => {
    var result = [];
    const itemListFilteredMap = () => {
            var matchedid = [];
            itemList.map (function(num) {
              var values = Object.values(num);
              var joinedString = values.join(',');
              var trueSearched = joinedString.indexOf(code) > - 1;
              if (trueSearched === true) {
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
              var temporary = returnWords();
    }
    const alreadyCheck = (c) => {
      function add(arr, id) {
        const { length } = arr;
        const newId = length + 1;
        const found = arr.some(el => el.id === id.id);
        if (!found) inputItem(id);
      }
      add(useStateLog, c)
    }
    const itemListMap2 = () => {
        itemListFilteredMap();
        return result.map((c, index) => {
            return(
                <TableRow key = {index}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.itemCode}</TableCell>
                    <TableCell>{c.itemName}</TableCell>
                    <TableCell> <button onClick = {onFetch}>+1</button></TableCell>
                    <TableCell> <button onClick = {itemListFilteredMap}>-1</button></TableCell>
                    <TableCell> <button onClick= {function(e){
                              e.preventDefault();
                              // inputItem(c);
                              alreadyCheck(c)
                            }}>삽입</button></TableCell> 
                </TableRow>
        )})
    }
    const Quy = () => {
      console.log(useStateLog)
    }
    return(
    <div>
        <button onClick = {onFetch}>Load</button>
        <button onClick = {Quy}>-1</button>

        <hr></hr>
         <Table>
            <TableHead>
              <TableCell>No</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Plus</TableCell>
              <TableCell>Minus</TableCell>
              <TableCell>삽입</TableCell>
            </TableHead>
            <TableBody>
                {itemListMap2()}
            </TableBody>
        </Table>
    </div>
    )
}
export default ItemListComponent
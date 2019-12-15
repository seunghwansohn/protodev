import React, {useState,useEffect} from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
const axios = require('axios');


const ItemListComponent = ({code, onFetch, itemList, inputItem, useStateLog, onLoadApi, items}) => {

    var result = [];
    const itemListFilteredMap = () => {
            var matchedid = [];
            itemList.map (function(num) {
              var values = Object.values(num);
              var joinedString = values.join(',');
              joinedString = joinedString.toLowerCase() //리스트 문자열 합친걸 모두 소문자화
              code = code.toLowerCase() //검색어를 모두 소문자화
              code = code.replace(/\s*$/,''); //마지막 공백을 모두 제거
              var spaceCount = (code.split(" ").length - 1); //중간에 들어간 공백의 숫자
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
              var temporary = returnWords();
    }
    const alreadyCheck = (c) => {
      function add(arr, id) {
        const { length } = arr;
        const found = arr.some(el => el.id === id.id);
        if (!found) {
          id.no = arr.length + 1
          inputItem(id)}
        ;
      }
      add(useStateLog, c)
    }
    const itemListMap = () => {
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
    // const itemshow = () => (
    //   console.log(items)
    // )
    return(
    <div>
        <button onClick = {onLoadApi}>Load</button>
        {/* <button onClick = {itemshow}>Load</button> */}
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
                {itemListMap()}
            </TableBody>
        </Table>
    </div>
    )
}
export default ItemListComponent
import React from 'react'
import ItemListComponent from '../components/itemListComponent'
import SearchAppBar from '../components/appBar'
import { connect } from 'react-redux';
import {search, apiLoad1}  from '../modules/itemList'
const axios = require('axios');

const ItemListContainer = (
    {searchKeyword, search, apiLoad, itemList}
) => {
    return(
        <div>
            <SearchAppBar 
                onSearch = {search}>
            </SearchAppBar>
            <ItemListComponent code = {searchKeyword} apiLoad = {apiLoad} itemList = {itemList}></ItemListComponent>
        </div>
    )
}

export function apiLoad(apiLoad2) {
    return function(dispatch) {
      return axios.get("/api/customers")
        .then(({ data }) => {
          apiLoad2(data)
      });
    };
}

const apiLoad2 = (data) => {
    console.log(data)
    console.log('콘솔로그중')
}


const callApi = async (callback) => {    //node.js api 서버를 호출하는 함수. async는 비동기 처리를 위한 것
    const response = await fetch('/api/customers');
    const body = await response.json();  //json 형식으로 받아 body라는 변수에 저장
    callback(body)
    return body; //body를 return하여 callApi라는 메소드의 값으로 반환
  }

const mapStateToProps = state => ({ //state를 파라미터로 받아옴. 
    searchKeyword : state.itemList.searchKeyword,
    itemList : state.itemList.itemList,
    //인자로 넘겨진 state 객체 아래 module에서 default로 내보내진 함수 객체 아래 initial state로 규정됨 searchKeyword를 받아서 mapStateToProps로 넘기면 됨.
})

const mapDispatchToProps = dispatch => ({
    search : (f) => {
        console.log(search(f))
        dispatch(search(f));
    },
    apiLoad : () => {
        console.log(apiLoad1())
        console.log(dispatch(apiLoad1()))
        dispatch()
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  
)   (ItemListContainer)
import React from 'react'
import ItemListComponent from '../components/itemListComponent'
import SearchAppBar from '../components/appBar'
import { connect } from 'react-redux';
import {search, fetchAction, inputItemAction}  from '../modules/itemListModule'
import QuoteListComponent from '../components/quoteList'


const ItemListContainer = (
    {fetch, searchKeyword, search, itemList, inputItem, pickedItem}
) => {
    console.log(pickedItem)
    return(
        <div>
            <SearchAppBar 
                onSearch = {search}>
            </SearchAppBar>
            <ItemListComponent code = {searchKeyword} onFetch = {fetch} itemList = {itemList} inputItem = {inputItem}></ItemListComponent>
            <QuoteListComponent pickedItem = {pickedItem}></QuoteListComponent>

        </div>
    )
}
const mapStateToProps = state => ({ //state를 파라미터로 받아옴. 
    searchKeyword : state.itemList.searchKeyword,
    itemList : state.itemList.itemList,
    pickedItem : state.itemList.pickedItem
    //인자로 넘겨진 state 객체 아래 module에서 default로 내보내진 함수 객체 아래 initial state로 규정됨 searchKeyword를 받아서 mapStateToProps로 넘기면 됨.
})
const mapDispatchToProps = dispatch => ({
    search : (f) => {
        console.log(search(f))
        dispatch(search(f));
    },
    fetch : () => {
        console.log('asdfasdflkj')
        dispatch(fetchAction())

    },
    inputItem :(f) => {
        // console.log(f)
        dispatch(inputItemAction(f))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  
)   (ItemListContainer)
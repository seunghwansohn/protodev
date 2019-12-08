import React from 'react'
import SearchAppBar from '../components/appBar'
import ItemListComponent from '../components/itemListComponent'
import QuoteListComponent from '../components/quoteList'
import { connect } from 'react-redux';
import {search, fetchAction, inputItemAction}  from '../modules/itemListModule'

const ItemListContainer = (
    {fetch, searchKeyword, search, itemList, inputItem, pickedItem, pickedCount}
    ) => {
        return(
            <div>
                <SearchAppBar 
                    onSearch = {search}>
                </SearchAppBar>
                <ItemListComponent code = {searchKeyword} onFetch = {fetch} itemList = {itemList} inputItem = {inputItem}></ItemListComponent>
                <QuoteListComponent pickedCount = {pickedCount} pickedItem = {pickedItem} inputItem = {inputItem}></QuoteListComponent>
            </div>
        )
    }   
const mapStateToProps = state => ({ //state를 파라미터로 받아옴. 
    searchKeyword : state.itemList.searchKeyword,
    itemList : state.itemList.itemList,
    pickedItem : state.itemList.pickedItem,
    pickedCount : state.itemList.pickedCount
    //인자로 넘겨진 state 객체 아래 module에서 default로 내보내진 함수 객체 아래 initial state로 규정됨 searchKeyword를 받아서 mapStateToProps로 넘기면 됨.
})
const mapDispatchToProps = dispatch => ({
    search : (searchKeyword) => {
        dispatch(search(searchKeyword));
    },
    fetch : () => {
        dispatch(fetchAction())
    },
    inputItem :(selectedItem) => {
        dispatch(inputItemAction(selectedItem))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)   (ItemListContainer)
import React from 'react'

import SearchAppBar from '../components/appBar'
import ItemListComponent from '../components/itemList'
import QuoteListComponent from '../components/quoteList'

import { connect, useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../store/actions/actions';



const ItemListContainer = (props) => 
    {
        const loG = useSelector(state => state.itemList.pickedItem)
        const items = useSelector(state => state.itemList.ItemList)
        const dispatch = useDispatch();

        const searchProps = {
            searchKeyword : props.searchKeyword,
            searchingNow : props.searchingNow,
            onSetSearchingNow : props.onSetSearchingNow
        }
        
        return(
            <div>
                <SearchAppBar 
                    onSearch = {props.onSearch}
                    onFetchItem = {props.onFetchItem}>
                </SearchAppBar>
                <ItemListComponent 
                    itemListArr = {props.itemListArr}
                    searchProps = {searchProps}
                    onAlreadyPickedCheck = {props.onAlreadyPickedCheck}
                >
                </ItemListComponent>
                <QuoteListComponent 
                    pdfBlobUrl = {props.pdfWorks.pdfBlobUrl} 
                    pickedItem = {props.pickedItem} 
                    inputItem = {props.inputItem}
                    CustomersfetchAction = {props.CustomersfetchAction}
                    clients = {props.clients}
                    quoteList = {props.quoteList}
                    QuoteListCustomerSelectAction = {props.QuoteListCustomerSelectAction}

                    quoteTotalValues = {props.quoteTotalValues}
                    selectedCustomer = {props.selectedCustomer}
                    findDialogsOpen = {props.findDialogsOpen}

                    onDialogOpen = {props.onDialogOpen}
                    onQtySubmit = {props.onQtySubmit}
                    onInputPdfBlobUrl = {props.onInputPdfBlobUrl} 
                    onDelItem = {props.delItemAction}
                    onChangePRate = {props.changePRate}
                    onTotalValue = {props.totalValue}
                    
                >
                </QuoteListComponent>
            </div>
        )
    }   

const mapStateToProps = state => (
    { //state를 파라미터로 받아옴. 
    searchKeyword   : state.mainSchBar.searchKeyword,
    searchingNow    : state.mainSchBar.searchingNow,

    itemListArr : state.itemList.itemListArr,
    pickedCount : state.itemList.pickedCount,
    quoteList   : state.itemList.quoteList,
    pdfWorks    : state.itemList.pdfWorks,

    clients             : state.quoteList.clients,
    pickedItem          : state.quoteList.pickedItem,
    quoteTotalValues    : state.quoteList.quoteTotalValues,
    selectedCustomer    : state.quoteList.SelectedCustomerCode,

    findDialogsOpen : state.dialogs.findDialogsOpen
    //인자로 넘겨진 state 객체 아래 module에서 default로 내보내진 함수 객체 아래 initial state로 규정됨 searchKeyword를 받아서 mapStateToProps로 넘기면 됨.
})
const mapDispatchToProps = dispatch => {
    return {
        onSearch : (searchKeyword) => dispatch(actionCreators.onSearch(searchKeyword)),
        onFetchItem : () => dispatch(actionCreators.onFetchItem()),
        inputItem :(selectedItem) => dispatch(actionCreators.inputItemAction(selectedItem)),
        onQtySubmit : (index, inputQty) => dispatch(actionCreators.inputQtyAction(index, inputQty)),
        onInputPdfBlobUrl : (blob) => dispatch(actionCreators.onInputPdfBlobUrl(blob)),
        onSetSearchingNow : (ox) => dispatch(actionCreators.onSetSearchingNow(ox)),
        CustomersfetchAction : () => dispatch(actionCreators.CustomersfetchAction()),
        QuoteListCustomerSelectAction : (selectedCustomer) => dispatch(actionCreators.QuoteListCustomerSelectAction(selectedCustomer)),
        onAlreadyPickedCheck : (c) => dispatch(actionCreators.onAlreadyPickedCheck(c)),
        delItemAction :(pickedItemNo) => dispatch(actionCreators.delItemAction(pickedItemNo)),
        changePRate :(index, rate) => dispatch(actionCreators.changePRate(index, rate)),
        totalValue : () => dispatch(actionCreators.totalValue()),
        onDialogOpen : (ox) => dispatch(actionCreators.onDialogOpen(ox))
}}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)   (ItemListContainer)
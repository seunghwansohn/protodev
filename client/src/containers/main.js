import React from 'react'

import SearchAppBar from '../components/appBar'
import ItemListComponent from '../components/itemList'
import QuoteListComponent from '../components/quoteList'

import { connect, useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../store/actions/actions';



const ItemListContainer = (
    {
        searchKeyword,
        pickedItem,
        pickedCount,
        clients,
        quoteList,
        fetchAction,
        inputPdfBlobUrl,
        pdfWorks,
        search,
        itemList,
        inputItem,
        qtySubmit,
        searchingNow,
        setSearchingNow,
        CustomersfetchAction,

        QuoteListCustomerSelectAction,
        alreadyPickedCheck,
        delItemAction,
        changePRate,
        quoteTotalValues,
        totalValue,
        selectedCustomer,
        findDialogsOpen,
        onDialogOpen
    }
    ) => 
    
    {
        const loG = useSelector(state => state.itemList.pickedItem)
        const items = useSelector(state => state.itemList.itemList)
        const dispatch = useDispatch();
        return(
            <div>
                <SearchAppBar 
                    onSearch = {search}
                    fetchAction = {fetchAction}>
                </SearchAppBar>
                <ItemListComponent 
                    searchKeyword = {searchKeyword} 
                    itemList = {itemList} 
                    onLoadApi = {fetchAction} 
                    searchingNow = {searchingNow}
                    setSearchingNow = {setSearchingNow}
                    alreadyPickedCheck = {alreadyPickedCheck}
                >
                </ItemListComponent>
                <QuoteListComponent 
                    pdfBlobUrl = {pdfWorks.pdfBlobUrl} 
                    qtySubmit = {qtySubmit} 
                    pickedCount = {pickedCount} 
                    pickedItem = {pickedItem} 
                    inputPdfBlobUrl = {inputPdfBlobUrl} 
                    inputItem = {inputItem}
                    CustomersfetchAction = {CustomersfetchAction}
                    clients = {clients}
                    quoteList = {quoteList}
                    QuoteListCustomerSelectAction = {QuoteListCustomerSelectAction}
                    onDelItem = {delItemAction}
                    onChangePRate = {changePRate}
                    quoteTotalValues = {quoteTotalValues}
                    onTotalValue = {totalValue}
                    selectedCustomer = {selectedCustomer}
                    findDialogsOpen = {findDialogsOpen}
                    onDialogOpen = {onDialogOpen}
                    
                >
                </QuoteListComponent>
            </div>
        )
    }   

const mapStateToProps = state => (
    { //state를 파라미터로 받아옴. 
    searchKeyword : state.mainSchBar.searchKeyword,
    itemList : state.itemList.itemList,
    pickedItem : state.quoteList.pickedItem,
    pickedCount : state.itemList.pickedCount,
    pdfWorks: state.itemList.pdfWorks,
    searchingNow : state.mainSchBar.searchingNow,
    clients : state.quoteList.clients,
    quoteList : state.itemList.quoteList,
    quoteTotalValues : state.quoteList.quoteTotalValues,
    selectedCustomer : state.quoteList.SelectedCustomerCode,
    findDialogsOpen : state.dialogs.findDialogsOpen
    //인자로 넘겨진 state 객체 아래 module에서 default로 내보내진 함수 객체 아래 initial state로 규정됨 searchKeyword를 받아서 mapStateToProps로 넘기면 됨.
})
const mapDispatchToProps = dispatch => {
    return {
        search : (searchKeyword) => dispatch(actionCreators.search(searchKeyword)),
        fetchAction : () => dispatch(actionCreators.fetchAction()),
        inputItem :(selectedItem) => dispatch(actionCreators.inputItemAction(selectedItem)),
        qtySubmit : (index, inputQty) => dispatch(actionCreators.inputQtyAction(index, inputQty)),
        inputPdfBlobUrl : (blob) => dispatch(actionCreators.inputPdfBlobUrl(blob)),
        setSearchingNow : (blob) => dispatch(actionCreators.setSearchingNow(blob)),
        CustomersfetchAction : () => dispatch(actionCreators.CustomersfetchAction()),
        QuoteListCustomerSelectAction : (selectedCustomer) => dispatch(actionCreators.QuoteListCustomerSelectAction(selectedCustomer)),
        alreadyPickedCheck : (c) => dispatch(actionCreators.alreadyPickedCheck(c)),
        delItemAction :(pickedItemNo) => dispatch(actionCreators.delItemAction(pickedItemNo)),
        changePRate :(index, rate) => dispatch(actionCreators.changePRate(index, rate)),
        totalValue : () => dispatch(actionCreators.totalValue()),
        onDialogOpen : (ox) => dispatch(actionCreators.onDialogOpen(ox))
}}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)   (ItemListContainer)
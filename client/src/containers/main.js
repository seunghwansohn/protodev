import React from 'react'
import SearchAppBar from '../components/appBar'
import ItemListComponent from '../components/itemList'
import { connect, useSelector, useDispatch } from 'react-redux';
import {
    search,
    fetchAction,
    inputItemAction,
    inputQtyAction,
    inputPdfBlobUrl,
    setSearchingNow,
    CustomersfetchAction,
    QuoteListCustomerSelectAction
}  from '../modules/itemListModule'
import QuoteListComponent from '../components/quoteList'
import * as actionCreators from '../store/actions/actions';



const ItemListContainer = (
    {
        searchKeyword,
        inputPdfBlobUrl,
        pdfWorks,
        search,
        itemList,
        inputItem,
        pickedItem,
        pickedCount,
        qtySubmit,
        fetchAction,
        searchingNow,
        setSearchingNow,
        CustomersfetchAction,
        clients,
        quoteList,
        QuoteListCustomerSelectAction,
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
                    code = {searchKeyword} 
                    dispatch = {dispatch} 
                    itemList = {itemList} 
                    inputItem = {inputItem} 
                    useStateLog = {loG} 
                    onLoadApi = {fetchAction} 
                    items = {items}
                    searchingNow = {searchingNow}
                    setSearchingNow = {setSearchingNow}
                    CustomersfetchAction = {CustomersfetchAction}
                >
                </ItemListComponent>
                <QuoteListComponent 
                    pdfBlobUrl = {pdfWorks.pdfBlobUrl} 
                    qtySubmit = {qtySubmit} 
                    pickedCount = {pickedCount} 
                    pickedItem = {pickedItem} 
                    dispatch = {inputPdfBlobUrl} 
                    inputItem = {inputItem}
                    CustomersfetchAction = {CustomersfetchAction}
                    clients = {clients}
                    quoteList = {quoteList}
                    QuoteListCustomerSelectAction = {QuoteListCustomerSelectAction}
                >
                </QuoteListComponent>
            </div>
        )
    }   

const mapStateToProps = state => (
    console.log(state),
    { //state를 파라미터로 받아옴. 
    searchKeyword : state.mainSchBar.searchKeyword,
    itemList : state.itemList.itemList,
    pickedItem : state.itemList.pickedItem,
    pickedCount : state.itemList.pickedCount,
    pdfWorks: state.itemList.pdfWorks,
    searchingNow : state.itemList.searchingNow,
    clients : state.itemList.clients,
    quoteList : state.itemList.quoteList
    //인자로 넘겨진 state 객체 아래 module에서 default로 내보내진 함수 객체 아래 initial state로 규정됨 searchKeyword를 받아서 mapStateToProps로 넘기면 됨.
})
const mapDispatchToProps = dispatch => {
    return {
        search : (searchKeyword) => dispatch(actionCreators.search(searchKeyword)),
        fetchAction : () => dispatch(actionCreators.fetchAction()),
        inputItem :(selectedItem) => dispatch(actionCreators.inputItemAction(selectedItem)),
        qtySubmit : (inputQty) => dispatch(actionCreators.inputQtyAction(inputQty)),
        inputPdfBlobUrl : (blob) => dispatch(actionCreators.inputPdfBlobUrl(blob)),
        setSearchingNow : (blob) => dispatch(actionCreators.setSearchingNow(blob)),
        CustomersfetchAction : () => dispatch(actionCreators.CustomersfetchAction()),
        QuoteListCustomerSelectAction : (selectedCustomer) => dispatch(actionCreators.QuoteListCustomerSelectAction(selectedCustomer))
}}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)   (ItemListContainer)
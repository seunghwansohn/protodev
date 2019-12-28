import React from 'react'

import SearchAppBar from '../components/appBar'
import ItemListComponent from '../components/itemList'
import QuoteListComponent from '../components/quoteList'

import { connect, useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../store/actions/actions';



const ItemListContainer = (
    {
        searchKeyword,
        fetchAction,
        inputPdfBlobUrl,
        pdfWorks,
        search,
        itemList,
        inputItem,
        pickedItem,
        pickedCount,
        qtySubmit,
        searchingNow,
        setSearchingNow,
        CustomersfetchAction,
        clients,
        quoteList,
        QuoteListCustomerSelectAction,
        alreadyPickedCheck,
        delItemAction,
        changePRate
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
                    alreadyPickedCheck = {alreadyPickedCheck}
                    
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
                    onDelItem = {delItemAction}
                    onChangePRate = {changePRate}
                    
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
    pickedItem : state.quoteList.pickedItem,
    pickedCount : state.itemList.pickedCount,
    pdfWorks: state.itemList.pdfWorks,
    searchingNow : state.itemList.searchingNow,
    clients : state.quoteList.clients,
    quoteList : state.itemList.quoteList
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
        changePRate :(index, rate) => dispatch(actionCreators.changePRate(index, rate))
}}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)   (ItemListContainer)
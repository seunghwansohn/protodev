import React from 'react'

import SearchAppBar from '../components/appBar'
import ItemListComponent from '../components/itemList'
import QuoteListComponent from '../components/quoteList'
import NewItem from '../components/newItem'
import LoginPage from '../components/login'


import { connect, useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../store/actions/actions';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


const ItemListContainer = (props) => 
    {
        const loG = useSelector(state => state.itemList.pickedItem)
        const items = useSelector(state => state.itemList.ItemList)
        const dispatch = useDispatch();

        const searchProps = {
            searchKeyword      : props.searchKeyword,
            searchingNow       : props.searchingNow,
            onSetSearchingNow  : props.onSetSearchingNow
        }

        const pdfWorksProps = {
            pdfBlobUrl          : props.pdfWorks.pdfBlobUrl,
            onInputPdfBlobUrl   : props.onInputPdfBlobUrl
        }
        

        return(
  
            <div>
                <Router>
                <div>
                    <ul>
                        <li>
                            <Link to = "/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route path = "/about">
                            <NewItem></NewItem>
                        </Route>
                        <Route path = "/login">
                            <LoginPage></LoginPage>
                        </Route>
                    </Switch>
                </div>
                </Router>
                <SearchAppBar 
                    onSearch    = {props.onSearch}
                    onFetchItem = {props.onFetchItem}>
                </SearchAppBar>
                
                <ItemListComponent 
                    itemListArr          = {props.itemListArr}
                    searchProps          = {searchProps}
                    onAlreadyPickedCheck = {props.onAlreadyPickedCheck}>
                </ItemListComponent>

                <QuoteListComponent 
                    pdfBlobUrl          = {props.pdfWorks.pdfBlobUrl} 
                    pickedItem          = {props.pickedItem} 
                    onFetchClient       = {props.onFetchClient}
                    clients             = {props.clients}
                    quoteList           = {props.quoteList}
                    onCustomerSelect    = {props.onCustomerSelect}

                    quoteTotalValues    = {props.quoteTotalValues}
                    selectedCustomer    = {props.selectedCustomer}
                    findDialogsOpen     = {props.findDialogsOpen}

                    onDialogOpen        = {props.onDialogOpen}
                    onQtySubmit         = {props.onQtySubmit}
                    onInputPdfBlobUrl   = {props.onInputPdfBlobUrl} 
                    onDelPickedItem     = {props.onDelPickedItem}
                    onChangePRate       = {props.onChangePRate}
                    onTotalValue        = {props.totalValue}>
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
        onQtySubmit : (index, inputQty) => dispatch(actionCreators.inputQtyAction(index, inputQty)),
        onInputPdfBlobUrl : (blob) => dispatch(actionCreators.onInputPdfBlobUrl(blob)),
        onSetSearchingNow : (ox) => dispatch(actionCreators.onSetSearchingNow(ox)),
        onDialogOpen : (ox) => dispatch(actionCreators.onDialogOpen(ox)),
        onAlreadyPickedCheck : (c) => dispatch(actionCreators.onAlreadyPickedCheck(c)),
        onFetchClient : () => dispatch(actionCreators.onFetchClient()),
        onCustomerSelect : (selectedCustomer) => dispatch(actionCreators.onCustomerSelect(selectedCustomer)),
        onDelPickedItem :(pickedItemNo) => dispatch(actionCreators.onDelPickedItem(pickedItemNo)),
        onChangePRate :(index, rate) => dispatch(actionCreators.onChangePRate(index, rate)),
        totalValue : () => dispatch(actionCreators.totalValue()),
        
}}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)   (ItemListContainer)
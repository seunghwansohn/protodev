import React, { useEffect } from 'react'

import ItemListComponent from '../components/itemList'
import QuoteListComponent from '../components/quoteList'
import Button from "@material-ui/core/Button";
import { connect, useSelector, useDispatch } from 'react-redux';
import * as mainSearchAct from '../store/modules/mainSearch';
import { setSearchKeyword } from '../store/modules/mainSearch'
import { setApiLoad } from '../store/modules/items'
import { onAlreadyPickedCheck } from '../store/modules/quote'


const QuoteContainer = () => {
    const dispatch = useDispatch();
    const quoteProp = useSelector(state => state.quote)
    const onSearch = (searchKeyword) => {
        dispatch(setSearchKeyword(searchKeyword))
    }
    const onApiLoad = () => {
        dispatch(setApiLoad())
    }
    // const pdfWorksquoteProp = {
    //     pdfBlobUrl          : quoteProp.pdfWorks.pdfBlobUrl,
    //     onInputPdfBlobUrl   : quoteProp.onInputPdfBlobUrl
    // }

    const onTotalValue = () => {
        console.log('온토탈밸뷰')
    }
    useEffect(() => {
        dispatch(setApiLoad())
    }, []);

    return(
        <>
            <QuoteListComponent 
                pdfBlobUrl          = {quoteProp.pdfWorks.pdfBlobUrl} 
                pickedItem          = {quoteProp.pickedItem} 
                onFetchClient       = {quoteProp.onFetchClient}
                clients             = {quoteProp.clients}
                quoteList           = {quoteProp.quoteList}
                onCustomerSelect    = {quoteProp.onCustomerSelect}

                quoteTotalValues    = {quoteProp.quoteTotalValues}
                selectedCustomer    = {quoteProp.selectedCustomer}
                findDialogsOpen     = {quoteProp.findDialogsOpen}

                onDialogOpen        = {quoteProp.onDialogOpen}
                onQtySubmit         = {quoteProp.onQtySubmit}
                onInputPdfBlobUrl   = {quoteProp.onInputPdfBlobUrl} 
                onDelPickedItem     = {quoteProp.onDelPickedItem}
                onChangePRate       = {quoteProp.onChangePRate}
                onTotalValue        = {quoteProp.totalValue}>
            </QuoteListComponent> */}
        </>
    )
}   

export default QuoteContainer

import React, { useEffect } from 'react'

import SearchAppBar from '../components/common/appBar'
import ItemListComponent from '../components/itemList'
import QuoteListComponent from '../components/quoteList'
import Button from "@material-ui/core/Button";
import { connect, useSelector, useDispatch } from 'react-redux';
// import * as actionCreators from '../store/actions/actions';
import * as mainSearchAct from '../store/modules/mainSearch';
import { onSearch, setSearchKeyword } from '../store/modules/mainSearch'

const ItemListContainer = () => {
    const dispatch = useDispatch();
    const { searchingNow, searchKeyword, itemListArr } = useSelector(
        ({ mainSearch, items }) => ({
            searchingNow : mainSearch.searchingNow,
            searchKeyword : mainSearch.searchKeyword,
            itemListArr : items.itemListArr
        }),
    );
    const onSearch = (searchKeyword) => {
        dispatch(mainSearchAct.setSearchKeyword(searchKeyword))
    }
    // const { searchKeyword, error, loading, user } = useSelector(
    //     ({ posts, loading, user }) => ({
    //       posts: posts.posts,
    //       error: posts.error,
    //       loading: loading['posts/LIST_POSTS'],
    //       user: user.user,
    //     }),
    // );
    // const searchProps = {
    //     searchKeyword      : props.searchKeyword,
    //     searchingNow       : props.searchingNow,
    //     onSetSearchingNow  : props.onSetSearchingNow
    // }

    // const pdfWorksProps = {
    //     pdfBlobUrl          : props.pdfWorks.pdfBlobUrl,
    //     onInputPdfBlobUrl   : props.onInputPdfBlobUrl
    // }
    useEffect(() => {
        if (searchingNow) {
            console.log(searchKeyword)
            dispatch(setSearchKeyword(searchKeyword))
        }
    }, [searchingNow]);
    console.log(itemListArr)
    return(
        <>
        asdf
            {/* <Button onClick = {props.onTestSaga}>확인</Button>*/}
            <SearchAppBar 
                onSearch    = {onSearch}
                onFetchItem = {mainSearchAct.onFetchItem}>
            </SearchAppBar>
        
            {/* <ItemListComponent  */}
                {/* itemListArr          = {itemListArr}> */}
                {/* searchProps          = {searchProps}
                onAlreadyPickedCheck = {props.onAlreadyPickedCheck}> */}
            {/* </ItemListComponent> */}
    {/*
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
            </QuoteListComponent> */}
            
        </>
    )
}   

export default ItemListContainer

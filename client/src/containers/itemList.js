import React, { useEffect } from 'react'

import SearchAppBar from '../components/common/appBar'
import ItemListComponent from '../components/itemList'
import QuoteListComponent from '../components/quoteList'
import Button from "@material-ui/core/Button";
import { connect, useSelector, useDispatch } from 'react-redux';
// import * as actionCreators from '../store/actions/actions';
import * as mainSearchAct from '../store/modules/mainSearch';
import { setSearchKeyword } from '../store/modules/mainSearch'
import { setApiLoad } from '../store/modules/items'
import { onAlreadyPickedCheck } from '../store/modules/quote'


const ItemListContainer = () => {
    const dispatch = useDispatch();
    const { searchingNow, searchKeyword, itemListArr, searchProps } = useSelector(
        ({ mainSearch, items }) => ({
            searchingNow : mainSearch.searchingNow,
            searchKeyword : mainSearch.searchKeyword,
            itemListArr : items.itemListArr,
            searchProps : {
                searchKeyword : mainSearch.searchKeyword,
                searchingNow : mainSearch.searchingNow
            }
        }),
    );
    
  
    const onSearch = (searchKeyword) => {
        dispatch(setSearchKeyword(searchKeyword))
    }
    const onApiLoad = () => {
        dispatch(setApiLoad())
    }
    // const pdfWorksProps = {
    //     pdfBlobUrl          : props.pdfWorks.pdfBlobUrl,
    //     onInputPdfBlobUrl   : props.onInputPdfBlobUrl
    // }
    useEffect(() => {
        dispatch(setApiLoad())
    }, []);

    return(
        <>
            {/* <Button onClick = {props.onTestSaga}>확인</Button>*/}
            <SearchAppBar onSearch    = {onSearch}/>

            <ItemListComponent 
                itemListArr          = {itemListArr}
                onAlreadyPickedCheck = {onAlreadyPickedCheck}
                searchProps          = {searchProps}>
            </ItemListComponent>
        </>
    )
}   

export default ItemListContainer

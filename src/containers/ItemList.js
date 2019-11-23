import React from 'react'
import ItemListComponent from '../components/itemListComponent'
import SearchAppBar from '../components/appBar'
import { connect } from 'react-redux';
import {search}  from '../modules/itemList'

const fff = () => {
    console.log(typeof search)
}

fff()

const ItemListContainer = (
    search, {input}
) => {
    console.log(search)
    input = 'fdf'
    return(
        <div>
            <SearchAppBar 
                onSearch = {search.increase}>
            </SearchAppBar>
            <ItemListComponent code = {input}></ItemListComponent>
        </div>
    )
}

const mapStateToProps = state => ({ //state를 파라미터로 받아옴. 
    searchResult : state.searchResult,
})

const mapDispatchToProps = dispatch => ({
    increase : (searchKeyword1) => {
        dispatch(search(searchKeyword1));
        console.log(search(searchKeyword1))
    },
    decrease : () => {
        console.log('decrease');
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  
)   (ItemListContainer)
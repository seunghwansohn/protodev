import React from 'react'
import ItemListComponent from '../components/itemListComponent'
import SearchAppBar from '../components/appBar'
import { connect } from 'react-redux';
import {search}  from '../modules/itemList'

// const fff = (searchKeyword) => {
//     console.log(typeof search)
//     console.log(searchKeyword)
// }

// fff()

const ItemListContainer = (
    {searchKeyword}
) => {
    console.log({searchKeyword})
    // input = 'fdf'
    return(
        <div>
            <SearchAppBar 
                onSearch = {search.increase}>
            </SearchAppBar>
            <ItemListComponent code = {searchKeyword}></ItemListComponent>
        </div>
    )
}

const mapStateToProps = state => ({ //state를 파라미터로 받아옴. 
    searchKeyword : 'flkdjlfk'
})

const mapDispatchToProps = dispatch => ({
    increase : (searchKeyword1) => {
        dispatch(search(searchKeyword1));
    },
    decrease : () => {
        console.log('decrease');
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  
)   (ItemListContainer)
import React from 'react'
import ItemListComponent from '../components/itemListComponent'
import SearchAppBar from '../components/appBar'
import { connect } from 'react-redux';

// import { changeInput, insert, toggle, remove } from '../modules/todos';
// import Todos from '../components/Todos';
// import useActions from '../lib/useActions';

const ItemList = ({searchKeyword, srchResult}) => {
    return(
        <div>
            <SearchAppBar searchKeyword = {searchKeyword} onSrchResult = {srchResult}></SearchAppBar>
            <hr></hr>
            <br></br>
            <ItemListComponent searchKeyword = {searchKeyword}></ItemListComponent>
        </div>
    )
}


const mapStateToProps = state => ({
    searchKeyword: state.searchKeyword
})

const mapDispatchToProps = dispatch => ({
        srchResult: (searchKeyword) => {
            console.log(searchKeyword)
        }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    )(ItemList)
// )

// export default ItemList
import React from 'react'
import ItemListComponent from '../components/itemListComponent'
import SearchAppBar from '../components/appBar'
import { connect } from 'react-redux';

// import { changeInput, insert, toggle, remove } from '../modules/todos';
// import Todos from '../components/Todos';
// import useActions from '../lib/useActions';

const ItemList = (searchKeyword) => {
    return(
        <div>
            <SearchAppBar searchKeyword = {searchKeyword} onSrchResult = {onSrchResult}></SearchAppBar>
            <hr></hr>
            <br></br>
            <ItemListComponent/>
        </div>
    )
}

const onSrchResult = (searchKeyword) => {
    console.log(searchKeyword)
}

const mapStateToProps = state => ({
    searchKeyword: state.searchKeyword
})

const mapDispatchToProps = dispatch => ({
        onSrchResult: () => {
            console.log()
        }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    )(ItemList)
// )

// export default ItemList
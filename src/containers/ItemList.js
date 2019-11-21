import React from 'react'
import ItemListComponent from '../components/itemListComponent'
import SearchAppBar from '../components/appBar'
import { useSelector, useDispatch } from 'react-redux';

// import { changeInput, insert, toggle, remove } from '../modules/todos';
// import Todos from '../components/Todos';
// import useActions from '../lib/useActions';

const ItemList = (searchKeyword) => {
    const onSrchResult = (searchKeyword) => {
        console.log(searchKeyword)
    }
    // const [onSrchResult] = useActions(
    //     [srchResult],
    //     []
    //   );
    
    return(
    <div>
        <SearchAppBar searchKeyword = {searchKeyword} onSrchResult = {onSrchResult}></SearchAppBar>
        <hr></hr>
        <br></br>
        <ItemListComponent/>

    </div>
    )
}

export default ItemList
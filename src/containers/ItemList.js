import React from 'react'
import ItemListComponent from '../components/itemListComponent'
import SearchAppBar from '../components/appBar'
import { useSelector, useDispatch } from 'react-redux';

// import { changeInput, insert, toggle, remove } from '../modules/todos';
// import Todos from '../components/Todos';
// import useActions from '../lib/useActions';

const ItemList = () => {
    const onSrchResult = () => {
        console.log("지렁이")
    }
    // const [onSrchResult] = useActions(
    //     [srchResult],
    //     []
    //   );
    
    return(
    <div>
        <SearchAppBar onSrchResult = {onSrchResult}></SearchAppBar>
        <hr></hr>
        <br></br>
        <ItemListComponent/>

    </div>
    )
}

export default ItemList
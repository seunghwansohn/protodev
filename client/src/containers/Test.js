import React, { useEffect, useState } from 'react';

import Test from '../components/Test'
// import Table from '../components/common/Table'
import DialogST from '../components/common/DialogST'



import { useDispatch, useSelector } from 'react-redux';
import { tableLoad } from '../modules/test'  // -> 테이블

const TestContainer = () => {
    const dispatch = useDispatch();
    // const {table} = useSelector(state => state.table) //->테이블

    // useEffect(() => {            //-> 테이블
    //     dispatch(tableLoad());
    //   }, []);

    return(
        <>
            <Test></Test>
            {/* <Table table = { table }></Table>  -> 테이블 */}
            <DialogST type = 'addItem'/>
        </>
    )
}   

export default TestContainer

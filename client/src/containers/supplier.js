import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import Table from '../components/common/Table1'
import axios from '../lib/api/axios'

import {setSupplierUpdate, updateChange} from '../modules/supplier'

const tableAttr = {
    flag : true,
}

const funcs = {
    
}
const Supplier = props => {
    const dispatch = useDispatch()
    const [suppliers, setSuppliers] = useState([])
    const [fixedVals, setFixedVals] = useState([]);
    const { update } = useSelector(({ supplier }) => ({ update : supplier.table.update }));

    const getSuppliers = async () => {
        await axios.get('/api/supplier/load').then(res => {
            setSuppliers(res.data)
        })
    }
    useEffect(async () => {
        await getSuppliers()
    },[])

    if (update) {
        getSuppliers()
    }

    const states = {
        suppliers : suppliers,
    }

    const setStates = {
        setSuppliers : setSuppliers,
    }

    const onSubmitUpdatedVals = async (fixedVals) => {
        await dispatch(setSupplierUpdate(fixedVals))
        // await dispatch(updateChange(true))
        await getSuppliers()
        await setFixedVals([])
    }

    const funcs = {
        load : getSuppliers,
        onSubmitUpdatedVals : onSubmitUpdatedVals
    }

    return(
        <>
            <button onClick = {getSuppliers}> 체크</button>
            <Table 
                tableArr = {suppliers.data}  
                attr = {tableAttr}
                funcs = {funcs}
                states = {states}
                setStates = {setStates}
            ></Table>
        </>
    )
}   

export default Supplier

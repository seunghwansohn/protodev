import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import Table    from '../components/common/Table1'
import DialogST from '../components/common/DialogST'


import axios from '../lib/api/axios'

import {setSupplierUpdate, updateChange} from '../modules/supplier'
import { onDialogOpen }                  from '../modules/dialogs'


const tableAttr = {
    flag : true,
}

const Supplier = props => {
    const dispatch = useDispatch()

    const [suppliers, setSuppliers] = useState([])
    const [fixedVals, setFixedVals] = useState([]);
    const [updated, setUpdated]     = useState(false);

    const { update } = useSelector(({ supplier }) => ({ update : supplier.table.update }));
    const opened = useSelector(state => state.dialogs.opened)

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
        dispatch(updateChange(false))
        setUpdated(true)
    }

    const states = {
        suppliers : suppliers,
        updated   : updated,
    }

    const setStates = {
        setSuppliers : setSuppliers,
        setUpdated: setUpdated
    }

    const onSubmitUpdatedVals = async (fixedVals) => {
        await dispatch(setSupplierUpdate(fixedVals))
        await getSuppliers()
        await setFixedVals([])
    }

    const checkOpened = (title) => {
        let result = ''
        opened.map(array => {
            if (array.type == title){
                result = array.ox
            }
        })
        return result
    }

    const funcs = {
        load : getSuppliers,
        onSubmitUpdatedVals : onSubmitUpdatedVals,
        onDialogOpen : onDialogOpen
    }

    const DialogsAttr = {
        supplierQuery : {
            title : 'supplierQuery',
            maxWidth : 'xl' ,
            funcs : funcs,
            open : checkOpened('supplierQuery')
        }
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

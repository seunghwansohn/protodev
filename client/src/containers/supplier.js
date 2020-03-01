import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import Table    from '../components/common/Table1'
import DialogST from '../components/common/DialogST'
import SupplierQuery from '../containers/SupplierQuery'


import axios from '../lib/api/axios'

import {
    setSupplierUpdate, 
    updateChange, 
    setClickedTableCol
}                            from '../modules/supplier'

import { onDialogOpen }      from '../modules/dialogs'


const tableAttr = {
    flag : true,
}

const Supplier = props => {
    const dispatch = useDispatch()

    const [suppliers, setSuppliers] = useState([])
    const [fixedVals, setFixedVals] = useState([]);
    const [updated, setUpdated]     = useState(false);
    const [clickedCol, setClickedCol]     = useState({});

    const { update } = useSelector(({ supplier }) => ({ update : supplier.table.update }));
    const opened = useSelector(state => state.dialogs.opened)

    const type = 'supplier'

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

    useEffect(() => {
        dispatch(setClickedTableCol(clickedCol))
        dispatch(onDialogOpen(true, type, clickedCol))
    },[clickedCol])

    const states = {
        suppliers   : suppliers,
        updated     : updated,
        clickedCol  : clickedCol
    }

    const setStates = {
        setSuppliers    : setSuppliers,
        setUpdated      : setUpdated,
        setClickedCol   : setClickedCol
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
            title : 'supplier',
            maxWidth : 'xl' ,
            funcs : funcs,
            open : checkOpened('supplier')
        }
    }

    return(
        <>
            <button onClick = {getSuppliers}> 체크</button>
            <Table 
                type        = {type}
                tableArr    = {suppliers.data}  
                attr        = {tableAttr}
                funcs       = {funcs}
                states      = {states}
                setStates   = {setStates}
            ></Table>

            <DialogST attr = {DialogsAttr.supplierQuery}>
                <SupplierQuery loadReqData = {clickedCol}
                ></SupplierQuery>
            </DialogST>
            
        </>
    )
}   

export default Supplier

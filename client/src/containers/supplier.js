import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import Table    from '../components/common/Table1'
import DialogST from '../components/common/DialogST'
import SupplierQuery from '../containers/SupplierQuery'

import axios from '../lib/api/axios'

import {
    setSupplierUpdate, 
    updateChange, 
    setClickedTableCol,
    setSupplierAdd,
    setSupplierDelete
}                            from '../modules/supplier'

import { onDialogOpen }      from '../modules/dialogs'

const tableAttr = {
    flag : true,
}

const Supplier = props => {
    
    const dispatch                      = useDispatch()

    const [suppliers, setSuppliers]     = useState([])
    const [fixedVals, setFixedVals]     = useState([]);
    const [updated, setUpdated]         = useState(false);
    const [clickedCol, setClickedCol]   = useState({});
    const [addedNew, setAddedNew]       = useState([]);
    const [selected, setSelected]       = useState([]);

    const { update }    = useSelector(({ supplier }) => ({ update : supplier.table.update }));
    const opened        = useSelector(state => state.dialogs.opened)

    const type = 'supplier'

    const getSuppliers = async () => {
        await axios.get('/api/supplier/load').then(res => {
            setSuppliers(res.data)
        })
    }
    
    const onDelete = async (Arr) => {
        await Arr.map(obj => {
            dispatch(setSupplierDelete(obj.supplierCode))
        })
        await setUpdated(true)
        await setSelected([])
    }

    useEffect(async () => {
        await getSuppliers()
    },[])

    useEffect(() => {
        setUpdated(true)
    },[suppliers])

    useEffect(() => {
        if (Object.keys(clickedCol).length > 0) {
            dispatch(setClickedTableCol(clickedCol))
            dispatch(onDialogOpen(true, type, clickedCol))
        } 
    },[clickedCol])
    
    if (update) {
        getSuppliers()
        dispatch(updateChange(false))
        setUpdated(true)
    }

    const onSubmitUpdatedVals = async (fixedVals) => {
        await dispatch(setSupplierUpdate(fixedVals))
        await getSuppliers()
        await setFixedVals([])
    }

    const onSubmitNewAdded = async (addedNew) => {
        await dispatch(setSupplierAdd(addedNew))
        await getSuppliers()
        await setAddedNew([])
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

    const states = {
        rawData   : suppliers,
        updated     : updated,
        clickedCol  : clickedCol,
        addedNew : addedNew,
        selected : selected
    }

    const setStates = {
        setRawData    : setSuppliers,
        setUpdated      : setUpdated,
        setClickedCol   : setClickedCol,
        setAddedNew : setAddedNew,
        setSelected : setSelected
    }

    const stateAttr = {
        supplierCode : {
            fixable : false,
            defaultHided : false
        },
        supplierName : {
            fixable : true,
            defaultHided : false
        },
        country : {
            fixable : true,
            defaultHided : false
        },
        ceo : {
            fixable : true,
            defaultHided : true
        },
        taxCode : {
            fixable : true,
            defaultHided : true
        },
        notes : {
            fixable : true,
            defaultHided : false
        },
        createdAt : {
            fixable : false,
            defaultHided : true
        },
        updatedAt : {
            fixable : false,
            defaultHided : true
        }
    }

    const funcs = {
        load : getSuppliers,
        onSubmitUpdatedVals : onSubmitUpdatedVals,
        onDialogOpen : onDialogOpen,
        onDelete : onDelete,
        onSubmitNewAdded: onSubmitNewAdded
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
                stateAttr   = {stateAttr}
            ></Table>

            <DialogST attr = {DialogsAttr.supplierQuery}>
                <SupplierQuery loadReqData = {clickedCol}
                ></SupplierQuery>
            </DialogST>
            
        </>
    )
}   

export default Supplier

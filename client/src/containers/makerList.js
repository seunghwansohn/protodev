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

const Maker = props => {
    const dispatch = useDispatch()

    const type = 'maker'

    const [rawData, setRawData]           = useState([])
    const [fixedVals, setFixedVals]     = useState([]);
    const [updated, setUpdated]         = useState(false);
    const [clickedCol, setClickedCol]   = useState({});
    const [addedNew, setAddedNew]       = useState([]);
    const [selected, setSelected]       = useState([]);

    const { update } = useSelector(({ supplier }) => ({ update : supplier.table.update }));
    const opened = useSelector(state => state.dialogs.opened)


    const getRawData = async () => {
        await axios.get('/api/' + type + '/load').then(res => {
            setRawData(res.data)
        })
    }

    const onDelete = async (codes) =>{
        await codes.map(code => {
            axios.post('/api/' + type + '/delete', {supplierCode : code.supplierCode}).then(res =>{
                getRawData()
            })
        })
    }

    useEffect(async () => {
        await getRawData()
    },[])

    if (update) {
        getRawData()
        dispatch(updateChange(false))
        setUpdated(true)
    }

    useEffect(() => {
        if (Object.keys(clickedCol).length > 0) {
            dispatch(setClickedTableCol(clickedCol))
            dispatch(onDialogOpen(true, type, clickedCol))
        } 
    },[clickedCol])
    

    const states = {
        rawData     : rawData,
        updated     : updated,
        clickedCol  : clickedCol,
        addedNew    : addedNew,
        selected    : selected
    }

    const setStates = {
        setRawData      : setRawData,
        setUpdated      : setUpdated,
        setClickedCol   : setClickedCol,
        setAddedNew     : setAddedNew,
        setSelected     : setSelected
    }

    const stateAttr = {
        makerCode : {
            fixable : false,
            defaultHided : false
        },
        makerName : {
            fixable : true,
            defaultHided : false
        },
        origin : {
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

    const onSubmitUpdatedVals = async (fixedVals) => {
        await dispatch(setSupplierUpdate(fixedVals))
        await setRawData()
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
        load : getRawData,
        onSubmitUpdatedVals : onSubmitUpdatedVals,
        onDialogOpen : onDialogOpen,
        onDelete : onDelete
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
            <Table 
                type        = {type}
                tableArr    = {rawData.data}  
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

export default Maker

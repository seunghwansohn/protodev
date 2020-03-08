import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import Table    from '../components/common/Table1'
import DialogST from '../components/common/DialogST'
import SupplierQuery from '../containers/SupplierQuery'


import axios from '../lib/api/axios'

import {
    setUpdate, 
    updateChange, 
    setClickedTableCol,
    setAdd,
    setDelete
}                            from '../modules/maker'

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

    const { update } = useSelector(({ maker }) => ({ update : maker.table.update }));
    const opened = useSelector(state => state.dialogs.opened)


    const getRawData = async () => {
        await axios.get('/api/' + type + '/load').then(res => {
            setRawData(res.data)
        })
    }

    console.log(rawData)
    const onDelete = async (codes) =>{
        console.log(codes)
        console.log(type)
        await codes.map(code => {
            dispatch(setDelete(type, code.makerCode))
        })
        await setUpdated(true)
        await setSelected([])
            // axios.post('/api/' + type + '/delete', {makerCode : code.makerCode}).then(res =>{
            //     getRawData()
            // })
    }

    const onSubmitNewAdded = async (addedNew) => {
        await dispatch(setAdd(addedNew))
        await getRawData()
        await setAddedNew([])
    }

    useEffect(() => {
        getRawData()
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
        await dispatch(setUpdate(fixedVals))
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
        onDelete : onDelete,
        onSubmitNewAdded : onSubmitNewAdded
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

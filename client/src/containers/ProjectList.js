import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import Table    from '../components/common/Table1'
import DialogST from '../components/common/DialogST'
// import MakerQuery from './MakerQuery'


import axios from '../lib/api/axios'

import {
    setUpdate, 
    updateChange, 
    setClickedTableCol,
    setAdd,
    setDelete
}                            from '../modules/project'

import { onDialogOpen }      from '../modules/dialogs'


const tableAttr = {
    flag : true,
}

const Project = props => {
    const dispatch = useDispatch()

    const type = 'project'

    const [rawData, setRawData]           = useState([])
    const [fixedVals, setFixedVals]     = useState([]);
    const [updated, setUpdated]         = useState(false);
    const [clickedCol, setClickedCol]   = useState({});
    const [addedNew, setAddedNew]       = useState([]);
    const [selected, setSelected]       = useState([]);

    const { update } = useSelector(({ project }) => ({ update : project.table.update }));
    const opened = useSelector(state => state.dialogs.opened)


    const getRawData = async () => {
        await axios.get('/api/' + type + '/load').then(res => {
            setRawData(res.data)
        })
    }

    const onDelete = async (codes) =>{
        await codes.map(code => {
            dispatch(setDelete(type, code.projectCode))
        })
        await setUpdated(true)
        await setSelected([])
    }

    const onSubmitNewAdded = async (addedNew) => {
        await dispatch(setAdd(addedNew))
        await getRawData()
        await setAddedNew([])
    }

    const onSubmitUpdatedVals = async (fixedVals) => {
        await fixedVals.map(arr => {
            dispatch(setUpdate(arr))
        })
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

    useEffect(() => {
        getRawData()
    },[])



    useEffect(() => {
        if (Object.keys(clickedCol).length > 0) {
            dispatch(setClickedTableCol(clickedCol))
            dispatch(onDialogOpen(true, type, clickedCol))
        } 
    },[clickedCol])
    
    if (update) {
        getRawData()
        dispatch(updateChange(false))
        setUpdated(true)
    }

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
        projectCode : {
            primary : true,
            fixable : false,
            defaultHided : false
        },
        projectName : {
            fixable : true,
            defaultHided : false
        },
        client : {
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
        load : getRawData,
        onSubmitUpdatedVals : onSubmitUpdatedVals,
        onDialogOpen : onDialogOpen,
        onDelete : onDelete,
        onSubmitNewAdded : onSubmitNewAdded
    }

    const DialogsAttr = {
        projectQuery : {
            title : 'project',
            maxWidth : 'xl' ,
            funcs : funcs,
            open : checkOpened('project')
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

            {/* <DialogST attr = {DialogsAttr.projectQuery}>
                <ProjectQuery reqCode = {clickedCol}
                ></ProjectQuery>
            </DialogST> */}
            
        </>
    )
}   

export default Project

import React, { useState, useEffect }        from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import ClientMain from '../components/clientMain'
import {setClientLoad} from '../modules/clients'
import {setInsertClient} from '../modules/quote'
import Table from '../components/common/Table1'
import ContactForm from '../components/clientAdd'
import DialogST from '../components/common/DialogST'
import ClientAdd from '../components/clientAdd'
import ButtonHeader from '../components/common/ButtonHeader'
import { onDialogOpen } from '../modules/dialogs'

import axios                from '../lib/api/axios'

import {getIncludingKeys,
    withoutIncludingKeys,
    generateRandom}         from '../lib/common'

import { 
    onAlreadyPickedCheck,
    onSetClose,
    onSetItemListHeader,
    setHeader,
    setInputChange,
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete
 } from '../modules/clients'





const Client = ({attr, motherType, motherNo, subTableAttr}) => {
    
    const dispatch = useDispatch();

    const [rawData, setRawData]                 = useState([])
    const [fixedVals, setFixedVals]             = useState([]);
    const [updated, setUpdated]                 = useState(false);
    const [clickedCol, setClickedCol]           = useState({});
    const [addedNew, setAddedNew]               = useState([]);
    const [selected, setSelected]               = useState([]);
    const [primaryKey, setPrimaryKey]           = useState('');
    const [defaultIdentKey, setDefaultIdentKey] = useState('clientName');

    const [includingKeys, 
        setIncludingKeys]               = useState([]);

    const {tableButton, setFindOneResult} = subTableAttr


    const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
    const type = 'clientContainer'
    const dataType = 'client'
    const containerNo = type + '_' + frameNo
    console.log('현Comp는 (', type, ', ', frameNo, ')', ', 마더comp는 (', motherType, ', ', motherNo, ')')

    const {open} = attr
    const {update} = useSelector(({ item }) => ({ update : item.table.update }));
    const dialogOpened   = useSelector(state => state.dialogs.opened)
    const filter   = useSelector(state => state.clients.table.filter[frameNo][dataType])

    console.log(filter)
    const tableAttr = {
        flag : true,
        colAttr :   {
            itemCode : {
                primary : true,
                fixable : false,
                defaultHided : false
            },
            itemName : {
                fixable : true,
                defaultHided : false
            },
            description : {
                fixable : true,
                defaultHided : true
            },
            weight : {
                fixable : true,
                defaultHided : true
            },
            width : {
                fixable : true,
                defaultHided : true
            },
            depth : {
                fixable : true,
                defaultHided : true
            },
            height : {
                fixable : true,
                defaultHided : true
            },
            importTaxRate : {
                fixable : true,
                defaultHided : false
            },
            maker : {
                fixable : true,
                defaultHided : false
            },
            supplierCode : {
                fixable : true,
                defaultHided : false
            },
            makerModelNo : {
                fixable : true,
                defaultHided : false
            },
            VNPrice : {
                fixable : true,
                defaultHided : false
            },
            stkVVar : {
                fixable : true,
                defaultHided : true
            },
            stkCVar : {
                fixable : true,
                defaultHided : true
            },
            createdAt : {
                fixable : false,
                defaultHided : true
            },
            updatedAt : {
                fixable : false,
                defaultHided : true
            },

        },
        tableButton,
        setFindOneResult,
    }

    const getRawData = async () => {
        await axios.get('/api/' + dataType + '/load').then(res => {
            setPrimaryKey(res.data.primaryKey)
            setIncludingKeys(getIncludingKeys(res.data.result))
            setRawData(withoutIncludingKeys(res.data.result))
        })
    }
    
    useEffect(() => {
        getRawData()
    },[])

    const setDelete = async (codes) =>{
        await codes.map(code => {
            dispatch(actDelete(type, code.itemCode))
        })
        await setUpdated(true)
        await setSelected([])
    }

    const onSetHeader = (arrangedColumns) => {
        dispatch(setHeader(arrangedColumns))
    }

    const onSetSelectedItems = (items) => {
        // dispatch(setSelectedItems(items))
    }

    const onChangeInput = (id, name, value) => {
        dispatch(setInputChange({id, name, value}))
    }

    const onSelectButton = (items) => {
    }

    const onSubmitNewAdded = async () => {
        // let obj = {addedNew :}
        await dispatch(actAdd(addedNew, includingKeys))
        await getRawData()
        await setAddedNew([])
    }

    const onSubmitUpdatedVals = async (fixedVals) => {
        await fixedVals.map(arr => {
            dispatch(actUpdate(arr))
        })
        await setFixedVals([])
    }

    const recordToDB = () => {
        // dispatch(recordQuote(quoteProp.table))
    }

    const onInsertButton = (selected) => {
        dispatch(setInsertClient(selected))
    }
    const defaultHideCols = [
        'width',
        'depth',
        'weight',
        'id',
        'height'
    ]

    
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

    const funcs = {
        load : getRawData,
        onSubmitUpdatedVals : onSubmitUpdatedVals,
        onDialogOpen : onDialogOpen,
        onDelete : setDelete,
        onSubmitNewAdded : onSubmitNewAdded
    }

    const colAttr = {
        itemCode : {
            primary : true,
            fixable : false,
            defaultHided : false
        },
        itemName : {
            fixable : true,
            defaultHided : false
        },
        description : {
            fixable : true,
            defaultHided : true
        },
        weight : {
            fixable : true,
            defaultHided : true
        },
        width : {
            fixable : true,
            defaultHided : true
        },
        depth : {
            fixable : true,
            defaultHided : true
        },
        height : {
            fixable : true,
            defaultHided : true
        },
        importTaxRate : {
            fixable : true,
            defaultHided : false
        },
        maker : {
            fixable : true,
            defaultHided : false
        },
        supplierCode : {
            fixable : true,
            defaultHided : false
        },
        makerModelNo : {
            fixable : true,
            defaultHided : false
        },
        VNPrice : {
            fixable : true,
            defaultHided : false
        },
        stkVVar : {
            fixable : true,
            defaultHided : true
        },
        stkCVar : {
            fixable : true,
            defaultHided : true
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
    
    let colTypes = {
    }
    
    const arrangeRules = [   //헤더 순서를 정하려면 여기다가 배열값 추가 하면 됨.
        ['importRate', 'description'],
        ['weight', 'height'],
        ['priceRate', 'VNPrice'],
        ['quotePrice', 'priceRate'],
        ['qty', 'quotePrice'],
        ['amount', 'qty'],
        ['notes', 'amount'],
    ]

    const table     = useSelector(state => state.clients.table)
    const dialogs   = useSelector(state => state.dialogs)
    const {opened}  = dialogs

    const checkOpened = (title) => {
        let result = ''
        opened.map(array => {
            if (array.type == title){
                result = array.ox
            }
        })
        return result
    }

    const onHeaderButton = async (type) => {
        const ox = true
        await dispatch(onDialogOpen(ox, type))
    }

    const DialogsAttr = {
        itemAdd : {
            title : 'Item Add',
            maxWidth : 'xl' ,
            funcs : funcs,
            open : checkOpened('itemAdd')
        },
        check : {
            title : 'check',
            maxWidth : 'xl',
            open : 'checkOpened'
        },
        addClient : {
            title : 'Add Client',
            maxWidth : 'xl' ,
            funcs : funcs,
            open : checkOpened('addClient')
        },
    }

    return(
        <>
            <ClientMain></ClientMain>
            <ButtonHeader type = {type} onHeaderButton = { onHeaderButton }></ButtonHeader>

            <Table
                type        = {type}
                tableArr    = {rawData}  
                attr        = {tableAttr}
                funcs       = {funcs}
                states      = {states}
                setStates   = {setStates}
                initialFilter    = {filter}
            >
            </Table>

            <DialogST attr = {DialogsAttr.addClient}>
                <ClientAdd title = {DialogsAttr.addClient.title}></ClientAdd>
            </DialogST>
        </>
    )
}   

export default Client

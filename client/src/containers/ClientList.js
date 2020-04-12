import React, { useState, useEffect }        from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import ClientMain from '../components/clientMain'
import {setClientLoad} from '../modules/clients'
import {setInsertClient} from '../modules/quote'
import Table from '../components/common/Table1'
import DialogST from '../components/common/dialogs/DialogST'
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



const Client = ({motherType, motherNo, subTableAttr}) => {
    const dispatch = useDispatch();

    //개체 기본 속성
    const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
    const type = 'clientContainer'
    const containerNo = type + '_' + frameNo
    const dataType = 'client'
    // console.log('현Comp는 (', type, ', ', frameNo, ')', ', 마더comp는 (', motherType, ', ', motherNo, ')')


    //다이얼로그 관련
    const opened         = useSelector(state => state.dialogs.opened)
    const dialogOpened   = useSelector(state => state.dialogs.opened)

    const checkOpened = (title) => {
        let result = ''
        opened.map(array => {
            if (array.type == title){
                result = array.ox
            }
        })
        return result
    }
    const dialogFuncs = {
        onDialogOpen : onDialogOpen,
    }
    const DialogsAttr = {
        itemAdd : {
            title : 'Item Add',
            maxWidth : 'xl' ,
            funcs : dialogFuncs,
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
            funcs : dialogFuncs,
            open : checkOpened('addClient')
        },
    }


    //테이블 관련   
    const [tableRawData, 
        setTableRawData]                 = useState([])
    const [primaryKey, setPrimaryKey]    = useState('');
    const [includingKeys, 
        setIncludingKeys]                = useState([]);
    const [findingKeys, 
        setFindingKeys]               = useState([]);

    //서브컨테이너 기능 관련
    const {tableButton, setFindOneResult, initialFilter, directQuery} = subTableAttr ? subTableAttr : ''

    //테이블 업데이트
    const [fixedVals, setFixedVals]             = useState([]);
    const [updated, setUpdated]                 = useState(false);
    // const {update} = useSelector(({ client }) => ({ update : client.table.update }));


    //테이블값 새로 추가
    const [addedNew, setAddedNew]               = useState([]);
    const onSubmitNewAdded = async () => {
        // let obj = {addedNew :}
        await dispatch(actAdd(addedNew, includingKeys))
        await getRawData()
        await setAddedNew([])
    }

    //테이블값 수정
    const onSubmitUpdatedVals = async (fixedVals) => {
        await fixedVals.map(arr => {
            dispatch(actUpdate(arr))
        })
        await setFixedVals([])
    }

    //테이블값 삭제
    const setDelete = async (codes) =>{
        await codes.map(code => {
            dispatch(actDelete(type, code.itemCode))
        })
        await setUpdated(true)
        await setSelected([])
    }

    //테이블 셀렉트
    const [selected, setSelected]               = useState([]);
    const [clickedCol, setClickedCol]           = useState({});


    //테이블 필터
    const [filterKeyword, setFilterKeyword]     = useState('');
    const [filteredData, setFilteredData]       = useState(tableRawData);

    const getRawData = async () => {
        await axios.get('/api/' + dataType + '/load').then(res => {
            setPrimaryKey(res.data.primaryKey)
            setIncludingKeys(getIncludingKeys(res.data.result))
            setTableRawData(withoutIncludingKeys(res.data.result))
        })
    }

    useEffect(() => {
        console.log('겟로우데이타실행')
        getRawData()
    },[])


    useEffect(() => {
        if (Object.keys(clickedCol).length > 0) {
            dispatch(actClickedTableCol(clickedCol))
            dispatch(onDialogOpen(true, type, clickedCol))
        } 
    },[clickedCol])
    
    // if (update) {
    //     getRawData()
    //     dispatch(actUpdateChange(false))
    //     setUpdated(true)
    // }

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

    const [defaultIdentKey, setDefaultIdentKey] = useState('clientName');

    // const filter   = useSelector(state => state.clients.table.filter[frameNo][dataType])

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
        frameNo,
        initialFilter,
        directQuery
    }

    const funcs = {
        load : getRawData,
        onSubmitUpdatedVals : onSubmitUpdatedVals,
        onDelete : setDelete,
        onSubmitNewAdded : onSubmitNewAdded,
        onDialogOpen : onDialogOpen,
    }

    const tableStates = {
        rawData     : tableRawData,
        updated     : updated,
        clickedCol  : clickedCol,
        addedNew    : addedNew,
        selected    : selected,
        filterKeyword   : filterKeyword,
        filteredData    : filteredData
    }

    const setTableStates = {
        setRawData      : setTableRawData,
        setUpdated      : setUpdated,
        setClickedCol   : setClickedCol,
        setAddedNew     : setAddedNew,
        setSelected     : setSelected,
        setFilterKeyword    : setFilterKeyword,
        setFilteredData     : setFilteredData
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


    const onHeaderButton = async (type) => {
        const ox = true
        await dispatch(onDialogOpen(ox, type))
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




    return(
        <>
            <ClientMain></ClientMain>
            <ButtonHeader type = {type} onHeaderButton = { onHeaderButton }></ButtonHeader>

            <Table
                type        = {type}
                attr        = {tableAttr}
                funcs       = {funcs}
                states      = {tableStates}
                setStates   = {setTableStates}
                // frameNo     = {frameNo}
            >
            </Table>

            <DialogST attr = {DialogsAttr.addClient}>
                {/* <ClientAdd title = {DialogsAttr.addClient.title}></ClientAdd> */}
            </DialogST>
        </>
    )
}   

export default Client

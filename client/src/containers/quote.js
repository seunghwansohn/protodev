import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import QuoteListComponent from '../components/quoteList'
import Table from '../components/common/Table1'
import QueryHeader from '../components/common/queryHeader'
import DialogST from '../components/common/DialogST'

import Client from '../containers/clients'

import * as onFuncsDialog from '../modules/dialogs'
import * as mainSearchAct from '../modules/mainSearch';
import { setSearchKeyword } from '../modules/mainSearch'
import { setApiLoad } from '../modules/itemList'
import { 
    onAlreadyPickedCheck,
    onSetClose,
    onSetItemListHeader,
    setSelectedItems,
    setHeader,
    setInputChange,
    recordQuote,
    querySubmit,
    actSubmit
 } from '../modules/quote'
 import { onDialogOpen } from '../modules/dialogs'

 import { actSetFilter } from '../modules/clients'


import {generateRandom}                         from '../lib/common';

import TableContainer from '@material-ui/core/TableContainer';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import {produce} from 'immer'

import axios                from '../lib/api/axios'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
}))
const QuoteContainer = ({motherType, motherNo}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const opened    = useSelector(state => state.dialogs.opened)

    const [rawData, setRawData]         = useState([])

    const querySelected  = useSelector(state => state.quoteList.selected)
    const queryRequested = useSelector(state => state.quoteList.requested)

    const quoteProp = useSelector(state => state.quoteList)

    const [date, setDate]                   = useState('');


    const [client, setClient]               = useState('');
    const [clientRate, setClientRate]       = useState('');

    const [changedHeaderInput, 
        setChangedHeaderInput]              = useState({});
    
    const [filterKeyword, setFilterKeyword]     = useState('');

    const [foundResult, 
        setFoundResult]                     = useState({});
    
    const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
    const type = 'quoteContainer'
    const containerNo = type + '_' + frameNo
    console.log('현Comp는 (', type, ', ', frameNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')

    const quoteNo = quoteProp.table.info.date + '-' + quoteProp.table.info.quoteLastNo
    
    useEffect(() => {
        if (Object.keys(foundResult).includes('clientRate')){
            console.log('클라이언트레이트있음', foundResult.clientRate)
            setClientRate(foundResult.clientRate)
        }
      },[foundResult])


    const getRawData = async () => {

    }

    //테이블 셀렉트
    const [selected, setSelected]       = useState([]);
    const [clickedCol, setClickedCol]   = useState({});

    const tableStates = {
        rawData     : quoteProp.table.contents,
        // updated     : updated,
        // clickedCol  : clickedCol,
        // addedNew    : addedNew,
        selected    : selected,
        filterKeyword   : filterKeyword

    }

    const setTableStates = {
        setRawData         : setRawData,
        // setUpdated      : setUpdated,
        // setClickedCol   : setClickedCol,
        // setAddedNew     : setAddedNew,
        // setSelected     : setSelected,
        setFilterKeyword   : setFilterKeyword

    }

    const funcs = {
        load : getRawData,
        // onSubmitUpdatedVals : onSubmitUpdatedVals,
        // onDialogOpen : onDialogOpen,
        // onDelete : setDelete,
        // onSubmitNewAdded : onSubmitNewAdded
    }
    
    //   console.log(queteProp)
    const queryHeaderfuncs = () => {
        const onSetClose = (type) => {
            const ox = false
            dispatch(onFuncsDialog.onDialogOpen(ox,type))
        }

        const onRecordToDB = () => {
            dispatch(recordQuote(quoteProp.table))
        }

        const onQueryheaderInputChange = (title, e) => {
            setChangedHeaderInput(
                produce(changedHeaderInput, draft => {
                    draft[title] = e.target.value
                }
            ))
        }

        const onQueryHeaderKeyPress = async (frameNo, title, e) => {
            if (e.key === 'Enter') {
                let tempObj = {}
                const daialogNo = title + '_' + frameNo
                tempObj[frameNo] = {}
                tempObj[frameNo][title] = changedHeaderInput[title]
                // await axios.post('/api/' + type )
                dispatch(actSubmit(tempObj))
                dispatch(actSetFilter(frameNo, title, e.target.value))
                dispatch(onDialogOpen(true, daialogNo))
            }
        }

        const funcsObj = {
            onSetClose : onSetClose,
            onRecordToDB : onRecordToDB,
            headerInputChanged : onQueryheaderInputChange,
            onKeyPressOnInput : onQueryHeaderKeyPress
        }
        
        return funcsObj
    }

    const queryHeaderProps = [
        [
            {type : 'paper', size : 3, title: 'quoteNo', state : quoteNo, style:'regular'},
            {type : 'paper', title: 'date', state : date, style:'regular'},
        ],
        [
            {type : 'input', size : 3, title: 'client', state : client, setState: setClient, style:'regular'},
            {type : 'paper', title: 'clientRate', state : clientRate, setState : setClientRate, style:'regular'},
        ]
    ]

    const checkOpened = (title) => {
        let result = ''
        opened.map(array => {
            if (array.type == title){
                result = array.ox
            }
        })
        return result
    }

    const defaultHideCols = [
        'width',
        'depth',
        'weight',
        'id',
        'height',
        'description',
        'itemCode',
        'notes',
        'itemCode',
        'supplierCode',
        'makerModelNo',
    ]

    const arrangeRules = [   //헤더 순서를 정하려면 여기다가 배열값 추가 하면 됨.
        ['importRate', 'description'],
        ['weight', 'height'],
        ['priceRate', 'VNPrice'],
        ['quotePrice', 'priceRate'],
        ['qty', 'quotePrice'],
        ['amount', 'qty'],
        ['notes', 'amount'],
    ]

    const DialogsAttr = {
        client : {
            title : 'client_' + frameNo,
            maxWidth : 'xl' ,
            funcs : queryHeaderfuncs(),
            open : checkOpened('client_' + frameNo),
            table : {
                tableButton : [
                    {
                        title : 'insert',
                        func : function(row, index, containerNo){
                        },
                        mother : containerNo
                    },
                ],
                setFindOneResult : setFoundResult,
                frameNo : 'client_' + frameNo,
                initialFilter : 'll'
            },
        }
    }

    const tableAttr = {
        flag : true,
        colAttr :   {
            itemCode : {
                primary : true,
                fixable : false,
                defaultHided : true
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
            notes : {
                fixable : true,
                defaultHided : true
            },
            makerModelNo : {
                fixable : true,
                defaultHided : true
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
            qty : {
                fixable : true,
                defaultHided : false,
                defaultInput : true,
                defaultValue : 0
            },
            amount : {
                calValue : true,
                value : function(index) {
                    let result = ''
                    if (quoteProp.table.contents[index].buyingPKR && quoteProp.table.contents[index].qty) {
                        result = quoteProp.table.contents[index].buyingPKR * quoteProp.table.contents[index].qty
                    }
                    return result
                }
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
    }

    return(
        <div className = {classes.root}> 
        
        <h1>Quote List</h1>
            <QueryHeader
                motherType          = {type}
                motherNo            = {frameNo}
                funcs               = {queryHeaderfuncs()}
                queryHeaderProps    = {queryHeaderProps}
            >
            </QueryHeader>

            <DialogST attr = {DialogsAttr.client} motherNo = {frameNo} motherType = {type}>
                <Client
                    motherType          = {type}
                    motherNo            = {frameNo} 
                    subTableAttr        = {DialogsAttr.client.table}
                ></Client>
            </DialogST>

            <TableContainer>
                {quoteProp.table.contents.length !== 0 ? 
                    <Table 
                        motherType          = {type}
                        motherNo            = {frameNo}
                        states      = {tableStates}
                        setStates   = {setTableStates}
                        attr        = {tableAttr}
                        funcs       = {funcs}

                    >
                    </Table> : ''}
            </TableContainer>
        </div>
    )
}   

export default QuoteContainer

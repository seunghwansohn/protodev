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

    const quoteProp = useSelector(state => state.quoteList)
    const opened    = useSelector(state => state.dialogs.opened)
    const selected  = useSelector(state => state.quoteList.selected)
    const requested = useSelector(state => state.quoteList.requested)

    const [date, setDate]                   = useState('');


    const [client, setClient]               = useState('');
    const [clientRate, setClientRate]       = useState('');

    const [changedHeaderInput, 
        setChangedHeaderInput]              = useState({});
    
    const [foundResult, 
        setFoundResult]                     = useState({});
    
    const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
    const type = 'quoteContainer'
    const containerNo = type + '_' + frameNo
    console.log('현Comp는 (', type, ', ', frameNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')

    const quoteNo = quoteProp.table.info.date + '-' + quoteProp.table.info.quoteLastNo

    const queryHeaderfuncs = () => {
        const onSetClose = (type) => {
            if (type == 'quoteList') {
            }
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
        'itemCode'
    ]


    let colTypes = {
        priceRate : {
            style : 'input',
            type : 'number',
        },
        qty : {
            style : 'input',
            type : 'number'
        },
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

    const DialogsAttr = {
        client : {
            title : 'client_' + frameNo,
            maxWidth : 'xl' ,
            funcs : queryHeaderfuncs(),
            open : checkOpened('client_' + frameNo),
            tableButton : [
                {
                    title : 'insert',
                    func : function(row, index, containerNo){
                    },
                    mother : containerNo
                },
            ],
            setFindOneResult : {
                setFoundResult : setFoundResult
            }
        }
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

    return(
        <div className = {classes.root}> 
        
        <h1>Quote List</h1>
            <QueryHeader
                quoteNo             = {quoteNo}
                motherType          = {type}
                motherNo            = {frameNo}
                funcs               = {queryHeaderfuncs()}
                queryHeaderProps    = {queryHeaderProps}
            >
            </QueryHeader>

            <DialogST attr = {DialogsAttr.client} motherNo = {frameNo}>
                <Client
                    motherType          = {type}
                    motherNo            = {frameNo} 
                    attr = {DialogsAttr.client} 
                    subTableAttr = {DialogsAttr.client.table}
                    motherNo = {frameNo}
                ></Client>
            </DialogST>

            <TableContainer>
                {quoteProp.table.contents.length !== 0 ? 
                    <Table 
                        table = { quoteProp.table } 
                        type = 'quoteList'
                        motherType          = {type}
                        motherNo            = {frameNo}
                        defaultHideCols = {defaultHideCols}
                        arrangeRules = {arrangeRules}
                        colTypes = {colTypes}
                        quoteNo = {quoteNo}
                        motherNo = {frameNo}
                    >
                    </Table> : ''}
            </TableContainer>
        </div>
    )
}   

export default QuoteContainer

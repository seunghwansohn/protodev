import React, { useEffect } from 'react'
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
    querySubmit
 } from '../modules/quote'
 import { onDialogOpen } from '../modules/dialogs'


import TableContainer from '@material-ui/core/TableContainer';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
}))
const QuoteContainer = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const quoteProp = useSelector(state => state.quoteList)
    const opened = useSelector(state => state.dialogs.opened)
    
    const type = 'quoteList'
    
    const funcs = () => {
        const onSetClose = (type) => {
            if (type == 'quoteList') {
            }
            const ox = false
            dispatch(onFuncsDialog.onDialogOpen(ox,type))
        }
        const onSetHeader = (arrangedColumns) => {
            dispatch(setHeader(arrangedColumns))
        }
        const onSetSelectedItems = (items) => {
            dispatch(setSelectedItems(items))
        }
        const onChangeInput = (id, name, value) => {
            dispatch(setInputChange({id, name, value}))
        }
        const onRecordToDB = () => {
            dispatch(recordQuote(quoteProp.table))
        }
        const onQuerySubmit = async (type, payload) => {
            await dispatch(querySubmit({type, payload}))
            await dispatch(onDialogOpen(true, type))
        }
        const funcsObj = {
            onSetClose : onSetClose,
            onSetHeader : onSetHeader,
            onSetSeletedItems : onSetSelectedItems,
            onChangeInput : onChangeInput,
            onRecordToDB : onRecordToDB,
            onQuerySubmit : onQuerySubmit
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

    const quoteNo = quoteProp.table.info.date + '-' + quoteProp.table.info.quoteLastNo
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
        clients : {
            title : 'Clients',
            maxWidth : 'xl' ,
            funcs : funcs,
            open : checkOpened('clients')
        }
    }

    const queryHeaderElAttr = {
        customer : {
            title : 'customer',
            type : 'form'
        },
        customerRate : {
            title : 'customerRate',
            type : 'paper'
        }
    }

    const queryHeaderProps = [
        [
            {type : 'paper', size : 2, title: 'quoteNo', state : quoteNo, style:'regular'},
            {type : 'paper', title: 'date', state : quoteNo, style:'regular'},
        ],
        [
            {type : 'Input', size : 2, title: 'customer', state : quoteNo, style:'regular'},
            {type : 'paper', title: 'supplierName', state : quoteNo, style:'regular'},
        ]
    ]

    return(
        <div className = {classes.root}> 
        
        <h1>Quote List</h1>
            <QueryHeader
                quoteNo = {quoteNo}
                type = {type}
                funcs = {funcs()}
                queryHeaderProps = {queryHeaderProps}
            >
            </QueryHeader>

            <DialogST attr = {DialogsAttr.clients}>
                <Client></Client>
            </DialogST>

            <TableContainer>
                {quoteProp.table.contents.length !== 0 ? 
                    <Table 
                        table = { quoteProp.table } 
                        funcs = {funcs()}
                        type = 'quoteList'
                        defaultHideCols = {defaultHideCols}
                        arrangeRules = {arrangeRules}
                        colTypes = {colTypes}
                        quoteNo = {quoteNo}
                    >
                    </Table> : ''}
            </TableContainer>
        </div>
    )
}   

export default QuoteContainer

import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import ClientMain from '../components/clientMain'
import {setClientLoad} from '../modules/clients'
import {setInsertClient} from '../modules/quote'
import Table from '../components/common/Table'
import ContactForm from '../components/clientAdd'
import DialogST from '../components/common/DialogST'
import ClientAdd from '../components/clientAdd'
import ButtonHeader from '../components/common/ButtonHeader'
import { onDialogOpen } from '../modules/dialogs'

import { 
    onAlreadyPickedCheck,
    onSetClose,
    onSetItemListHeader,
    setHeader,
    setInputChange,
 } from '../modules/clients'

const Client = props => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setClientLoad())
    }, []);

    const type = 'client'

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

    const recordToDB = () => {
        // dispatch(recordQuote(quoteProp.table))
    }

    const onInsertButton = (selected) => {
        console.log(selected.clientCode)
        dispatch(setInsertClient(selected))
    }
    const defaultHideCols = [
        'width',
        'depth',
        'weight',
        'id',
        'height'
    ]

    
    const funcs = {
        onSetHeader : onSetHeader,
        onSetSeletedItems : onSetSelectedItems,
        onChangeInput : onChangeInput,
        recordToDB : recordToDB,
        onSelectButton : onSelectButton,
        onInsertButton : onInsertButton
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

    const table = useSelector(state => state.clients.table)
    const dialogs = useSelector(state => state.dialogs)
    const {opened} = dialogs

    const checkOpened = (title) => {
        console.log(title)
        let result = ''
        opened.map(array => {
            if (array.type == title){
                result = array.ox
            }
        })
        return result
    }

    console.log(opened)
    const onHeaderButton = async (type) => {
        console.log(type)
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
            {table.contents.length !== 0 ? 
            <Table
                type = {type}
                table = {table}
                funcs = {funcs}
                arrangeRules = {arrangeRules}
                colTypes = {colTypes}
            >
            </Table> : ''}

            <DialogST attr = {DialogsAttr.addClient}>
                <ClientAdd title = {DialogsAttr.addClient.title}></ClientAdd>
            </DialogST>
        </>
    )
}   

export default Client

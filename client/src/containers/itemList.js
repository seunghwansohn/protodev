import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import {checkedItem, IsThereSelected} from '../modules/itemList'
import { setSearchKeyword } from '../modules/mainSearch'
import { onAlreadyPickedCheck } from '../modules/quote'
import { setAuthReset } from '../modules/auth'
import { onDialogOpen } from '../modules/dialogs'
import { 
    setApiLoad,
    clickButtonHeader,
    setNewItem,
    setHeader,
    setSelectedItems 
} from '../modules/itemList'

import { getExchangeRate } from '../modules/basicInfo'

import SearchAppBar from '../components/common/appBar'
import DialogST from '../components/common/DialogST'
import Table from '../components/common/Table'
import ButtonHeader from '../components/common/ButtonHeader'
import ItemAdd from '../components/ItemAdd'
import ItemQuery from '../components/ItemQuery'
import SupplierAdd from '../components/supplierAdd'


import spacelize from '../lib/spacelize'
import { Field, reduxForm } from 'redux-form'


const ItemListContainer = () => {
    const dispatch = useDispatch();
    const { 
            opened, 
            dialogs, 
            searchingNow, 
            searchKeyword, 
            itemListArr, 
            searchProps,
            isThereSelected,
            selectedItem
    } = useSelector(
        ({ mainSearch, itemList, dialogs }) => ({
            searchingNow    : mainSearch.searchingNow,
            searchKeyword   : mainSearch.searchKeyword,

            itemListArr     : itemList.table.contents,
            isThereSelected : itemList.table.isThereSelected,
            selectedItem    : itemList.table.selectedItem,

            dialogs         : itemList.dialogs,
            opened          : dialogs.opened,

            searchProps : {
                searchKeyword : mainSearch.searchKeyword,
                searchingNow : mainSearch.searchingNow
            }
        }),
    );

    const table = useSelector(state => state.itemList.table)

    const getOpendDialog = (dialogs) => {
        let convertedArray = []
        dialogs.map(dialog => {
            const dialogObject = {
                cameled : dialog,
                spaced : spacelize(dialog)
            }
            convertedArray.push(dialogObject)
        })
        return convertedArray
    }
    const openedDialogs = getOpendDialog(dialogs.opened)

    const type = 'itemList'


    const onSearch = (searchKeyword) => {
        dispatch(setSearchKeyword(searchKeyword))
    }

 
    const onApiLoad = () => {
        dispatch(setApiLoad())
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

    const onHeaderButton = async (type) => {
        if (type =='copyItem') {
            if (selectedItem.length !== 0){
                await dispatch(checkedItem(selectedItem[0]))
            }
        }
        const ox = true
        await dispatch(onDialogOpen(ox, type))
    }

    const onSetHeader = (arrangedColumns) => {
        dispatch(setHeader(arrangedColumns))
    }
    const onSetSelectedItems = (items) => {
        dispatch(setSelectedItems(items))
    }
    const onInsertButton = (items) => {
        dispatch(onAlreadyPickedCheck(items))
    }

    const onSubmitNewItem = (submitValues) => {
        dispatch(setNewItem(submitValues))
    }
    
    const funcs = {
        onSetHeader : onSetHeader,
        onSetSeletedItems : onSetSelectedItems,
        onInsertButton : onInsertButton
    }

    const arrangeRules = [   //헤더 순서를 정하려면 여기다가 배열값 추가 하면 됨.
        ['maker', 'itemName'],
        ['VNPrice', 'maker'],
        ['importRate', 'notes'],
        ['weight', 'height'],
        ['amount', 'VNPrice'],

    ]

    let colTypes = {
    }

    const DialogsAttr = {
        itemAdd : {
            title : 'Item Add',
            maxWidth : 'md' ,
            funcs : funcs,
            open : checkOpened('itemAdd'),
            scroll : 'paper'
            
        },
        itemQuery : {
            title : 'Item Query',
            maxWidth : 'md' ,
            funcs : funcs,
            open : checkOpened('itemQuery'),
            scroll : 'paper'
            
        },
        check : {
            title : 'check',
            maxWidth : 'xl',
            open : 'checkOpened'
        },
        addSupplier : {
            title : 'Add Supplier',
            maxWidth : 'md',
            open : checkOpened('addSupplier'),
            funcs : funcs,
            scroll : 'paper'
        }
    }

    const arrFunc = () => {
        let Arr = []
        const makeFieldAttrArr = (name, component) => {
            const obj = {
                name : name,
                component : component,
                label : spacelize(name)
            }
            Arr.push(obj)
        }
        makeFieldAttrArr('firstName', 'renderTextField')
        makeFieldAttrArr('secondName', 'renderTextField')
        return Arr
    }
    
    const defaultHideCols = [
        'width',
        'depth',
        'weight',
        'id',
        'height',
        'makerModelNo',
        'description'

    ]

    useEffect(() => {
        dispatch(setApiLoad())
    }, []);

    useEffect(() => {
        dispatch(setAuthReset())
    }, []);

    const onCheck = () => {
        dispatch(getExchangeRate())
    }
    return(
        <>
            <SearchAppBar onSearch    = {onSearch}/>
            <ButtonHeader type = {type} onHeaderButton = { onHeaderButton } isThereSelected = {isThereSelected}></ButtonHeader>
            <button onClick = {onCheck}>체크</button>
            <DialogST attr = {DialogsAttr.itemAdd}>
                <ItemAdd title = {DialogsAttr.itemAdd.title} fieldsAttr = {arrFunc()}></ItemAdd>
            </DialogST>

            <DialogST attr = {DialogsAttr.itemQuery}>
                <ItemQuery title = {DialogsAttr.itemQuery.title} fieldsAttr = {arrFunc()}></ItemQuery>
            </DialogST>

            <DialogST attr = {DialogsAttr.addSupplier}>
                <SupplierAdd></SupplierAdd>
            </DialogST>

            {itemListArr.length !== 0 ? 
                <Table 
                    type = {type}
                    table = {table}
                    funcs = {funcs}
                    onAlreadyPickedCheck = {onAlreadyPickedCheck}
                    defaultHideCols = {defaultHideCols}
                    arrangeRules = {arrangeRules}
                    colTypes = {colTypes}
                    filterKeyword = {searchKeyword}
                >
                </Table> : ''
            }
        </>
    )
}   

export default ItemListContainer

import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import {checkedItem, IsThereSelected}   from '../modules/itemList'
import { setSearchKeyword }             from '../modules/mainSearch'
import { onAlreadyPickedCheck }         from '../modules/quote'
import { setAuthReset }                 from '../modules/auth'
import { onDialogOpen }                 from '../modules/dialogs'
import { getExchangeRate }              from '../modules/basicInfo'
import {
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete
}                                       from '../modules/itemList'

import DialogST     from '../components/common/DialogST'
import Table        from '../components/common/Table1'
import ButtonHeader from '../components/common/ButtonHeader'

import {generateRandom}                         from '../lib/common';

// // import ItemAdd from '../components/ItemAdd'
// import ItemQuery from '../components/ItemQuery'
// import SupplierAdd from '../components/supplierAdd'

import axios                from '../lib/api/axios'
import {getIncludingKeys,
    withoutIncludingKeys }  from '../lib/common'




const ItemListContainer = ({motherType, motherNo}) => {
    const dispatch = useDispatch();

    const opened    = useSelector(state => state.dialogs.opened)

    const [rawData, setRawData]         = useState([])
    const [fixedVals, setFixedVals]     = useState([]);
    const [updated, setUpdated]         = useState(false);
    const [clickedCol, setClickedCol]   = useState({});
    const [addedNew, setAddedNew]       = useState([]);
    const [selected, setSelected]       = useState([]);
    const [primaryKey, setPrimaryKey]   = useState([]);
    const [includingKeys, 
        setIncludingKeys]               = useState([]);
    
    const {update} = useSelector(({ item }) => ({ update : item.table.update }));
    const dialogOpened   = useSelector(state => state.dialogs.opened)


    const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
    const type = 'itemListContainer'
    const containerNo = type + '_' + frameNo
    const dataType = 'item'

    const getRawData = async () => {
        await axios.get('/api/' + dataType + '/load').then(res => {
            setPrimaryKey(res.data.primaryKey)
            setIncludingKeys(getIncludingKeys(res.data.result))
            setRawData(withoutIncludingKeys(res.data.result))
        })
    }
    
    const setDelete = async (codes) =>{
        await codes.map(code => {
            dispatch(actDelete(type, code.itemCode))
        })
        await setUpdated(true)
        await setSelected([])
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

    const checkOpened = (title) => {
        let result = ''
        dialogOpened.map(array => {
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
            dispatch(actClickedTableCol(clickedCol))
            dispatch(onDialogOpen(true, type, clickedCol))
        } 
    },[clickedCol])
    
    if (update) {
        getRawData()
        dispatch(actUpdateChange(false))
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

    const tableAttr = {
        flag : true,
        colAttr : {
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
        tableButton : [
            {
                title : 'insert',
                func : function(row, index, containerNo){
                },
                mother : containerNo
            },
        ],
    }

    const DialogsAttr = {
        itemQuery : {
            title : type,
            maxWidth : 'xl' ,
            funcs : funcs,
            open : checkOpened(type)
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
                colAttr     = {colAttr}
            ></Table>

            {/* <DialogST attr = {DialogsAttr.itemQuery}>
                {/* <MakerQuery reqCode = {clickedCol}
                ></MakerQuery> */}
            {/* </DialogST> */}
            
        </>
    )
}   

export default ItemListContainer

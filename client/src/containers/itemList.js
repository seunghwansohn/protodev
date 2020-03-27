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






const ItemListContainer = ({motherType, motherNo, subTableAttr}) => {
    const dispatch = useDispatch();

    //개체 기본 속성
    const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
    const type = 'itemListContainer'
    const containerNo = type + '_' + frameNo
    const dataType = 'item'


    //다이얼로그 관련
    const opened         = useSelector(state => state.dialogs.opened)
    const dialogOpened   = useSelector(state => state.dialogs.opened)

    const checkOpened = (title) => {
        let result = ''
        dialogOpened.map(array => {
            if (array.type == title){
                result = array.ox
            }
        })
        return result
    }

    const DialogsAttr = {
        itemQuery : {
            title : type,
            maxWidth : 'xl' ,
            // funcs : funcs,
            open : checkOpened(type)
        }
    }



    //테이블 관련
    const [tableRawData, 
        setTableRawData]                = useState([])
    const [primaryKey, setPrimaryKey]   = useState('');
    const [includingKeys, 
        setIncludingKeys]               = useState([]);

    //테이블 업데이트
    const [fixedVals, setFixedVals]             = useState([]);
    const [updated, setUpdated]                 = useState(false);
    const {update} = useSelector(({ item }) => ({ update : item.table.update }));

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


    //테이블 로드
    const getRawData = async () => {
        await axios.get('/api/' + dataType + '/load').then(res => {
            setPrimaryKey(res.data.primaryKey)
            setIncludingKeys(getIncludingKeys(res.data.result))
            setTableRawData(withoutIncludingKeys(res.data.result))
        })
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


    //table 관련 속성들
    const tableStates = {
        rawData         : tableRawData,
        updated         : updated,
        clickedCol      : clickedCol,
        addedNew        : addedNew,
        selected        : selected,
        filterKeyword   : filterKeyword,
        filteredData    : filteredData
    }
    const setTableStates = {
        setTableRawData     : setTableRawData,
        setUpdated          : setUpdated,
        setClickedCol       : setClickedCol,
        setAddedNew         : setAddedNew,
        setSelected         : setSelected,
        setFilterKeyword    : setFilterKeyword,
        setFilteredData     : setFilteredData
    }
    const funcs = {
        load : getRawData,
        onSubmitUpdatedVals : onSubmitUpdatedVals,
        onDialogOpen : onDialogOpen,
        onDelete : setDelete,
        onSubmitNewAdded : onSubmitNewAdded
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
                func : function(row){
                    console.log(row)
                    dispatch(onAlreadyPickedCheck(row))
                },
                mother : containerNo
            },
        ],
    }



    return(
        <>
            <Table 
                motherType  = {type}
                motherNo    = {frameNo}
                states      = {tableStates}
                setStates   = {setTableStates}
                attr        = {tableAttr}
                funcs       = {funcs}
            ></Table>

            {/* <DialogST attr = {DialogsAttr.itemQuery}>
                {/* <MakerQuery reqCode = {clickedCol}
                ></MakerQuery> */}
            {/* </DialogST> */}
            
        </>
    )
}   

export default ItemListContainer

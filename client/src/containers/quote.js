import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import QuoteListComponent   from '../components/quoteList'
import Table                from '../components/common/Table1'
import InputTable           from '../components/common/InputTable'
import QueryHeader          from '../components/common/queryHeader'
import DialogST             from '../components/common/DialogST'

import Client from '../containers/clients'

import * as onFuncsDialog from '../modules/dialogs'
import * as mainSearchAct from '../modules/mainSearch';
import { setSearchKeyword } from '../modules/mainSearch'
import { actQuery } from '../modules/query'

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
    actSubmit,
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete

 } from '../modules/quote'
 import { onDialogOpen } from '../modules/dialogs'

 import { actSetFilter } from '../modules/clients'


import {generateRandom}     from '../lib/common';
import {getDateNow}     from '../lib/basicInfo';


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



const QuoteContainer = ({motherType, motherNo, subTableAttr}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    //개체 기본 속성
    const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
    const type = 'quoteContainer'
    const containerNo = type + '_' + frameNo
    const dataType = 'quote'
    // console.log('현Comp는 (', type, ', ', frameNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')


    //쿼리헤더관련
    const [foundResult, 
        setFoundResult]                     = useState({});

    const [changedHeaderInput, 
        setChangedHeaderInput]              = useState({});
        
    const querySelected     = useSelector(state => state.quoteList.selected)
    const queryRequested    = useSelector(state => state.quoteList.requested)
    const queryVars         = useSelector(state => state.query[frameNo])

    const {filter} = queryVars ? queryVars : ''

    const [client, setClient]               = useState('');
    const [clientRate, setClientRate]       = useState('');

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
                let type = 'filter'
                let tempObj = {}
                const daialogNo = title + '_' + frameNo
                tempObj[frameNo] = {}
                tempObj[frameNo][title] = changedHeaderInput[title]
                // await axios.post('/api/' + type )
                dispatch(actQuery(frameNo, type, title, e.target.value))
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


    //다이얼로그 관련
    const opened    = useSelector(state => state.dialogs.opened)
    const dialogOpened   = useSelector(state => state.dialogs.opened)
    const simpleQuery = 'simple'
    const detailQuery = 'detail'

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
                initialFilter : filter ? filter.client : '',
                directQuery : true
            },
        }
    }


    //테이블 관련
    const [tableRawData,
        setTableRawData]         = useState([])
    const [primaryKey, setPrimaryKey]   = useState('');
    const [includingKeys, 
        setIncludingKeys]               = useState([]);
    const [findingKeys, 
        setFindingKeys]               = useState([]);

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

    // //테이블 클릭
    // const [clickedCol, 
    // setClickedCol]     = useState({});
    // const clicked        = useSelector(state => state.item.table.clicked)
    // const reqQueryCode   = tableRawData[clicked.row] ? tableRawData[clicked.row][primaryKey] : ""
      

    // useEffect(() => {
    //     if (Object.keys(clickedCol).length > 0) {
    //         dispatch(actClickedTableCol(clickedCol))
    //     } 
    //   },[clickedCol])
    //   //      테이블 클릭시 가격 클릭이랑 나머지 클릭이랑 따로 나눔
    //   useEffect(() => {
    //     let keys = Object.keys(clicked)
    //     if (keys.length > 0) {
    //       if (includingKeys.price.includes(clicked.header)) {
    //         dispatch(actClickedTableCol(clickedCol))
    //         // dispatch(loadAccount(clickedCol))
    //         dispatch(onDialogOpen(true, detailQuery, clickedCol))
    //       }else{
    //         dispatch(actClickedTableCol(clickedCol))
    //         dispatch(onDialogOpen(true, simpleQuery, clickedCol))
    //       }
    //     } 
    // },[clicked])


    //테이블 필터
    const [filterKeyword, setFilterKeyword]     = useState('');
    const [filteredData, setFilteredData]       = useState(tableRawData);



    const quoteProp         = useSelector(state => state.quoteList)

    const [date, setDate]                   = useState(getDateNow());

    const getRawData = () => {

    }

    const quoteNo = date.yymmdd + '-' + quoteProp.table.info.quoteLastNo
    
    useEffect(() => {
        if (Object.keys(foundResult).includes('clientRate')){
            console.log('클라이언트레이트있음', foundResult.clientRate)
            setClientRate(foundResult.clientRate)
        }
    },[foundResult])



    const tableStates = {
        rawData     : quoteProp.table.contents,
        // updated     : updated,
        // clickedCol  : clickedCol,
        // addedNew    : addedNew,
        selected    : selected,
        filterKeyword   : filterKeyword,
        filteredData    : filteredData
    }

    const setTableStates = {
        setRawData         : setTableRawData,
        // setUpdated      : setUpdated,
        // setClickedCol   : setClickedCol,
        // setAddedNew     : setAddedNew,
        // setSelected     : setSelected,
        setFilterKeyword   : setFilterKeyword,
        setFilteredData     : setFilteredData
    }

    const funcs = {
        load : getRawData,
        // onSubmitUpdatedVals : onSubmitUpdatedVals,
        // onDialogOpen : onDialogOpen,
        // onDelete : setDelete,
        // onSubmitNewAdded : onSubmitNewAdded
    }
    


    const queryHeaderProps = [
        [
            {type : 'paper', size : 3, title: 'quoteNo', state : quoteNo, style:'regular'},
            {type : 'paper', title: 'date', state: date.yyyymmdd1 ,style:'regular'},
        ],
        [
            {type : 'input', size : 3, title: 'client', state : client, setState: setClient, style:'regular'},
            {type : 'paper', title: 'clientRate', state : clientRate, setState : setClientRate, style:'regular'},
        ]
    ]


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


    const tableAttr = {
        flagAble : true,
        fixModeAble : false,
        colAttr :   {
            itemCode : {
                type : true,
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
            priceRate : {
                fixable : true,
                defaultHided : false,
                defaultInput : true,
                defaultValue : 0
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
                    if (filteredData[index].buyingPKR && filteredData[index].qty) {
                        result = filteredData[index].buyingPKR * filteredData[index].qty
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
                key = {'queryHeader'}
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
                        motherType  = {type}
                        motherNo    = {frameNo}
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

import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import { onAlreadyPickedCheck }         from '../modules/quote'
import {onDialogOpen, onDialogClose}    from '../modules/dialogs'
import {
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete
}                                       from '../modules/itemList'

import DialogST     from '../components/common/dialogs/DialogST'
import Table        from '../components/common/Table1'

import {generateRandom}               from '../lib/common';

import ItemAdd      from '../components/ItemAdd'

import Query        from '../components/Query'
import Button           from '@material-ui/core/Button';


import axios                from '../lib/api/axios'
import {getIncludingKeys,
    withoutIncludingKeys }  from '../lib/common'



const ItemListContainer = ({
  motherFrameNo, 
  motherType, 
  motherNo, 
  subTableAttr
}) => {
  const dispatch = useDispatch();

  //개체 기본 속성
  const [frameNo, setFrameNo]  = useState(motherFrameNo ? motherFrameNo : generateRandom())
  const [currentNo, setCurrentNo]  = useState(generateRandom())

  const currentType = 'itemList'
  const containerNo = currentType + '_' + frameNo
  const dataType = 'item'

  console.log('프레임넘버는 ', frameNo, ' 현Comp는 (', currentType, ', ', currentNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')


  //테이블 관련
  const [tableRawData, 
    setTableRawData]                = useState([])
  const [primaryKey, setPrimaryKey]   = useState('');
  const [includingKeys, 
      setIncludingKeys]               = useState([]);
  const [findingKeys, 
      setFindingKeys]               = useState([]);
  
  //테이블 업데이트
  const [fixedVals, setFixedVals]             = useState([]);
  const [updated, setUpdated]                 = useState(false);

  const {update} = useSelector(({ item }) => ({ update : item.table.update }));

  //테이블 클릭
  const [clickedCol, 
    setClickedCol]     = useState({});
  const clicked        = useSelector(state => state.item.table.clicked)

  useEffect(() => {
    if (Object.keys(clickedCol).length > 0) {
        dispatch(actClickedTableCol(clickedCol))
    } 
  },[clickedCol])

  //테이블 새로 추가 state
  const [addedNew, setAddedNew]               = useState([]);
  const onSubmitNewAdded = async () => {
    await addedNew.map(obj => {
      dispatch(actAdd(obj, primaryKey, includingKeys, findingKeys))
    })
    await getRawData()
    await setAddedNew([])
  }


  //테이블 셀렉트
  const [selected, setSelected]         = useState([]);

  //테이블 필터
  const [filterKeyword, setFilterKeyword]     = useState('');
  const [filteredData, setFilteredData]       = useState(tableRawData);

  //테이블 로드
  const getRawData = async () => {
    await axios.get('/api/' + dataType + '/load').then(res => {
      setPrimaryKey(res.data.primaryKey)
      setIncludingKeys(res.data.includingKeys)
      setTableRawData(withoutIncludingKeys(res.data.vals))
      setFindingKeys(res.data.findingKeys)
    })
  }
  useEffect(() => {
    getRawData()
  },[])

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
        dispatch(actDelete(dataType, code[primaryKey]))
    })
    await setUpdated(true)
    await setSelected([])
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
    flagAble : true,
    fixModeAble : true,
    colAttr : {
      itemCode : {
          primary : true,
          fixable : false,
          defaultHided : false,
          validate : ['code'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery'
      },
      itemName : {
          fixable : true,
          defaultHided : false,
          validate : ['string'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery'

      },
      description : {
          fixable : true,
          defaultHided : true,
          validate : ['string'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery'
      },
      weight : {
          fixable : true,
          defaultHided : true,
          validate : ['maxValue5', 'number'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery'
      },
      width : {
          fixable : true,
          defaultHided : true,
          validate : ['maxValue5', 'number'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery'
      },
      depth : {
          fixable : true,
          defaultHided : true,
          validate : ['maxValue5', 'number'],
          dataType : dataType,                
          clickType : 'itemQuery',
          queryType : 'simpleQuery'
      },
      height : {
          fixable : true,
          defaultHided : true,
          validate : ['maxValue5', 'number'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery'
      },
      importTaxRate : {
          fixable : true,
          defaultHided : false,
          validate : ['percent', 'plus', 'decimal2', 'number'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery'
      },
      makerName : {
          fixable : true,
          defaultHided : false,
          validate : ['string'],
          dataType : 'maker',
          clickType : 'makerQuery',
          queryType : 'simpleQuery'
      },
      makerModelNo : {
          fixable : true,
          defaultHided : false,
          validate : ['string'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery'
      },
      supplierName : {
          fixable : true,
          defaultHided : false,
          query : true,
          dataType : 'supplier',
          validate : ['string'],
          clickType : 'itemQuery',
          queryType : 'simpleQuery'
      },
      VNPrice : {
          fixable : true,
          defaultHided : false,
          validate : ['number', 'max15'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'detailQuery'
      },
      buyingPKR : {
          fixable : true,
          defaultHided : false,
          validate : ['number'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'detailQuery'
      },
      stkVVar : {
          fixable : true,
          defaultHided : true,
          validate : ['decimal2', 'max1', 'number'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'detailQuery'
      },
      stkCVar : {
          fixable : true,
          defaultHided : true,
          validate : ['decimal2', 'max1', 'number'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'detaileQuery'
      },
      createdAt : {
          fixable : false,
          defaultHided : true,
          dataType : dataType,
      },
      updatedAt : {
          fixable : false,
          defaultHided : true,
          dataType : dataType,
      },
    },
    tableButton : [
      {
        title : 'insert',
        func : function(selected){
            dispatch(onAlreadyPickedCheck(selected.value))
        },
        mother : containerNo
      },
    ],
    findingKeys
  }

  //다이얼로그 관련
  const dialogOpened                  = useSelector(state => state.dialogs.opened)
  const [dialogInfo, setDialogInfo]   = useState({})
  const simpleQuery = 'simpleQuery'
  const detailQuery = 'detailQuery'

  const checkOpened = (type) => {
    let result = ''
    dialogOpened.map(obj => {
      console.log(obj)
      if (
        obj.frameNo     == frameNo && 
        obj.currentNo   == currentNo && 
        obj.currentType == currentType && 
        obj.motherNo    == motherNo &&
        obj.motherType  == motherType &&
        obj.clickedType == type 
      ) {
        result = true
      }
    })
    return result
  }
  const DialogsAttr = {
    itemAdd : {
      title : detailQuery,
      dialogType : detailQuery,
      maxWidth : 'md' ,
      open : checkOpened(detailQuery),
      scroll : 'paper'
    },
    itemQuery : {
      title : simpleQuery,
      dialogType : simpleQuery,
      maxWidth : 'xl' ,
      open : checkOpened(simpleQuery)
    }
  }
  useEffect(()=> {
    dialogOpened.map(obj => {
      if (
        obj.frameNo     == frameNo && 
        obj.currentNo   == currentNo && 
        obj.motherNo    == motherNo &&
        obj.motherType  == motherType
      ) {
        setDialogInfo(obj)
      }
    })
  },[dialogOpened])

  console.log(dialogInfo)

  //      테이블 클릭시 가격 클릭이랑 나머지 클릭이랑 따로 나눔
  useEffect(() => {
    let keys = Object.keys(clicked)
    const {colAttr} = tableAttr
    const colAttrKeys = Object.keys(colAttr)

    const {header, row, value, dataType, primaryCode, queryType} = clicked
    const {clickType} = tableAttr.colAttr[header] ? tableAttr.colAttr[header] : ''
    if (keys.length > 0) {
      let aColAttr = tableAttr.colAttr[clicked.header]
      let {clickType, dataType} = aColAttr
      let queryType = ''
      colAttrKeys.map(key => {
        if (key == header) {
          queryType = colAttr[key].queryType
        }
      })
      let tempObj = {
        frameNo     : frameNo,
        currentNo   : currentNo,
        currentType : currentType, 
        motherNo    : motherNo, 
        motherType  : motherType,

        clickedHeader       : header,
        clickedIndex        : row,
        clickedVal          : value,
        clickedType         : queryType,
        clickedPrimaryCode  : primaryCode,

        dataType      : dataType, 
        initialFilter : '',
      }
      dispatch(onDialogOpen(tempObj))
    }
    dialogOpened.map(obj => {
      if(obj.frameNo == frameNo && obj.currentNo == currentNo) {
        setDialogInfo(obj)
      }
    })
  },[clicked])






  const test = () => {
    // dispatch(loadAccount())
    // dispatch(onDialogOpen(true, detailQuery, clickedCol))
    // console.log(checkOpened('itemName'))
    checkOpened()
  }


  if (update) {
    getRawData()
    dispatch(actUpdateChange(false))
    setUpdated(true)
  }


  return(
    <>
      <Button onClick = {test}>푸하하</Button>
      <DialogST motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {currentType} attr = {DialogsAttr.itemAdd}>
          아이템에디디
        <ItemAdd 
          title       = {DialogsAttr.itemAdd.title} 

          motherType    = {currentType}
          motherFrameNo = {frameNo} 
          motherNo      = {currentNo}

          reqKey      = {primaryKey}
          attr        = {dialogInfo}
        ></ItemAdd>
      </DialogST>

      <Table 
        motherType    = {currentType}
        motherFrameNo = {frameNo} 
        motherNo      = {currentNo}

        states        = {tableStates}
        setStates     = {setTableStates}
        attr          = {tableAttr}
        funcs         = {funcs}
      ></Table>

      <DialogST motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {currentType} attr = {DialogsAttr.itemQuery}>
        <Query 
          motherType    = {currentType}
          motherFrameNo = {frameNo} 
          motherNo      = {currentNo}

          reqKey      = {primaryKey}
          attr        = {dialogInfo}
        ></Query>
      </DialogST>
    </>
  )
}   

export default ItemListContainer

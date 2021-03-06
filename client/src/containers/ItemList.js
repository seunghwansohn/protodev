import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import { onAlreadyPickedCheck }         from '../modules/quote'
import {actDialogOpen, actDialogClose}    from '../modules/dialogs'
import {
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete
}                                       from '../modules/itemList'

import DialogST     from '../components/dialogs/DialogST'
import Table        from '../components/table/Table1'

import {generateRandom}               from '../lib/funcs/fCommon';

import ItemAdd      from '../components/query/ItemAdd'

import Query        from '../components/query/Query'
import Button           from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';


const ItemListContainer = ({
  motherFrameNo, 
  motherType, 
  motherNo, 
  subTableAttr
}) => {
  const dispatch = useDispatch();

  //개체 기본 속성
  const [frameNo, setFrameNo]       = useState(motherFrameNo ? motherFrameNo : generateRandom())
  const [currentNo, setCurrentNo]   = useState(generateRandom())
  const debugMode                   = useSelector(state => state.common.debugMode)

  const currentType = 'itemList'
  // const containerNo = currentType + '_' + frameNo
  const dataType    = 'item'

  console.log('프레임넘버는 ', frameNo, ' 현Comp는 (', currentType, ', ', currentNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')


  const [primaryKey, setPrimaryKey]   = useState('');
  const [includingKeys, 
      setIncludingKeys]               = useState([]);
  const [findingKeys, 
      setFindingKeys]                 = useState([]);
  

  const acts = {
    onDialogOpen : function (argObj) {
      let tempObj = argObj
      tempObj.frameNo = frameNo
      tempObj.currentNo = currentNo
      tempObj.currentType = currentType
      tempObj.motherNo = motherNo
      tempObj.motherType = motherType
      dispatch(actDialogOpen(tempObj))
    },
    onSubmitNewAdded : function (obj, primaryKey, includingKeys, findingKeys) {
      dispatch(actAdd(obj, primaryKey, includingKeys, findingKeys))
    },
    // onUpdate : function (obj, primaryKey, includingKeys, findingKeys) {
    //   dispatch(actAdd(obj, primaryKey, includingKeys, findingKeys))
    // },
    onSubmitUpdatedVals : function (arr) {
      dispatch(actUpdate(arr))
    },
    onDelete : function(dataType, primaryCode) {
      dispatch(actDelete(dataType, primaryCode))
    }
  }


  let tableAttr = {
    flagAble : true,
    fixModable : true,
    colAttr : {
      itemCode : {
          primary : true,
          fixable : false,
          defaultHided : false,
          validate : ['code'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery',
          size : '150px'
      },
      itemName : {
          fixable : true,
          defaultHided : false,
          validate : ['string'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery',
          size : '300px'
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
          query : true,
          validate : ['string'],
          dataType : 'maker',
          clickType : 'makerQuery',
          queryType : 'simpleQuery',
          size : '100px'
      },
      makerModelNo : {
          fixable : true,
          defaultHided : false,
          validate : ['string'],
          dataType : dataType,
          clickType : 'itemQuery',
          queryType : 'simpleQuery',
          size : '100px'
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
          queryType : 'detailQuery',
          size : '100px'
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
        // mother : containerNo
      },
    ],
    findingKeys,
    gMotherAttr : {
      gMotherNo : motherNo,
      gMotherType : motherType
    }
  }
  tableAttr = Object.assign(tableAttr, subTableAttr)

  //다이얼로그 관련
  const dialogOpened                  = useSelector(state => state.dialogs.opened)
  const [dialogInfo, setDialogInfo]   = useState({})
  const simpleQuery = 'simpleQuery'
  const detailQuery = 'detailQuery'

  const checkOpened = (type) => {
    let result = ''
    dialogOpened.map(obj => {
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

  const test = () => {
    // dispatch(loadAccount())
    // dispatch(onDialogOpen(true, detailQuery, clickedCol))
    // console.log(checkOpened('itemName'))
    checkOpened()
  }



  return(
    <>
      {debugMode ? <Paper style = {{color : 'red'}}> 프레임넘버는 {frameNo}, 현Comp는 {currentType}, {currentNo}, 마더comp는 {motherType}, {motherNo} </Paper>: '디버그모드false'}
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

        dataType      = {dataType}
        attr          = {tableAttr}
        acts          = {acts}
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

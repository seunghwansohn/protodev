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
}                                       from '../modules/expense'

import DialogST     from '../components/common/dialogs/DialogST'
import Table        from '../components/common/Table1'

import {generateRandom}               from '../lib/common';

// import ExpenseAdd      from '../components/ExpenseAdd'

import Query        from '../components/Query'
import Button           from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';


const ExpenseListContainer = ({
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

  const currentType = 'expenseList'
  // const containerNo = currentType + '_' + frameNo
  const dataType    = 'expense'

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
    onSubmitUpdatedVals : function (arr) {
      console.log(arr)
      dispatch(actUpdate(arr))
    },
    onDelete : function(dataType, primaryCode) {
      dispatch(actDelete(dataType, primaryCode))
    },
    onTableCol : function(clickedCol) {
      dispatch(actClickedTableCol(clickedCol))
    },
    onUpdateChange : function(clickedCol) {
      dispatch(actUpdateChange(false))
    }
  }


  const tableAttr = {
    flagAble : true,
    fixModeAble : true,
    colAttr : {
      expenseCode : {
        primary : true,
        fixable : false,
        defaultHided : true,
        validate : ['string'],
        dataType : dataType,
        defaultCodeType : 'yymmddhhminRandom',
        clickType : 'expenseQuery',
        queryType : 'simpleQuery',
        size : '180px'
      },
      description : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        dataType : dataType,
        clickType : 'expenseQuery',
        queryType : 'simpleQuery',
        size : '300px'
      },
      sortName : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        type     : 'select',
        code      : 'sortCode',
        name      : 'sortName',
        dataType : 'expenseSort',
        size : '150px'
      },
      unitCost : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        dataType : 'maker',
        clickType : 'makerQuery',
        queryType : 'simpleQuery',
        size : '80px'
      },
      qty : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        dataType : 'maker',
        clickType : 'makerQuery',
        queryType : 'simpleQuery',
        size : '40px'
      },
      authorizedBy : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        dataType : 'maker',
        clickType : 'makerQuery',
        queryType : 'simpleQuery'
      },
      fileAddr : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        type     : 'file',
        dataType : 'maker',
        clickType : 'makerQuery',
        queryType : 'simpleQuery',
        size      : '60px'
      },
      memo : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        type     : 'singleNote',
        dataType : 'maker',
        clickType : 'makerQuery',
        queryType : 'simpleQuery',
        size      : '60px'
      },
      approved : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        type     : 'approveCheckBox',
        dataType : 'maker',
        clickType : 'makerQuery',
        queryType : 'simpleQuery',
        size      : '60px'
      },
      memoAuthorized : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        type     : 'singleNote',
        dataType : 'maker',
        clickType : 'makerQuery',
        queryType : 'simpleQuery',
        size      : '60px'
      },
      projectName : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        query    : true,
        dataType : 'project', 
        clickType : 'makerQuery',
        queryType : 'simpleQuery',
        size      : '100px'
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
    // tableButton : [
    //   {
    //     title : 'insert',
    //     func : function(selected){
    //         dispatch(onAlreadyPickedCheck(selected.value))
    //     },
    //     // mother : containerNo
    //   },
    // ],
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
    expenseAdd : {
      title : detailQuery,
      dialogType : detailQuery,
      maxWidth : 'md' ,
      open : checkOpened(detailQuery),
      scroll : 'paper'
    },
    expenseQuery : {
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
  console.log(dialogOpened)

  const test = () => {
    // dispatch(loadAccount())
    // dispatch(onDialogOpen(true, detailQuery, clickedCol))
    // console.log(checkOpened('expenseName'))
    checkOpened()
  }



  return(
    <>
      {debugMode ? <Paper style = {{color : 'red'}}> 프레임넘버는 {frameNo}, 현Comp는 {currentType}, {currentNo}, 마더comp는 {motherType}, {motherNo} </Paper>: '디버그모드false'}
      <Button onClick = {test}>푸하하</Button>
      <DialogST motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {currentType} attr = {DialogsAttr.expenseAdd}>
          아이템에디디
        {/* <ExpenseAdd 
          title       = {DialogsAttr.expenseAdd.title} 

          motherType    = {currentType}
          motherFrameNo = {frameNo} 
          motherNo      = {currentNo}

          reqKey      = {primaryKey}
          attr        = {dialogInfo}
        ></ExpenseAdd> */}
      </DialogST>

      <Table 
        motherType    = {currentType}
        motherFrameNo = {frameNo} 
        motherNo      = {currentNo}

        dataType      = {dataType}
        attr          = {tableAttr}
        acts          = {acts}
      ></Table>

      <DialogST motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {currentType} attr = {DialogsAttr.expenseQuery}>
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

export default ExpenseListContainer

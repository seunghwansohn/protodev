import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import { actDialogOpen, 
  actDialogClose }          from '../modules/dialogs'
import {
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actClickedTableChip,
    actAdd,
    actDelete
}                           from '../modules/expense'

import DialogST     from '../components/dialogs/DialogST'
import Table        from '../components/table/Table1'
import Query        from '../components/query/Query'

import Paper            from '@material-ui/core/Paper';

import {generateRandom}               from '../lib/funcs/fCommon';

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
  const dataType    = 'expense'

  const gMotherAttr = {
    gMotherNo   : motherNo,
    gMotherType : motherType
  }

  console.log('프레임넘버는 ', frameNo, ' 현Comp는 (', currentType, ', ', currentNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')

  let tableAttr = {
    flagAble : true,
    fixModable : true,
    gMotherAttr,
    colAttr : {
      expenseCode : {
        primary : true,
        fixableUser : ['brian'],
        defaultHided : true,
        validate : ['string'],
        dataType : dataType,
        defaultCodeType : 'yymmddhhminRandom',
        clickType : 'expenseQuery',
        queryType : 'simpleQuery',
        size : '180px'
      },
      description : {
        fixableUser : ['brian'],
        defaultHided : false,
        validate : ['string'],
        dataType : dataType,
        clickType : 'expenseQuery',
        queryType : 'simpleQuery',
        size : '300px',
        validate : ['required'],

      },
      sortName : {
        type     : 'select',

        fixable : true,
        defaultHided : false,

        validate : ['string'],
        dataType : 'expenseSort',

        code      : 'sortCode',
        name      : 'sortName',

        size : '150px'
      },
      unitCost : {
        fixable : true,
        defaultHided : false,

        validate : ['number', 'max15', 'required'],
        dataType : 'maker',

        clickType : 'makerQuery',
        queryType : 'simpleQuery',

        size : '80px',
      },
      qty : {
        fixable : true,
        defaultHided : false,

        validate : ['number', 'maxValue5', 'required'],
        dataType : 'maker',

        clickType : 'makerQuery',
        queryType : 'simpleQuery',

        size : '40px',
      },
      fileAddr : {
        type     : 'file',

        fixable : true,
        defaultHided : false,

        validate : ['string'],
        dataType : 'maker',

        clickType : 'makerQuery',
        queryType : 'simpleQuery',

        size      : '60px'
      },
      memo : {
        type     : 'singleNote',

        fixable : true,
        defaultHided : false,

        validate : ['string'],
        dataType : 'maker',

        clickType : 'makerQuery',
        queryType : 'simpleQuery',

        size      : '60px'
      },
      approved : {
        type          : 'approveCheckBox',
        checkCode     : 'approved',
        byCode        : 'approvedBy',
        memoCode      : 'approvedMemo',

        fixable       : true,
        defaultHided  : false,

        validate      : ['string'],
        dataType      : 'maker',

        clickType     : 'makerQuery',
        queryType     : 'simpleQuery',

        size          : '60px'
      },
      projectName : {
        fixable : true,
        defaultHided : false,

        validate : ['string'],
        dataType : 'project', 

        query    : true,
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
  }
  tableAttr = Object.assign(tableAttr, subTableAttr)

  const tableActs = {
    onDialogOpen : function (argObj) {
      let tempObj = argObj
      tempObj.frameNo = frameNo
      tempObj.currentNo = motherNo
      tempObj.currentType = motherType
      tempObj.motherNo = gMotherAttr.gMotherNo
      tempObj.motherType = gMotherAttr.gMotherType
      dispatch(actDialogOpen(tempObj))
    },
    onSubmitNewAdded : function (obj, primaryKey, includingKeys, findingKeys) {
      dispatch(actAdd(obj, primaryKey, includingKeys, findingKeys))
    },
    onSubmitUpdatedVals : function (arr) {
      dispatch(actUpdate(arr))
    },
    onDelete : function(dataType, primaryCode) {
      dispatch(actDelete(dataType, primaryCode))
    },
    onTableCol : function(clickedCol) {
      dispatch(actClickedTableCol(clickedCol))
    },
    onTableChip : function(clickedChip) {
      dispatch(actClickedTableChip(clickedChip))
    },
    onUpdateChange : function(clickedCol) {
      dispatch(actUpdateChange(false))
    }
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
        obj.frameNo     == frameNo && //ㅇ
        obj.currentNo   == currentNo && //ㅇ
        obj.currentType == currentType && //ㅇ
        obj.motherNo    == motherNo && //
        obj.motherType  == motherType &&
        obj.clickedType == type 
      ) {
        result = true
      }
    })
    return result
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
      maxWidth : 'md' ,
      open : checkOpened(simpleQuery)
    }
  }
  // 최종적으로 dialogInfo라는 객체를 만들어줌. 
  // 이 dialogInfo를 Query 콤포넌트에다가 넘겨주기만 하면 됨.
  // console.log(dialogInfo)


  return(
    <>
      {debugMode ? <Paper style = {{color : 'red'}}> 프레임넘버는 {frameNo}, 현Comp는 {currentType}, {currentNo}, 마더comp는 {motherType}, {motherNo} </Paper>: '디버그모드false'}

      <Table 
        motherType    = {currentType}
        motherFrameNo = {frameNo} 
        motherNo      = {currentNo}

        dataType      = {dataType}
        attr          = {tableAttr}
        acts          = {tableActs}
      ></Table>

      <DialogST motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {currentType} attr = {DialogsAttr.expenseQuery}>
        <Query 
          motherType    = {currentType}
          motherFrameNo = {frameNo} 
          motherNo      = {currentNo}

          attr        = {dialogInfo}
        ></Query>
      </DialogST>
    </>
  )
}   

export default ExpenseListContainer

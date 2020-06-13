import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import { actDialogOpen, actDialogClose }    from '../modules/dialogs'
import {
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete
}                                       from '../modules/expense'

import DialogST     from '../components/dialogs/DialogST'
import Table        from '../components/table/Table1'
import Query        from '../components/query/Query'

import Button           from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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


  let tableAttr = {
    flagAble : true,
    fixModable : true,
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
        validate : ['number', 'max15', 'required'],
        dataType : 'maker',
        clickType : 'makerQuery',
        queryType : 'simpleQuery',
        size : '80px',
      },
      qty : {
        fixable : true,
        defaultHided : false,
        validate : ['string'],
        dataType : 'maker',
        clickType : 'makerQuery',
        queryType : 'simpleQuery',
        size : '40px',
        validate : ['number', 'maxValue5', 'required'],
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
        fixable       : true,
        defaultHided  : false,
        validate      : ['string'],
        type          : 'approveCheckBox',
        checkCode     : 'approved',
        byCode        : 'approvedBy',
        memoCode      : 'approvedMemo',
        dataType      : 'maker',
        clickType     : 'makerQuery',
        queryType     : 'simpleQuery',
        size          : '60px'
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


  return(
    <>
      {debugMode ? <Paper style = {{color : 'red'}}> 프레임넘버는 {frameNo}, 현Comp는 {currentType}, {currentNo}, 마더comp는 {motherType}, {motherNo} </Paper>: '디버그모드false'}
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

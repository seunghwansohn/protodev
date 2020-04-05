import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import TextField                  from '@material-ui/core/TextField'
import InputAdornment             from '@material-ui/core/InputAdornment';
import Grid                       from '@material-ui/core/Grid';
import IconButton                 from '@material-ui/core/IconButton';
import EditIcon                   from '@material-ui/icons/Edit';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button                     from '@material-ui/core/Button';
import { onDialogOpen }           from '../../modules/dialogs'
import { actSelect }               from '../../modules/query'



import Supplier from '../../containers/supplier'


import DialogST             from './DialogST'

import {generateRandom}     from '../../lib/common';

import axios                from '../../lib/api/axios'

import produce  from 'immer'

import styled   from 'styled-components';

const TextFieldST = styled(TextField)`
  background-color: 
    ${props => {
      if (props.type == 'fixable' && props.fixMode == false) {
        return '#ffffff'
      } else if (props.type == 'fixable' && props.fixMode == true){ 
        return '#ffe6ff'}}};
  label.Mui-focused {
    color: green;
    font-size : 18px;
    vertical-align : text-top;

  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red;
    }
    &:hover fieldset {
      border-color: yellow;
    }
    &.Mui-focused fieldset {
      border-bottom: green;
    }
  }
  input:valid {
    border-bottom: 5px solid green;
  }  
  input:invalid {
    border-bottom: 5px solid red;
  }   
`


const QueryInput = ({
  motherNo,
  motherType,
  dialog,
  selectFunc
}) => {
  const dispatch = useDispatch()

  console.log(dialog)
  
  //개체 기본 속성
  const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
  const type = 'queryInputComp'
  const containerNo = type + '_' + frameNo
  const dataType = dialog

  console.log('현Comp는 (', type, ', ', frameNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')


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
    // const onSetClose = (type) => {
    //     const ox = false
    //     dispatch(onFuncsDialog.onDialogOpen(ox,type))
    // }
    // const onRecordToDB = () => {
    //     dispatch(recordQuote(quoteProp.table))
    // }
    // const onQueryheaderInputChange = (title, e) => {
    //     setChangedHeaderInput(
    //         produce(changedHeaderInput, draft => {
    //             draft[title] = e.target.value
    //         }
    //     ))
    // }
    // const onQueryHeaderKeyPress = async (frameNo, title, e) => {
    //     if (e.key === 'Enter') {
    //         let type = 'filter'
    //         let tempObj = {}
    //         const daialogNo = title + '_' + frameNo
    //         tempObj[frameNo] = {}
    //         tempObj[frameNo][title] = changedHeaderInput[title]
    //         // await axios.post('/api/' + type )
    //         dispatch(actQuery(frameNo, type, title, e.target.value))
    //         dispatch(actSubmit(tempObj))
    //         dispatch(actSetFilter(frameNo, title, e.target.value))
    //         dispatch(onDialogOpen(true, daialogNo))
    //     }
    // }
    // const funcsObj = {
    //     onSetClose : onSetClose,
    //     onRecordToDB : onRecordToDB,
    //     headerInputChanged : onQueryheaderInputChange,
    //     onKeyPressOnInput : onQueryHeaderKeyPress
    // }
    // return funcsObj
}


    //다이얼로그 관련
    const opened    = useSelector(state => state.dialogs.opened)
    const checkOpened = (title) => {
        let result = ''
        opened.map(array => {
            if (array.type == title){
                result = array.ox
            }
        })
        return result
    }
    
    const DialogsAttr = {
      supplier : {
        title : 'supplier_' + frameNo,
        maxWidth : 'xl' ,
        funcs : queryHeaderfuncs(),
        open : checkOpened('supplier_' + frameNo),
        table : {
            tableButton : [
                {
                    title : 'insert',
                    type  : 'select',
                    func : function(frameNo, reqNo, selected){
                      //inser버튼 클릭됐을 때 실행할 명령
                      dispatch(actSelect(frameNo, reqNo, selected))
                    },
                    mother : containerNo
                },
            ],
            setFindOneResult : setFoundResult,
            frameNo : 'supplier_' + frameNo,
            initialFilter : filter ? filter.supplier : '',
            directQuery : true
        },
      }
    }


  // const reqWhere = () =>{
  //   let tempObj = {}
  //   tempObj[reqKey] = reqCode
  //   return tempObj
  // }

  // const getRawData = async () => {
  //   await axios.post('/api/' + dataType + '/query', reqWhere()).then(res => {

  //       // setPrimaryKey(res.data.primaryKey)
  //       // setIncludingKeys(res.data.includingKeys)
  //       // setTableRawData(withoutIncludingKeys(res.data.vals))
  //       // setFindingKeys(res.data.findingKeys)
  //   })
  // }
  // useEffect(() => {
  //     getRawData()
  // },[])

  // const onChangeValue = (event, func) => {
  //   setState(event.target.value)
  //   let temp = {}
  //   let tempArr = fixedData
  //   console.log(event.target.value)
  //   temp[title] = event.target.value
  //   setFixedData(
  //     produce(fixedData, draft => {
  //       console.log(fixedData)
  //       fixedData[title] = event.target.value
  //     })
  //   )
  // }
  // const onKeyPressInput = (event) => {
  //   if (event.key == "Enter") {
  //     let temp = {}
  //     let tempArr = fixedData
  //     temp[title] = event.target.value
  //     setFixedData(
  //       produce(fixedData, draft => {
  //         fixedData[title] = event.target.value
  //       })
  //     )
  //   }
  // }
  const [reqNo, setReqNo] = useState(null)

  const openDialog = (type, info) => {
    setReqNo(generateRandom())
    dispatch(onDialogOpen(true, type, info))
  }
  
  return (
    <React.Fragment>
      두두두
      <Button onClick = {() => {openDialog(DialogsAttr.supplier.title)}}>클릭</Button>
      <DialogST attr = {DialogsAttr.supplier} motherNo = {frameNo} motherType = {type}>
        <Supplier
          motherType          = {type}
          motherNo            = {frameNo}
          reqNo               = {reqNo}
          subTableAttr        = {DialogsAttr.supplier.table}
        ></Supplier>
      </DialogST>

    </React.Fragment>
  )
}


export default QueryInput
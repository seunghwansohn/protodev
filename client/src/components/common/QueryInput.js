import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import TextField                  from '@material-ui/core/TextField'

import SupplierList from '../../containers/SupplierList'


import DialogST             from './dialogs/DialogST'

import {generateRandom}     from '../../lib/common';

import { onDialogOpen, 
  onDialogClose }           from '../../modules/dialogs'
import { actSelect }        from '../../modules/query'
import {actSetReqNo}        from '../../modules/query'

import styled   from 'styled-components';

const TextFieldST = styled(TextField)`
  background-color: 
    ${props => {
      if (props.isSelected == true) {
        return '#ffffff'
      } else { 
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
  reqType,
  addedNo,
  selectedVal,
  dialog,
  helperText,
  
}) => {
  const dispatch = useDispatch()

  
  //개체 기본 속성
  const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
  const [currentNo, setCurrentNo]  = useState(generateRandom())

  const type = 'selectQuery'
  const containerNo = type + '_' + frameNo
  const dataType = dialog

  // console.log('현Comp는 (', type, ', ', frameNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')


  //쿼리헤더관련
  const [foundResult, 
    setFoundResult]                       = useState({});

  const [changedHeaderInput, 
      setChangedHeaderInput]              = useState({});
      
  const querySelected     = useSelector(state => state.quote.selected)
  const queryVars         = useSelector(state => state.query[frameNo])


  const {filter} = queryVars ? queryVars : ''

  const [client, setClient]               = useState('');
  const [clientRate, setClientRate]       = useState('');

  //다이얼로그 관련
  const opened    = useSelector(state => state.dialogs.opened)
  const checkOpened = (title) => {
      let result = ''
      opened.map(obj => {
        if(obj.frameNo == frameNo && obj.currentNo == currentNo && obj.type == type) {
          console.log('일치함')
          result = obj.open
        }
      })
      return result
  }
  const DialogsAttr = {
    supplier : {
      title : 'supplier_' + frameNo,
      maxWidth : 'xl' ,
      open : checkOpened('supplier_' + frameNo),
      table : {
        tableButton : [
          {
            title : 'insert',
            type  : 'select',
            func : function(selected){
              //inser버튼 클릭됐을 때 실행할 명령
              console.log(selected)
              let tempObj = {frameNo : frameNo, currentNo : motherNo, type : type, open : false}

              dispatch(actSelect(frameNo, reqType, addedNo, selected))
              dispatch(onDialogClose(tempObj))
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


  const selected          = useSelector(state => state.query[frameNo])
  const [isSelected, 
    setIsSelected]        = useState(false);
  const [inputVal, setInputVal]              = useState('');
  const handleChangeInput = (event) => {
    setInputVal(event.target.value)
  }
  useEffect(() => {
    if (selected !== undefined) {
      setInputVal(selectedVal)
    }
  },[selected])

  
  const onKeyPressOnInput = (event) => {
    setInputVal(event.target.value)
    if(event.key == "Enter") {
      console.log("엔터눌러짐")
      let tempObj = {frameNo : frameNo, currentNo : currentNo, type : type, open : true, dataType : dataType, clickType : type}

      dispatch(onDialogOpen(tempObj))
    }
  }


  return (
    <React.Fragment>
      <TextFieldST 
        onChange    = {(event) => handleChangeInput(event)} 
        onKeyPress  = {(event) => onKeyPressOnInput(event)}
        value       = {inputVal} 
        isSelected  = {isSelected}
        helperText  = {helperText}
      />
      <DialogST attr = {DialogsAttr.supplier} frameNo = {frameNo} motherNo = {frameNo} motherType = {type}>
        <SupplierList
          motherType          = {type}
          motherNo            = {frameNo}
          subTableAttr        = {DialogsAttr.supplier.table}
        ></SupplierList>
      </DialogST>

    </React.Fragment>
  )
}


export default QueryInput
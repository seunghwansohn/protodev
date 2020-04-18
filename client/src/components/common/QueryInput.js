import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import TextField                  from '@material-ui/core/TextField'

import SupplierList from '../../containers/SupplierList'
import MakerList from '../../containers/MakerList'


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
  motherFrameNo,
  motherType,

  reqType,
  dataType,
  codeNName,

  addedNo,
  selectedVal,
  label
}) => {
  const dispatch = useDispatch()

  
  //개체 기본 속성
  const [frameNo, setFrameNo]  = useState(motherFrameNo ? motherFrameNo : generateRandom())
  const [currentNo, setCurrentNo]  = useState(generateRandom())


  const type = 'selectQuery'

  console.log('프레임넘버는 ', frameNo, ' 현Comp는 (', type, ', ', currentNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')

  const containerNo = type + '_' + frameNo

  
  
  //finding code와 Name 생성
  const getFirstKey = (obj) => {
    let matchedKey = ''
    Object.keys(obj).map(key => {
      if (key) {
        matchedKey = key
      }
    })
    return matchedKey
  }
  const getFirstVal = (obj) => {
    let matchedVal = ''
    Object.keys(obj).map(key => {
      if (key) {
        matchedVal = obj[key]
      }
    })
    return matchedVal
  }
  const [queryCode, setQueryCode] = useState(codeNName ? getFirstKey(codeNName) : '')
  const [queryName, setQueryName] = useState(codeNName ? getFirstVal(codeNName) : '')





  //쿼리헤더관련
  const [foundResult, 
    setFoundResult]               = useState({});
  const [queryVals, setQueryVals] = useState({})
  const querySelected     = useSelector(state => state.quote.selected)

  const {filter} = queryVals ? queryVals : ''


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

  const getQeuryVal = () => {
    opened.map(obj => {
      if(obj.frameNo == frameNo && obj.currentNo == currentNo) {
        setQueryVals(obj)
      }
    })
  }
  useEffect(()=> {
    getQeuryVal()
  },[opened])


  //findOneResult(검색 결과값 하나일 때) 기능
  const handleFindOneResult = (obj) => {
    setInputVal(obj[queryName])
    let tempObj = {frameNo : frameNo, currentNo : currentNo, type : type, open : false}
    dispatch(onDialogClose(tempObj))
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
              let tempObj = {frameNo : frameNo, currentNo : motherNo, type : type, open : false}

              dispatch(actSelect(frameNo, reqType, addedNo, selected))
              dispatch(onDialogClose(tempObj))
            },
            mother : containerNo
          },
        ],
        setFindOneResult : handleFindOneResult,
        frameNo : 'supplier_' + frameNo,
        initialFilter : filter ? filter : '',
        directQuery : true
      },
    },
    maker : {
      title : 'maker' + frameNo,
      maxWidth : 'xl' ,
      open : checkOpened('maker' + frameNo),
      table : {
        tableButton : [
          {
            title : 'insert',
            type  : 'select',
            func : function(selected){
              //inser버튼 클릭됐을 때 실행할 명령
              let tempObj = {frameNo : frameNo, currentNo : motherNo, type : type, open : false}

              dispatch(actSelect(frameNo, reqType, addedNo, selected))
              dispatch(onDialogClose(tempObj))
            },
            mother : containerNo
          },
        ],
        setFindOneResult : handleFindOneResult,
        frameNo : 'maker' + frameNo,
        initialFilter : filter ? filter : '',
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
      let tempObj = {frameNo : frameNo, currentNo : currentNo, type : type, open : true, dataType : dataType, clickType : type, filter : inputVal}
      dispatch(onDialogOpen(tempObj))
    }
  }


  return (
    <React.Fragment>
      <TextFieldST 
        label       = {label}
        InputLabelProps={{
          shrink: true,
        }}
        onChange    = {(event) => handleChangeInput(event)} 
        onKeyPress  = {(event) => onKeyPressOnInput(event)}
        value       = {inputVal} 
        isSelected  = {isSelected}
        style       = {{width : '100%'}}
      />
      <DialogST attr = {DialogsAttr.supplier} motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {type}>
        <SupplierList
          motherType          = {type}
          motherFrameNo       = {frameNo}
          motherNo            = {currentNo}
          subTableAttr        = {DialogsAttr.supplier.table}
        ></SupplierList>
      </DialogST>
      <DialogST attr = {DialogsAttr.maker} motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {type}>
        <MakerList
          motherType          = {type}
          motherFrameNo       = {frameNo}
          motherNo            = {currentNo}
          subTableAttr        = {DialogsAttr.maker.table}
        ></MakerList>
      </DialogST>

    </React.Fragment>
  )
}


export default QueryInput
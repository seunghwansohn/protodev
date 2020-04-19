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

import InputAdornment from '@material-ui/core/InputAdornment';
import SmallKeyPopUp          from './SmallKeyPopUp';

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


  const currentType = 'selectQuery'

  console.log('프레임넘버는 ', frameNo, ' 현Comp는 (', currentType, ', ', currentNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')

  const containerNo = currentType + '_' + frameNo

  
  console.log(label)
  
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
  const dialogOpened    = useSelector(state => state.dialogs.opened)
  const checkOpened = (type) => {
    console.log(type)
    let result = ''
    dialogOpened.map(obj => {
      console.log(obj)
      console.log('프레임넘버는 ', frameNo)
      console.log('커런트넘버는 ', currentNo)
      console.log('커런트타입은 ', currentType)
      console.log('마더넘버는 ', motherNo)
      console.log('마더타입은 ', motherType)

      if (
        obj.frameNo     == frameNo && 
        obj.currentNo   == currentNo && 
        obj.currentType == currentType && 
        obj.motherNo    == motherNo &&
        obj.motherType  == motherType &&
        obj.clickedType == type 
      ) {
        result = true
        console.log(result)
      }
    })
    return result
  }

  const getQeuryVal = () => {
    dialogOpened.map(obj => {
      if(obj.frameNo == frameNo && obj.currentNo == currentNo) {
        setQueryVals(obj)
      }
    })
  }
  useEffect(()=> {
    getQeuryVal()
  },[dialogOpened])


  //findOneResult(검색 결과값 하나일 때) 기능
  const handleFindOneResult = (obj) => {
    setInputVal(obj[queryName])
    let tempObj = {
      frameNo : frameNo, 
      currentNo : motherNo, 
      currentType : motherType, 
      // clickedType : dialogType,
    }
    dispatch(onDialogClose(tempObj))
  }


  const DialogsAttr = {
    supplier : {
      title : 'supplier_' + frameNo,
      dialogType : 'supplierQuery',
      maxWidth : 'xl' ,
      open : checkOpened('supplierQuery'),
      table : {
        tableButton : [
          {
            title : 'insert',
            type  : 'select',
            func : function(selected){
              //inser버튼 클릭됐을 때 실행할 명령
              let tempObj = {
                frameNo : frameNo, 
                currentNo : currentNo, 
                currentType : currentType, 
                clickedType : 'supplierQuery',
              }

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
      dialogType : 'makerQuery',
      maxWidth : 'xl' ,
      open : checkOpened('makerQuery'),
      table : {
        tableButton : [
          {
            title : 'insert',
            type  : 'select',
            func : function(selected){
              //inser버튼 클릭됐을 때 실행할 명령
              let tempObj = {
                frameNo : frameNo, 
                currentNo : currentNo, 
                currentType : currentType, 
                clickedType : 'makaerQuery',
              }
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
      console.log('엔터눌림')
      let tempObj = {
        frameNo : frameNo,
        currentNo : currentNo,
        currentType : currentType, 
        motherNo : motherNo, 
        motherType : motherType,

        clickedHeader : '',
        clickedIndex : '',
        clickedVal : '',
        clickedType : DialogsAttr[label].dialogType,
        clickedPrimaryCode : '',

        dataType : dataType, 
        initialFilter : '',
      }
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
        InputProps = {{
          endAdornment : <InputAdornment position="end"><SmallKeyPopUp>Find</SmallKeyPopUp></InputAdornment>
        }}
      />
      <DialogST attr = {DialogsAttr.supplier} motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {currentType}>
        <SupplierList
          motherType          = {currentType}
          motherFrameNo       = {frameNo}
          motherNo            = {currentNo}
          subTableAttr        = {DialogsAttr.supplier.table}
        ></SupplierList>
      </DialogST>
      <DialogST attr = {DialogsAttr.maker} motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {currentType}>
        <MakerList
          motherType          = {currentType}
          motherFrameNo       = {frameNo}
          motherNo            = {currentNo}
          subTableAttr        = {DialogsAttr.maker.table}
        ></MakerList>
      </DialogST>

    </React.Fragment>
  )
}


export default QueryInput
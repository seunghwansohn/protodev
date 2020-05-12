import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import TextField                  from '@material-ui/core/TextField'

import SupplierList from '../../containers/SupplierList'
import MakerList    from '../../containers/MakerList'
import ProjectList  from '../../containers/ProjectList'


import DialogST             from './dialogs/DialogST'

import {generateRandom}     from '../../lib/common';

import { actDialogOpen, 
  actDialogClose }           from '../../modules/dialogs'
import { actSelect }        from '../../modules/query'
import {actSetReqNo}        from '../../modules/query'

import InputAdornment from '@material-ui/core/InputAdornment';
import SmallKeyPopUp          from './SmallKeyPopUp';

import SearchIcon from '@material-ui/icons/Search';

import produce  from 'immer'

import styled   from 'styled-components';

const TextFieldST = styled(TextField)`
  background-color: 
    ${props => {
      if (props.validation == true) {
        return '#1fffff'
      } else { 
        return '#ffe6ff'}}};
  border: 4px dotted blue;

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
  primaryKey,

  addedNo,
  label,
  initialValue,
  filteredData,
  fixedVals,
  setFixedVals,
  addedNew,
  setAddedNew
}) => {
  const dispatch = useDispatch()


  //개체 기본 속성
  const [frameNo, setFrameNo]  = useState(motherFrameNo ? motherFrameNo : generateRandom())
  const [currentNo, setCurrentNo]  = useState(generateRandom())

  const currentType = 'selectQuery'
  const containerNo = currentType + '_' + frameNo

  console.log('프레임넘버는 ', frameNo, ' 현Comp는 (', currentType, ', ', currentNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')

  
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



  //검색 및 foundOneResult 관련
  const [foundResult, 
    setFoundResult]               = useState({});
  const [queryVals, setQueryVals] = useState({})
  const querySelected             = useSelector(state => state.quote.selected)
  const {filter} = queryVals ? queryVals : ''
  //findOneResult(검색 결과값 하나일 때) 기능
  const handleFindOneResult = (obj) => {
    setInputVal(obj[queryName])
    let tempObj = {
      frameNo : frameNo, 
      currentNo : motherNo, 
      currentType : motherType, 
      // clickedType : dialogType,
    }
    dispatch(actDialogClose(tempObj))
  }



  //다이얼로그 관련
  const dialogOpened    = useSelector(state => state.dialogs.opened)
  const checkOpened = (type) => {
    let result = ''
    dialogOpened.map(obj => {
      // console.log(obj)
      // console.log('프레임넘버는 ', frameNo)
      // console.log('커런트넘버는 ', currentNo)
      // console.log('커런트타입은 ', currentType)
      // console.log('마더넘버는 ', motherNo)
      // console.log('마더타입은 ', motherType)

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

  const getQueryVal = () => {
    dialogOpened.map(obj => {
      if(obj.frameNo == frameNo && obj.currentNo == currentNo) {
        setQueryVals(obj)
      }
    })
  }
  useEffect(()=> {
    getQueryVal()
  },[dialogOpened])


  const [selectedVal, setSelectedVal] = useState(initialValue ? initialValue : '')

  const setInputSelect = (selected, clickedType) => {
    setInputVal(selected.value[queryName])
    setSelectedVal (selected.value[queryName])
    setIsSelected(true)
    dispatch(actSelect(frameNo, reqType, addedNo, selected))

    let temp1 = {}
    temp1.ref = {}
    temp1.vals = {}
    temp1.location = {index : addedNo, header : queryName}
    temp1.ref[primaryKey] = filteredData[addedNo][primaryKey]
    temp1.vals[queryCode] = selected.value[queryName]


    if (reqType == 'fixSelect') {
      setFixedVals(
        produce(fixedVals, draft => {
          draft.push(temp1)
        })
      )
    } else if (reqType == 'newAdded'){
    }

    let tempObj = {
      frameNo : frameNo, 
      currentNo : currentNo, 
      currentType : currentType, 
      clickedType : clickedType,
    }
    dispatch(actDialogClose(tempObj))
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
              let clickedType = 'supplierQuery'
              setInputSelect(selected, clickedType)
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
              let clickedType = 'makerQuery'
              setInputSelect(selected, clickedType)
            },
            mother : containerNo
          },
        ],
        setFindOneResult : handleFindOneResult,
        frameNo : 'maker' + frameNo,
        initialFilter : filter ? filter : '',
        directQuery : true
      },
    },
    project : {
      title : 'project' + frameNo,
      dialogType : 'projectQuery',
      maxWidth : 'xl' ,
      open : checkOpened('projectQuery'),
      table : {
        tableButton : [
          {
            title : 'insert',
            type  : 'select',
            func : function(selected){
              //inser버튼 클릭됐을 때 실행할 명령
              let clickedType = 'projectQuery'
              setInputSelect(selected, clickedType)
            },
            mother : containerNo
          },
        ],
        setFindOneResult : handleFindOneResult,
        frameNo : 'project' + frameNo,
        initialFilter : filter ? filter : '',
        directQuery : true,
        dataType : 'project'
      },
    }
  }


  const selected          = useSelector(state => state.query[frameNo])
  const [isSelected, 
    setIsSelected]        = useState(false);
  const [inputVal, setInputVal]              = useState(initialValue ? initialValue : '');
  const handleChangeInput = (event) => {
    setInputVal(event.target.value)
  }

  
  const onKeyPressOnInput = (event) => {
    setInputVal(event.target.value)
    if(event.key == "Enter") {
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
      dispatch(actDialogOpen(tempObj))
    }
  }

  const isShowLabel = () => {
    let ox = true
    if (reqType == 'fixSelect') {
      ox = false
    }
    return ox
  }

  const isDiffrentFromSelected = () => {
    let ox = false
    if (selectedVal !== inputVal) {
      ox = true
    }
    return ox
  }

  const isValidated = () => {
    let ox = false
    if (!isDiffrentFromSelected()) {
      ox = true
    }
    return ox
  }

  return (
    <React.Fragment>
      <TextFieldST 
        label       = {isShowLabel() ? label : null}
        InputLabelProps={{
          shrink: true,
        }}
        onChange    = {(event) => handleChangeInput(event)} 
        onKeyPress  = {(event) => onKeyPressOnInput(event)}
        value       = {inputVal} 
        isSelected  = {isSelected}
        validation  = {isValidated()}
        style       = {{width : '100%'}}
        InputProps = {{
          endAdornment : <InputAdornment position="end"><SearchIcon fontSize = {'small'}></SearchIcon></InputAdornment>
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
      <DialogST attr = {DialogsAttr.project} motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {currentType}>
        <ProjectList
          motherType          = {currentType}
          motherFrameNo       = {frameNo}
          motherNo            = {currentNo}
          subTableAttr        = {DialogsAttr.project.table}
        ></ProjectList>
      </DialogST>

    </React.Fragment>
  )
}


export default QueryInput
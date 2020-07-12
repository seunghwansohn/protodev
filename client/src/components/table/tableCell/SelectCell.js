import React, {useEffect, useState} from 'react';

import styled   from "styled-components";

import TextField        from '@material-ui/core/TextField';
import InputAdornment   from '@material-ui/core/InputAdornment';

import TableCell        from '@material-ui/core/TableCell';

import STSelect               from '../../input/STSelect';

import axios                from '../../../lib/api/axios'

import produce  from 'immer'

const MiniHelperText = styled(TextField)`
  .MuiInput-root	 {
    font-size : 13px;
  }
  .MuiFormHelperText-root {
    font-size : 7px;
    color : red;
    width : 100%;
  }
`
const colors = {
  fixable : '#fff4e2',
  unFixable : '#D3D3D3',
  fixed : '#FF7F50'
}

const StyledTableCell = styled(TableCell)`
  background-color: ${
    props => props.fixMode ? 
      props.fixable ? 
        props.fixed ?
          colors.fixed
        : colors.fixable
      : colors.unFixable 
    : '#ffffff'
  };
  border-style : ${props => props.updated ? 'ridge':'none'};
  &:hover {
    font-weight: bold;
  }
  max-width : ${props => props.size};
  width : ${props => props.size};
`

const SelectCell = ({
  key,
  attr,
}) => {
  const {
    fixMode,
    fixed,
    size,
    fixable,
    header,
    index,
    options,
    colAttr,
    data,
    setData,
    primaryKey,
    checkValid,
    getPrimaryCode,
    fixedVals,
    setFixedVals,
    tempFixedVal,
    setTempFixedVal,
    setUpdateHelperTexts,
    updateHelperTexts,
    setUpdateValidationError,
    updateValidationError,
    confirmInputFixedVal

  } = attr

  //초기 selectOptions(메뉴들) 설정
  const [selectOptions, setSelectOptions] = useState({})
  useEffect(() => {
    let colAttrKeys = Object.keys(colAttr)
    colAttrKeys.map(async key => {
      let type = await colAttr[key].type ? colAttr[key].type : ''
      if (type == 'select') {
        // console.log(type)
        let dataType = await colAttr[key].dataType
        await axios.get('/api/' + dataType + '/load').then(res => {
          let tempOptionsArr = []
          let tempNamesArr = []
          let vals = res.data.vals
          let code = colAttr[key].code
          let name = colAttr[key].name
          vals.map(obj => {
            let tempObj = {}
            tempObj.value = obj[code]
            tempObj.label = obj[name]
            tempOptionsArr.push(tempObj)
          })
          setSelectOptions(
            produce(selectOptions, draft => {
              draft[key] = tempOptionsArr
            })
          )
        })
      }
    })
  },[])


  //selectType 관련
  const [selectedVal, setSelectedVal]     = useState('')
  const [selectedLabel, setSelectedLabel]     = useState('')

  const [selectMenuOpened, 
    setSelectMenuOpened]                  = useState([])

  const handleClickSelect = (event, index, header) => {
    const attrs = Object.keys(colAttr)
    const attr  = attrs[header]

    console.log(event, index, header)

    const {value, label} = event

    setSelectedVal(value)
    setSelectedLabel(label)

    setData(
      produce(data, draft => {
        draft[index][header] = label
      })
    )
    let temp1 = {}
    temp1.ref = {}
    temp1.vals = {}
    temp1.location = {index : index, header, header}
    temp1.ref[primaryKey] = data[index][primaryKey]
    console.log(colAttr)
    temp1.vals[colAttr[header].code] = value
    console.log(temp1)
    setTempFixedVal(temp1)
    setFixedVals(
      produce(fixedVals, draft => {
        draft.push(temp1)
      })
    )
  }

  return (
    <>
      <StyledTableCell 
        fixMode = {fixMode} 
        fixed = {fixed} 
        size = {size} 
        fixable = {fixable}
      >
        <STSelect
          key = {'select' + index}
          onChangeVal = {(obj) => {handleClickSelect(obj, index, header)}}
          options={selectOptions.sortName}
          attr = {colAttr[header]}
        />
      </StyledTableCell>
    </>
  )
}

export default SelectCell
import React, {useEffect, useState} from 'react';

import styled   from "styled-components";

import TextField        from '@material-ui/core/TextField';
import InputAdornment   from '@material-ui/core/InputAdornment';

import TableCell        from '@material-ui/core/TableCell';

import Chip             from '@material-ui/core/Chip';

import {monolizeObj}    from '../../../lib/funcs/fSequelize'


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

const SingleNoteCell = ({
  key,
  attr,
}) => {
  const {
    motherNo,
    motherType,
    frameNo,
    currentNo,
    currentType,

    colAttr,

    fixable,

    header,
    index,
    data,

    dialogOpened,
    setDialogInfo,
    onDialogOpen,

    onTableChip,
    includingManyKeys,

  } = attr

    //clickedChip
    const [clickedChip, 
      setClickedChip]     = useState({});
    useEffect(() => {
      if (Object.keys(clickedChip).length > 0) {
        onTableChip(clickedChip)
      } 
    },[clickedChip])
    const onClickChip = (idxRow, index, header) => {
      const value = data[idxRow][header][index][includingManyKeys[header][0]]
      const originalObj = data[idxRow][header][index]
      const monolizedObj = monolizeObj(originalObj)
      let tempObj2 = {}
      tempObj2.value  = value
      tempObj2.row    = idxRow
      tempObj2.header = header
      tempObj2.index  = index
      tempObj2.dataType = colAttr[header].dataType
      tempObj2.clickType = colAttr[header].clickType
      tempObj2.queryType = colAttr[header].queryType
      tempObj2.primaryKey = colAttr[header].primaryKey
      tempObj2.primaryCode = monolizedObj[colAttr[header].primaryKey]
      setClickedChip(tempObj2)
    }
    useEffect(() => {
      let keys = Object.keys(clickedChip)
      const {colAttr} = attr
      const colAttrKeys = Object.keys(colAttr)
      const {header, row, value, dataType, primaryCode, queryType} = clickedChip
      const {clickType, primaryKey} = attr.colAttr[header] ? attr.colAttr[header] : ''
      if (keys.length > 0) {
        let aColAttr = attr.colAttr[clickedChip.header]
        let {clickType, dataType} = aColAttr
        let queryType = ''
        colAttrKeys.map(key => {
          if (key == header) {
            queryType = colAttr[key].queryType
          }
        })
        let tempObj = {
          frameNo     : frameNo,
          currentNo   : currentNo,
          currentType : currentType, 
          motherNo    : motherNo, 
          motherType  : motherType,
  
          clickedHeader       : colAttr[header].name,
          clickedIndex        : row,
          clickedVal          : value,
          clickedType         : queryType,
          clickedPrimaryCode  : primaryCode,
          primaryKey : primaryKey,
  
          dataType      : dataType, 
          initialFilter : '',
        }
        onDialogOpen(tempObj)
      }
      dialogOpened.map(obj => {
        if(obj.frameNo == frameNo && obj.currentNo == currentNo) {
          setDialogInfo(obj)
        }
      })
    },[clickedChip])

  return (
    <StyledTableCell fixable = {fixable}>
      {
        data[index][header].map((obj, idxChip) => {
        return(
          <Chip 
            label = {obj[includingManyKeys[header][0]]}
            onClick = {(e) => {onClickChip(idxChip, index, header)}}
          />
        )
        })
      }
    </StyledTableCell>
  )
}

export default SingleNoteCell
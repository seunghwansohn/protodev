import React, {useEffect, useState} from 'react';

import styled   from "styled-components";

import TextField        from '@material-ui/core/TextField';
import InputAdornment   from '@material-ui/core/InputAdornment';

import TableCell        from '@material-ui/core/TableCell';

import Chip             from '@material-ui/core/Chip';

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
    fixMode,
    fixed,
    size,
    fixable,
    header,
    data,
    index,
    handleChangeInput,
    confirmInputFixedVal,
    onClickChip,
    includingManyKeys,
  } = attr
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
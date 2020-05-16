import React, {useEffect, useState}    from 'react'
import { useSelector, useDispatch }    from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Grid           from '@material-ui/core/Grid';
import FormControl    from '@material-ui/core/FormControl';

import Input          from '@material-ui/core/Input';
import InputLabel     from '@material-ui/core/InputLabel';

import Button         from '@material-ui/core/Button';

import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableContainer   from '@material-ui/core/TableContainer';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';
import TablePagination  from '@material-ui/core/TablePagination';

import DropZoneGallery  from './DropZoneGallery';
import PopQuestionDlg   from '../common/dialogs/PopQuestionDlg';
import MarginDivider    from './design/MarginDivider'

import {setAddNotes, setUpdated}                from '../../modules/common';

import {convertSeqDateTime}                     from '../../lib/deSequelize';
import {generateRandom}                         from '../../lib/common';
import axios                                    from '../../lib/api/axios';

import produce                                  from 'immer'

import styled   from "styled-components";

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    fieldItem: {
      padding: theme.spacing(0.5),
      textAlign: 'left',
      display: 'flex',
      backgroundColor: '#ebf2f5'
    },
}));

const StyledInput = styled(Input)`
  background-color: ${
    props => props.confirmed ?
      '#eef534'
      :
      ''
  };
  .MuiInputBase-input {
    padding : '0px';
  }
  .MuiInput-root	 {
    padding : '0px';
  }
`

const StyledTableContainer = styled(TableContainer)`
  .MuiTableCell-root {
    padding : 5px;
  }
`

const StyledTableHead = styled(TableHead)`
  background : rgba(255, 255, 204, 0.9);
  font-size : 20px;
  .MuiTableCell-root {
    font-size : 1.2rem;
    text-align : center;
    font-weight : bold;

  }
`

const StyledTableBody = styled(TableBody)`
  background : rgba(255, 255, 204, 0.3);
  font-size : 20px;
  .MuiTableCell-root {
    font-size : 0.875rem;
    text-align : left;
  }
`

const StyledDiv = styled.div`
  padding : 10px;
  padding-bottom: 20px;
`



let Notes = (
  {
    motherFrameNo, 
    motherType,
    motherNo,

    dataType,
    type,

    primaryCode, 
    primaryKey,

    fixMode,
    attachedFiles
  }) => {

    const classes     = useStyles();
    const dispatch    = useDispatch();

    //개체 기본 속성
    const [frameNo, setFrameNo]  = useState(motherFrameNo ? motherFrameNo : generateRandom())
    const [currentNo, setCurrentNo]  = useState(generateRandom())
  
    const currentType = motherType + 'Table'
    const containerNo = currentType + '_' + frameNo
  
    const debugMode   = useSelector(state => state.common.debugMode)
    const { user }    = useSelector(({ user }) => ({ user: user.user }));


    const [randomNo, setRandomNo]         = useState(Math.floor(Math.random() * 10) + 1);
    useEffect(() => {
      setRandomNo(generateRandom())
    },[])



    //기존 노트 로드
    const [existNotes, setExistNotes]     = useState([]);
    const loadNotes = () => {
      if (primaryCode) {
        axios.get('/api/' + type + '/notes/load/' + primaryCode).then(res => {
          setExistNotes(res.data)
        })
      }
    }
    useEffect(() => {
      loadNotes()
    },[primaryCode])
    

    //newNotes 부분 초기화 및 노트 입력시 다음 노트 자동 추가
    const [newNotesArr, setNewNotesArr]   = useState(['']);
    useEffect(() => {
      const arrLength = newNotesArr.length
      if (newNotesArr[arrLength -1].length == 1) {
        setNewNotesArr(
          produce(newNotesArr, draft => {
            draft.push('')
          })
        );
        setConfirmedNewNotes(
          produce(confirmedNewNotes, draft => {
            draft.push('$$$')
          })
        );
      }
    },[newNotesArr[newNotesArr.length - 1]])

    //newNotes 입력 부분
    const handleArrChange = (e, index) => {
      setNewNotesArr(
        produce(newNotesArr, draft => {
          draft[index] = e.target.value
        })
      );
    };

    //newNotes에서 노트 한개 삭제 기능
    const [deletedJustNow, 
      setDeletedJustNow]                  = useState(false);
    const onDeleteNewNote = (i) => {
      const filteredArr = newNotesArr.filter((val, index) => {
          return index !== i
      })
      setNewNotesArr(filteredArr)
    }



    //업데이트 시 처리 기능
    const { update }  = useSelector(({ common }) => ({ update : common.update }));
    useEffect(() => {
      if (update[type+randomNo]) {
        const typeRandomNumbered = type + randomNo
        loadNotes()
        dispatch(setUpdated({type : typeRandomNumbered, ox : false}))
        setNewNotesArr([''])
      }
    },[update])



    //입력한 newNotes값 enter쳐서 임시 확정 기능
    const [confirmedNewNotes, 
      setConfirmedNewNotes]               = useState(['$$$']);
    const isConfirmed = (index) =>{
      let ox = false
      if (newNotesArr[index] == confirmedNewNotes[index]) {
        ox = true
      }
      return ox
    }
    const handleNewKeyPress = (e, index) => {
      if (e.key =='Enter'){
        let arrLength     = newNotesArr.length
        let strNowLength  = newNotesArr[index].length
        let strLastLength = newNotesArr[arrLength - 1].length
        let isVacantNow   = strNowLength > 0 ? false : true
        let isVacantLast  = strLastLength > 0 ? false : true
        let isLastNow     = (arrLength -1) == index ? true : false
        setConfirmedNewNotes(
          produce(confirmedNewNotes, draft => {
            draft[index] = e.target.value
          })
        );
      }
    }



    //입력된 new노트 api로 제출
    const onSubmit = async () => {
      let filteredConfirmedArr = await confirmedNewNotes.filter(function (el) {
        return el !== '$$$'
      })
      let filteredtempArr = await newNotesArr.filter(function (el) {
        return el !== ''
      })

      if (filteredConfirmedArr.length == filteredtempArr.length) {
        await filteredConfirmedArr.map(note => {
          if (note !== null && note !== undefined && note !== [] && note !== '') {
            dispatch(setAddNotes({type, primaryCode, note, randomNo}))
          } else {
            console.log('눌값존재')
          }
        })
      } else {
        console.log('확정된 값만 제출됩니다')
        setConfirmDlgOpen(!confirmDlgOpen)
      }
    }
    //입력한 노트 중에 미확정 된 상태로 submit되면 confirm 다이얼로그
    const [confirmDlgOpen, 
      setConfirmDlgOpen]                  = useState(false)
    const confirmSubmitDialogAttr = {
      question : 'only confiremd notes (yellow backgrounded) will be submitted. do you agree?',
      openState : confirmDlgOpen,
      setOpenState : setConfirmDlgOpen,
      // answer : howManyCopiedNew,
      // setAnswer : setAddCopiedNew
    }



    const ExistNotesTable = () => {
      return(
      <StyledDiv>
          <StyledTableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>
                    Notes
                  </TableCell>
                  <TableCell>
                    Date
                  </TableCell>
                </TableRow>
              </StyledTableHead>
              <StyledTableBody>
                {existNotes ? existNotes.map(noteObj => {
                  const yymmdd = convertSeqDateTime(noteObj.createdAt).yymmdd
                    return(
                      <TableRow>
                        <TableCell style = {{width : '100rem', margin : '0px', padding :'0px'}}>
                          {noteObj.note}
                        </TableCell>
                        <TableCell style = {{width : '0.5rem'}}>
                          {yymmdd}
                        </TableCell>
                      </TableRow>
                    )
                }) : ''}
              </StyledTableBody>
            </Table>
          </StyledTableContainer>

      </StyledDiv>
      )
    }

    return (
      <React.Fragment>
        <Grid container className = {classes.grid} spacing={0}>

          <ExistNotesTable></ExistNotesTable>

          {newNotesArr.map((val, index) => {
            let isConfirmedVal = isConfirmed(index)
            return (
            <>
              <Grid item xs = {11}>
                <FormControl key = {index} className = {classes.fieldItem}>
                  <InputLabel>{'notes ' + (index)}</InputLabel>
                  <StyledInput 
                    type = 'text' 
                    id={index} 
                    value={newNotesArr[index]} 
                    onChange={e => handleArrChange(e, index)}
                    onKeyDown = {e => handleNewKeyPress(e, index)}
                    confirmed = {isConfirmedVal}
                  />
                </FormControl>
              </Grid>
              <Grid item xs = {1}>
                <Button variant="contained"  id={index} color="primary" onClick = {() => onDeleteNewNote(index)}>
                  Delete
                </Button>
              </Grid>
            </>
            )
          })}
        </Grid>



        <Button variant="contained" color="primary" onClick = {onSubmit}>
            Submit
        </Button>
        <Button onClick = {loadNotes}>load</Button>

        <PopQuestionDlg
          attr = {confirmSubmitDialogAttr}
        ></PopQuestionDlg>

      </React.Fragment>
    )
  }

export default Notes
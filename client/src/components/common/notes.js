import React, {useEffect, useState}             from 'react'

import { useSelector, useDispatch }    from 'react-redux';

import { makeStyles }                           from '@material-ui/core/styles';
import Grid                                     from '@material-ui/core/Grid';
import FormControl                              from '@material-ui/core/FormControl';
import Input                                    from '@material-ui/core/Input';
import InputLabel                               from '@material-ui/core/InputLabel';
import Button                                   from '@material-ui/core/Button';
import Paper                                    from '@material-ui/core/Paper';

import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableContainer   from '@material-ui/core/TableContainer';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';
import TablePagination  from '@material-ui/core/TablePagination';


import PopQuestionDlg     from '../common/dialogs/PopQuestionDlg';


import MarginDivider from './design/MarginDivider'


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

const StyledDiv = styled.div`
  padding : 10px;
  padding-bottom: 20px;
`


// const StyledTableCell = styled(TableCell)`
//   background-color: ${
//     props => props.fixMode ? 
//       props.fixable ? 
//         props.fixed ?
//           colors.fixed
//         : colors.fixable
//       : colors.unFixable 
//     : '#ffffff'
//   };

//   border-style : ${props => props.updated ? 'ridge':'none'};
//   &:hover {
//     font-weight: bold;
//   }
//   max-width : ${props => props.size};
//   width : ${props => props.size};
// `


let Notes = props => {

    const classes     = useStyles();
    const dispatch    = useDispatch();
    
    const {type, primaryCode} = props

    const blankNotes  = [[]];

    const [newNotesArr, setNewNotesArr]       = React.useState(['']);
    const [confirmedNewNotes, 
      setConfirmedNewNotes]                      = React.useState(['$$$']);
    const [existNotes, setExistNotes]         = React.useState([]);
    const [title, setTitle]                   = React.useState('');
    const [deletedJustNow, setDeletedJustNow] = React.useState(false);
    const [randomNo, setRandomNo]             = React.useState(Math.floor(Math.random() * 10) + 1);

    const [confirmDlgOpen, setConfirmDlgOpen]           = useState(false)

    const { update } = useSelector(({ common }) => ({ update : common.update }));

    const loadNotes = () => {
      if (primaryCode) {
        axios.get('/api/' + type + '/notes/load/' + primaryCode).then(res => {
          setExistNotes(res.data)
        })
      }
    }

    const confirmSubmitDialogAttr = {
      question : 'only confiremd notes (yellow backgrounded) will be submitted. do you agree?',
      openState : confirmDlgOpen,
      setOpenState : setConfirmDlgOpen,
      // answer : howManyCopiedNew,
      // setAnswer : setAddCopiedNew
    }

    useEffect(() => {
      if (update[type+randomNo]) {
        const typeRandomNumbered = type + randomNo
        loadNotes()
        dispatch(setUpdated({type : typeRandomNumbered, ox : false}))
        setNewNotesArr([''])
      }
    },[update])

    useEffect(() => {
      setRandomNo(generateRandom())
    },[])


    const onDeleteNewNote = (i) => {
      const filteredArr = newNotesArr.filter((val, index) => {
          return index !== i
      })
      setNewNotesArr(filteredArr)
    }

    const handleArrChange = (e, index) => {
      setNewNotesArr(
        produce(newNotesArr, draft => {
          draft[index] = e.target.value
        })
      );
    };

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

    const isConfirmed = (index) =>{
      let ox = false
      if (newNotesArr[index] == confirmedNewNotes[index]) {
        ox = true
      }
      console.log(ox)
      return ox
    }

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

    useEffect(() => {
      loadNotes()
    },[primaryCode])

    //노트 입력시 다음 노트 자동 추가
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

    const ExistNotesTable = () => {
      return(
      <StyledDiv>
          <StyledTableContainer>
            <TableHead>
              <TableRow>
                <TableCell>
                  Notes
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
            </TableBody>
          </StyledTableContainer>

      </StyledDiv>
      )
    }

    return (
      <React.Fragment>
        {title}
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

        <MarginDivider 
          marginTop = '10px'
          marginBottom = '10px'
        />

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
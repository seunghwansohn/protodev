import React, {useEffect}             from 'react'

import { useSelector, useDispatch }    from 'react-redux';

import { makeStyles }             from '@material-ui/core/styles';
import Grid                       from '@material-ui/core/Grid';
import FormControl                from '@material-ui/core/FormControl';
import Input                      from '@material-ui/core/Input';
import InputLabel                 from '@material-ui/core/InputLabel';
import Button                     from '@material-ui/core/Button';
import Paper                      from '@material-ui/core/Paper';

import {setAddNotes, setUpdated}  from '../../modules/common';

import {convertSeqDateTime}       from '../../lib/deSequelize';
import {generateRandom}           from '../../lib/common';

import axios                      from '../../lib/api/axios';
import produce                    from 'immer'

import Dialog                     from '@material-ui/core/Dialog';
import NotesIcon                  from '@material-ui/icons/Notes';


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

let Notes = props => {

    const classes     = useStyles();
    const dispatch    = useDispatch();
    
    const {type, primaryCode} = props
    const [openedDialog, setOpenedDialog]   = React.useState(false)
    const handleCloseDialog = () => {
      setOpenedDialog(false)
    }
    const handleDialogOpen = () => {
      setOpenedDialog(true)
    }

    const blankNotes  = [[]];

    const [newNotesArr, setNewNotesArr]       = React.useState(['']);
    const [existNotes, setExistNotes]         = React.useState([]);
    const [title, setTitle]                   = React.useState('');
    const [deletedJustNow, setDeletedJustNow] = React.useState(false);
    const [randomNo, setRandomNo]             = React.useState(Math.floor(Math.random() * 10) + 1);

    const { update } = useSelector(({ common }) => ({ update : common.update }));

    const loadNotes = () => {
      if (primaryCode) {
        axios.get('/api/' + type + '/notes/load/' + primaryCode).then(res => {
          setExistNotes(res.data)
        })
      }
    }

    console.log(newNotesArr)
    useEffect(() => {
      if (update[type+randomNo]) {
        const typeRandomNumbered = type + randomNo
        loadNotes()
        dispatch(setUpdated({type : typeRandomNumbered, ox : false}))
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

    const onAddBlankNote = () => {
      setNewNotesArr([...newNotesArr,  [...blankNotes] ]);
    };

    const onSubmit = async () => {
      await newNotesArr.map(note => {
        if (note !== null && note !== undefined && note !== [] && note !== '') {
          dispatch(setAddNotes({type, primaryCode, note, randomNo}))
        } else {
          console.log('눌값존재')
        }
      })
    }

    useEffect(() => {
      loadNotes()
    },[primaryCode])

    useEffect(() => {
      const arrLength = newNotesArr.length
      if (newNotesArr[arrLength -1].length == 1) {
        setNewNotesArr(
          produce(newNotesArr, draft => {
            draft.push('')
          })
        );
      }
    },[newNotesArr[newNotesArr.length - 1]])

    const ExistNotesTable = () => {
      return(
      <React.Fragment>
          {existNotes ? existNotes.map(noteObj => {

            const yymmdd = convertSeqDateTime(noteObj.createdAt).yymmdd

            return(
            <Grid item xs = {12}>
              <Paper>
                  {noteObj.note}{yymmdd}
              </Paper>
            </Grid>
            )
          }) : ''}
      </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Button onClick = {handleDialogOpen}>
          <NotesIcon></NotesIcon>
        </Button>
        <Dialog 
          open = {openedDialog}
          onClose = {handleCloseDialog}
          maxWidth = 'md'
          fullWidth = 'lg'
        >
          {title}
          <Grid container className = {classes.grid} spacing={0}>
            {newNotesArr.map((val, index) => {
              return (
              <React.Fragment>
                <Grid item xs = {11}>
                  <FormControl key = {index} className = {classes.fieldItem}>
                    <InputLabel>{'notes ' + (index)}</InputLabel>
                    <Input type = 'text' id={index} value={newNotesArr[index]} onChange={e => handleArrChange(e, index)}/>
                  </FormControl>
                </Grid>
                <Grid item xs = {1}>
                  <Button variant="contained"  id={index} color="primary" onClick = {() => onDeleteNewNote(index)}>
                    Delete
                  </Button>
                </Grid>
              </React.Fragment>
              )
            })}

            <ExistNotesTable></ExistNotesTable>
          </Grid>
          <Button variant="contained" color="primary" onClick = {onSubmit}>
              Submit
          </Button>
          <Button onClick = {loadNotes}>load</Button>
        </Dialog>
      </React.Fragment>
    )
  }

export default Notes
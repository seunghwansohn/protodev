import React, {useState, useEffect}             from 'react'

import { connect, useSelector, useDispatch }    from 'react-redux';

import { makeStyles }                           from '@material-ui/core/styles';
import Grid                                     from '@material-ui/core/Grid';
import FormControl                              from '@material-ui/core/FormControl';
import Input                                    from '@material-ui/core/Input';
import InputLabel                               from '@material-ui/core/InputLabel';
import Button                                   from '@material-ui/core/Button';
import Paper                                    from '@material-ui/core/Paper';

import {setAddNotes, setUpdated}                from '../../modules/common';

import {convertSeqDateTime}                     from '../../lib/deSequelize';
import {generateRandom}                         from '../../lib/common';

import axios                                    from '../../lib/api/axios';
import produce                                  from 'immer'

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
    
    const {type, primaryKey, primaryCode} = props

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

    useEffect(() => {
      if (update[type+randomNo]) {
        const typeRandomNumbered = type + randomNo
        loadNotes()
        dispatch(setUpdated({type : typeRandomNumbered, ox : false}))
      }
    },[update])

    useEffect(() => {
      setRandomNo(generateRandom(1001,9999))
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

    console.log(update)
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
        {title}
        <Grid container xs = {12} className = {classes.grid} spacing={0}>
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
      </React.Fragment>
    )
  }

export default Notes
import React, {useState, useEffect}             from 'react'

import { connect, useSelector, useDispatch }    from 'react-redux';

import { makeStyles }                           from '@material-ui/core/styles';
import Grid                                     from '@material-ui/core/Grid';
import FormControl                              from '@material-ui/core/FormControl';
import Input                                    from '@material-ui/core/Input';
import InputLabel                               from '@material-ui/core/InputLabel';
import Button                                   from '@material-ui/core/Button';

import {setAddNotes}                            from '../../modules/common';


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

    const classes = useStyles();
    const blankNotes = [[]];
    const dispatch = useDispatch();
    const {code, type} = props
  
    const [notesArr, setNotesArr]         = React.useState([...blankNotes]);
  
    const handleArrChange = e => {
      const updatedArr = [...notesArr];
      updatedArr[e.target.id] = e.target.value;
      setNotesArr(updatedArr);
    };

    const addNote = () => {
      setNotesArr([...notesArr,  [...blankNotes] ]);
    };

    const notesFragment = (val, idx) => {
      return( 
        <React.Fragment>
            <React.Fragment>
                <Grid item xs = {11}>
                <FormControl key = {idx} className = {classes.fieldItem}>
                    <InputLabel>{'notes ' + idx}</InputLabel>
                    <Input type = 'text' id={idx} value={notesArr[idx]} onChange={handleArrChange} />
                </FormControl>
                </Grid>
            </React.Fragment>
            {idx == 0 ? 
                <React.Fragment>
                <Button variant="contained" color="primary" onClick = {addNote}>
                    Add
                </Button>
                </React.Fragment>
                : ''
            }
        </React.Fragment>
      )
    }

    const onSubmit = () => {
        dispatch(setAddNotes({type, code, notesArr}))
    }

    return (
      <React.Fragment>
        <Grid container xs = {12} className = {classes.grid} spacing={0}>
          {notesArr.map((val, idx) => {
            return (
              notesFragment(val, idx)
            )
          })}
        </Grid>
        <Button variant="contained" color="primary" onClick = {onSubmit}>
            Submit
        </Button>
      </React.Fragment>
    )
  }

export default Notes
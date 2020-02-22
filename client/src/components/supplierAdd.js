import React, {useState, useEffect}           from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { connect, useSelector, useDispatch } from 'react-redux';

import axios from 'axios';


import Grid             from '@material-ui/core/Grid';
import Button           from '@material-ui/core/Button';
import Paper            from '@material-ui/core/Paper';

import {setSupplierAdd} from '../modules/supplier'

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

let SupplierAdd = props => {
  const classes = useStyles();
  const [type, setType]               = React.useState({});
  const [note, setNote]               = React.useState('');

  const blankNotes = [[]];


  const [typeArr, setTypeArr]   = React.useState([...blankNotes]);

  const dispatch = useDispatch();
  const supplierProps = useSelector(state => state.supplier)

  const addEmail = () => {
    setTypeArr([...typeArr,  [...blankNotes] ]);
  };


  const handleArrChange = e => {
    const updatedArr = [...typeArr];
    updatedArr[e.target.id] = e.target.value;
    setTypeArr(updatedArr);
  };

  const handleChange = prop => event => {
    setType({ ...type, [prop]: event.target.value });
  };
  
  const handleChangeNote = (e) => {
    e.preventDefault()
    setNote(e.target.value)
  }
  const onSubmit = () => {
    type.notes = typeArr
    dispatch(setSupplierAdd(type))
  }

  const createInput = (title) => {
    let input = 
      <FormControl className = {classes.fieldItem}>
        <InputLabel>{title}</InputLabel>
        <Input id={title} value={type[title]} onChange={handleChange(title)} />
      </FormControl>
    return input
  }

  const notesFragment = (val, idx) => {
    return( 
      <React.Fragment>
        <React.Fragment>
          <Grid item xs = {11}>
            <FormControl key = {idx} className = {classes.fieldItem}>
              <InputLabel>{'notes ' + idx}</InputLabel>
              <Input type = 'text' id={idx} value={typeArr[idx]} onChange={handleArrChange} />
            </FormControl>
          </Grid>
        </React.Fragment>
        {idx == 0 ? 
          <React.Fragment>
            <Button variant="contained" color="primary" onClick = {addEmail}>
              Add
            </Button>
          </React.Fragment>
          : ''
        }
      </React.Fragment>
    )
  }

  const writeNote = (note, supplierCode) => {
    axios.post(`/api/supplier/addNotes`, {note:note, supplierCode : supplierCode})
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }


  const loadNote = () => {
    axios.get(`/api/supplier/loadNotes/dfef`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }
  loadNote()
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const supplierCode = 'dflkd'
      writeNote(note, supplierCode)
 // onFetchItem()
    }
  }

  return (
    <React.Fragment>
      <form className={classes.root} noValidate autoComplete="off">
          <Grid container xs = {12} className = {classes.grid} spacing={0}>
            <Grid item xs = {5}>
              {createInput('supplierCode')} 
            </Grid>
            <Grid item xs = {7}>
              {createInput('supplierName')} 
            </Grid>
          </Grid>
          <Grid container xs = {12} className = {classes.grid} spacing={0}>
            <Grid item xs = {5}>
              {createInput('country')} 
            </Grid>
            <Grid item xs = {7}>
              {createInput('province')} 
            </Grid>
          </Grid>
          <Grid container xs = {12} className = {classes.grid} spacing={0}>
            <Grid item xs = {5}>
              {createInput('ceo')} 
            </Grid>
            <Grid item xs = {7}>
              {createInput('taxCode')} 
            </Grid>
          </Grid>
          <Grid container xs = {12} className = {classes.grid} spacing={0}>
            <Grid item xs = {5}>
              {createInput('emailType')} 
            </Grid>
            <Grid item xs = {7}>
              {createInput('emailAddress')} 
            </Grid>
          </Grid>

          <Grid container xs = {12} className = {classes.grid} spacing={0}>
            {typeArr.map((val, idx) => {
              return (
                notesFragment(val, idx)
              )
            })}
          </Grid>
          <Button variant="contained" color="primary" onClick = {onSubmit}>
                Submit
          </Button>
          {/* <Button variant="contained" color="primary" onClick = {checkApi}>
                Submit
          </Button> */}
      </form>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container xs = {12} className = {classes.grid} spacing={0}>
          <Grid item xs = {12}>
            <FormControl className = {classes.fieldItem}>
              <InputLabel>{'notes'}</InputLabel>
              <Input id={'notes'} value={note} onChange={handleChangeNote} onKeyPress={handleKeyPress} />
            </FormControl>          
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}

export default SupplierAdd
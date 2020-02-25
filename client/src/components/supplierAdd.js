import React, {useState, useEffect}           from 'react'

import { makeStyles }   from '@material-ui/core/styles';
import FormControl      from '@material-ui/core/FormControl';
import Input            from '@material-ui/core/Input';
import InputLabel       from '@material-ui/core/InputLabel';
import Grid             from '@material-ui/core/Grid';
import Button           from '@material-ui/core/Button';

import { connect, useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import SupplierNotes from '../components/common/notes'


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
  const dispatch = useDispatch();

  const [type, setType]               = React.useState({});
  const [note, setNote]               = React.useState('');

  const supplierProps = useSelector(state => state.supplier)
  
  const handleChange = prop => event => {
    setType({ ...type, [prop]: event.target.value });
  };
  
  const handleChangeNote = (e) => {
    e.preventDefault()
    setNote(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const supplierCode = 'dflkd'
      writeNote(note, supplierCode)
    }
  }

  const onSubmit = () => {
    // type.notes = typeArr
    // dispatch(setSupplierAdd(type))
  }
  
  const createInput = (title) => {
    let input = 
      <FormControl className = {classes.fieldItem}>
        <InputLabel>{title}</InputLabel>
        <Input id={title} value={type[title]} onChange={handleChange(title)} />
      </FormControl>
    return input
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

  return (
    <React.Fragment>
      <form className={classes.root} noValidate autoComplete="off">
          <Grid container xs = {12} className = {classes.grid} spacing={0}>
            <Grid item xs = {5}> {createInput('supplierCode')} </Grid>
            <Grid item xs = {7}> {createInput('supplierName')} </Grid>
          </Grid>
          <Grid container xs = {12} className = {classes.grid} spacing={0}>
            <Grid item xs = {5}> {createInput('country')} </Grid>
            <Grid item xs = {7}> {createInput('province')} </Grid>
          </Grid>
          <Grid container xs = {12} className = {classes.grid} spacing={0}>
            <Grid item xs = {5}> {createInput('ceo')} </Grid>
            <Grid item xs = {7}> {createInput('taxCode')} </Grid>
          </Grid>
          <Grid container xs = {12} className = {classes.grid} spacing={0}>
            <Grid item xs = {5}> {createInput('emailType')} </Grid>
            <Grid item xs = {7}> {createInput('emailAddress')} </Grid>
          </Grid>

          <SupplierNotes></SupplierNotes>

          <br></br>
          
          <Button variant="contained" color="primary" onClick = {onSubmit}>
                Submit
          </Button>
      </form>

    </React.Fragment>
  )
}

export default SupplierAdd
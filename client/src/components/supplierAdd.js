import React, {useState, useEffect}           from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Grid             from '@material-ui/core/Grid';
import Button           from '@material-ui/core/Button';
import Paper            from '@material-ui/core/Paper';


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

  const blankNotes = [];

  const [typeArr, setTypeArr]   = React.useState([...blankNotes]);


  const addEmail = () => {
    setTypeArr([...typeArr,  [...blankNotes] ]);
  };


  const handleArrChange = e => {
    console.log(e.target)
    const updatedArr = [...typeArr];
    console.log(updatedArr)
    updatedArr[e.target.id] = e.target.value;
    setTypeArr(updatedArr);
  };

  const handleChange = prop => event => {
    setType({ ...type, [prop]: event.target.value });
  };
  

  const createInput = (title) => {
    let input = 
      <FormControl className = {classes.fieldItem}>
        <InputLabel>{title}</InputLabel>
        <Input id={title} value={type[title]} onChange={handleChange(title)} />
      </FormControl>
    return input
  }

  console.log(typeArr)


  const notesFragment = 
    <React.Fragment>
      <Grid item xs = {11}>
        {createInput('notes')} 
      </Grid>
      <Grid item xs = {1}>
        <Button variant="contained" color="primary" onClick = {addEmail}>
          Add
        </Button>
      </Grid>
    </React.Fragment>
  console.log(type)


  return (
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
          {notesFragment}
          {typeArr.map((val, idx) => {
            return (
              <FormControl key = {idx} className = {'dfdf'}>
                <InputLabel>{'notes'}</InputLabel>
                <Input type = 'text' id={idx} value={typeArr[idx]} onChange={handleArrChange} />
              </FormControl>
            )
          })}
        </Grid>

    </form>


  )
}

export default SupplierAdd
import React, { useState, useEffect } from 'react';

import { makeStyles }           from '@material-ui/core/styles';

import Grid                     from '@material-ui/core/Grid';

import Dialog                   from '@material-ui/core/Dialog';
import DialogActions            from '@material-ui/core/DialogActions';
import DialogContent            from '@material-ui/core/DialogContent';
import DialogContentText        from '@material-ui/core/DialogContentText';
import DialogTitle              from '@material-ui/core/DialogTitle';

import TextField                from '@material-ui/core/TextField';

import Button                   from '@material-ui/core/Button';

import Paper                    from '@material-ui/core/Paper';

import Draggable from 'react-draggable';

function DraggableDialog(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    padding: theme.spacing(0),
    textAlign: 'left',
    alignContent: 'center',
    justifyContent : 'center',
    display: 'flex',
    backgroundColor : '#ecdfed',
  },
  paperAlignCenter : {
    padding: theme.spacing(0),
    color : 'black',
    backgroundColor: '#efdbfd',
    justifyContent: 'center',
    display: 'flex',
    fontSize : '18px'
  },
}));

const InputDialog = ({attr}) => {

  const classes = useStyles();
  const {question, openState, setOpenState, answer, setAnswer} = attr
  const [tempAnswer, setTempAnswer] = useState(null);
  
  const onSubmit = () => {
    setAnswer(tempAnswer)
    setOpenState(false)
  }

  return(
    <React.Fragment>
      <Dialog
        open={openState}
        // onClose={handleClose}
        maxWidth = 'sm'
        fullWidth
        aria-describedby="alert-dialog-description"
        PaperComponent = {DraggableDialog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Result? {question}
        </DialogTitle>        
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            value = {tempAnswer}
            onChange = {(e) => setTempAnswer(e.target.value)}
          />
        </DialogContent>
        <Grid container className = {classes.grid}>
          <Grid item xs = {6}>
            <Button onClick={onSubmit} color="primary">
              Solved!
            </Button>
          </Grid>
          <Grid item xs = {6}>
            <Button onClick={(e) => {setOpenState(false)}} color="primary">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  )
}

export default InputDialog
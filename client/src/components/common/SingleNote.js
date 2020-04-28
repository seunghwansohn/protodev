import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import TextField          from '@material-ui/core/TextField';
import Dialog             from '@material-ui/core/Dialog';
import NotesIcon from '@material-ui/icons/Notes';
import Button                                   from '@material-ui/core/Button';


const TestPage = ({
  value, 
  onChange, 
  onSubmit
}) => {

  const [openedDialog, setOpenedDialog]   = React.useState(false)
  const handleCloseDialog = () => {
    setOpenedDialog(false)
  }
  const handleDialogOpen = () => {
    setOpenedDialog(true)
  }

  const onClickSubmit = () => {
    onSubmit()
    handleCloseDialog()
  }

  return (
    <>
      <Button onClick = {handleDialogOpen}>
        <NotesIcon></NotesIcon>
      </Button>
      <Dialog
        open = {openedDialog}
      >
        <TextField
          value = {value}
          placeholder="MultiLine with rows: 2 and rowsMax: 4"
          multiline
          rows={10}
          rowsMax={10}
          style = {{width : '500px'}}
          onChange = {onChange}
        />
        <Button variant="contained" color="primary" onClick = {onClickSubmit}>
            Submit
        </Button>
        <Button variant="contained" color="secondary" onClick = {handleCloseDialog}>
            Close
        </Button>
      </Dialog>
    </>
  )
}


export default TestPage

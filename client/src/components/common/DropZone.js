import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdf from 'pdf-thumbnail';

import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import produce       from 'immer'
import ArchiveIcon from '@material-ui/icons/Archive';

import styled from 'styled-components'

import Dialog             from '@material-ui/core/Dialog';
import DialogActions      from '@material-ui/core/DialogActions';
import DialogContent      from '@material-ui/core/DialogContent';
import DialogContentText  from '@material-ui/core/DialogContentText';
import DialogTitle        from '@material-ui/core/DialogTitle';

import Paper from '@material-ui/core/Paper';

import Button           from '@material-ui/core/Button';



// const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');

const StyledDiv = styled.div`
  width : 30px;
`


const DropZone = () => {
  const [file, setFile]                   = useState([])
  const [fileName, setFileName]           = useState([])
  const [openedDialog, setOpenedDialog]   = useState(false)

  // const pdfBuffer = fs.readFileSync('/SuppliersPage.js')


  const handleCloseDialog = () => {
    setOpenedDialog(false)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    addFiles()
    .then((response) => {
      console.log(response.data);
    })
  }

  const handleFileChange = e => {
    setFileName(
      produce(fileName, draft => {
        draft.push(e.target.value)
      })
    )
    console.log(e.target)
    setFile(
      produce(file, draft => {
        e.target.files.map(file => {
          draft.push(file)
        })
      })
    )
  }
    
  const addFiles = () => {
    const url = '/api/addfiles';
    var formData = new FormData();
    console.log(file)

    file.map(a => {formData.append(`images`, a)})
    console.log(formData.entries())
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.post(url, formData, config)
  }
    
    

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles)
    setOpenedDialog(true)
    setFile(
      produce(file, draft => {
        acceptedFiles.map(newFile => {
          draft.push(newFile)
        })
      })
    )
  }

  console.log(file)

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <React.Fragment>
      <StyledDiv {...getRootProps()}>
        <input {...getInputProps()} />
        {
          <ArchiveIcon></ArchiveIcon>
        }
      </StyledDiv>  

      <Dialog
        open = {openedDialog}
        onClose = {handleCloseDialog}
        maxWidth = 'md'
        fullWidth = 'lg'
      >
        <DialogTitle id="alert-dialog-title">Are you confirm the data you input?</DialogTitle>
        <Button onClick = {addFiles}>제출</Button>
        <Paper elevation={0}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
              {isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>}
          </div>
        </Paper>
        {file.map(file => {
          console.log(file)
          const realWidth = file.naturalWidth
          console.log(realWidth)
          return (
            <img src = {URL.createObjectURL(file)} height = 'auto' width = '100%'></img>
          )
        })}
      </Dialog>
    </React.Fragment>
  );
}

export default DropZone;

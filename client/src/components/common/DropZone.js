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

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import {generateRandom}     from '../../lib/common';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { makeStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: '100%',
    paddingTop: '56.25%', // 16:9
  },
}));
// const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');

const StyledDiv = styled.div`
  width : 30px;
`


const DropZone = ({
  fixMode, 
  dataType, 
  primaryKey, 
  primaryCode, 
  files
}) => {
  const classes = useStyles();

  const [file, setFile]                   = useState([])
  const [requestNo, setRequestNo]         = useState('')

  const [fileName, setFileName]           = useState([])
  const [openedDialog, setOpenedDialog]   = useState(false)

  const [attachedFiles, setAttachedFiles] = useState([])


  console.log(dataType, primaryKey, primaryCode)
  // const pdfBuffer = fs.readFileSync('/SuppliersPage.js')

  console.log(file)


  useEffect(() => {
    setRequestNo(generateRandom())
  },[])

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

  const onClickArchiveIcon = () => {
    setOpenedDialog(true)
  }
    
  useEffect(( )=> {
    const url = '/api/query/files'
    if (requestNo !== '')
    axios.post(url, {relCode : primaryCode, reqNo : requestNo}).then(res => {
      console.log(res)
      setAttachedFiles(res.data)
    })
  },[requestNo])

  console.log(attachedFiles)
  const addFiles = () => {
    const url = '/api/addfiles';
    var formData = new FormData();
    formData.append('location', primaryCode)
    formData.append('type', dataType)
    formData.append('primaryKey', primaryKey)
    formData.append('primaryCode', primaryCode)
    formData.append('requestNo', requestNo)

    file.map(a => {formData.append(`images`, a)})
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
    }
    axios.post(url, formData, config)
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
      {fixMode ? 
        <StyledDiv {...getRootProps()}>
          <input {...getInputProps()} />
          {
            <CloudUploadIcon></CloudUploadIcon>
          }
        </StyledDiv>  
      : 
      <StyledDiv>
          <ArchiveIcon onClick = {event => {onClickArchiveIcon()}}></ArchiveIcon>
      </StyledDiv>  
      }

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

        <GridList cols = {4} cellHeight={360} className={classes.gridList}>
          <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile>
          {attachedFiles.map((tile) => (
            <GridListTile cols={1} key={tile}>
              <img src={tile} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Dialog>
    </React.Fragment>
  );
}

export default DropZone;

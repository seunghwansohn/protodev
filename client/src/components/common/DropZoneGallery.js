import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdf from 'pdf-thumbnail';

import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import produce       from 'immer'
import ArchiveIcon from '@material-ui/icons/Archive';

import FiberNewIcon from '@material-ui/icons/FiberNew';

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

import AddIcon from '@material-ui/icons/Add';

import GetAppIcon from '@material-ui/icons/GetApp';

import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: '100%',
    paddingTop: '56.25%', // 16:9
  },
  icon: {
    color: 'white',
  },
}));
// const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');

const StyledDiv = styled.div`
  width : 30px;
`


const StyledGridList = styled(GridList)`
  .MuiIconButton-root {
    padding : 4px;
  }
`
const StyledGridListTile = styled(GridListTile)`
  .MuiGridListTile-root {
    background : rgba(224, 222, 222, 0.4);
  }
  .MuiSvgIcon-root {
    width : 5em;
    height : 5em;
    color : rgba(0, 0, 0, 0.51);
    font-size : 2em;
  }
  .MuiPaper-root {
    color : rgba(0, 0, 0, 0.51);
    background : rgba(224, 222, 222, 0.4);

  }
  .MuiGridListTile-tile {
    text-align: center;
    background : rgba(224, 222, 222, 0.4);
  }
`

const StyledGridListTileBar = styled(GridListTileBar)`
  .MuiGridListTileBar-root {
    height : 28px;
  };
  .MuiGridListTileBar-title {
    color : ${props => props.fontColor};
    font-weight : bold;
    font-size : 13px;
  };
  .MuiGridListTileBar-titleWrap {
    margin : 7px;
  };
  .MuiGridListTileBar-rootSubtitle {
    height : 28px;
  };

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
  const [openedTileDialog, setOpenedTileDialog]   = useState({})


  const [attachedFiles, setAttachedFiles] = useState([])


  // const pdfBuffer = fs.readFileSync('/SuppliersPage.js')

  console.log(file)
  console.log(attachedFiles)



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
    })
  }

  const handleFileChange = e => {
    setFileName(
      produce(fileName, draft => {
        draft.push(e.target.value)
      })
    )
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
      setAttachedFiles(res.data)
    })
  },[requestNo])

  useEffect(() => {
    let tempObj = {}

    attachedFiles.map(file => {
      let lastSlash = file.lastIndexOf('/')
      let length = file.length  
      let originalFileName = file.slice(lastSlash + 1, length-4)
      tempObj[originalFileName] = false

    })
    setOpenedTileDialog(tempObj)
  },[attachedFiles])

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
    
    
  const handleOpenTileDialog = (event, originalFileName) => {
    event.preventDefault()
    setOpenedTileDialog(
      produce(openedTileDialog, draft => {
        draft[originalFileName] = true
      })
    )
  }

  const handleCloseTileDialog = async (originalFileName) => {
    let tempObj = await {...openedTileDialog}
    tempObj[originalFileName] = await false
    await setOpenedTileDialog(tempObj)
  }


  const onDrop = (acceptedFiles) => {
    setOpenedDialog(true)
    setFile(
      produce(file, draft => {
        acceptedFiles.map(newFile => {
          draft.push(newFile)
        })
      })
    )
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <React.Fragment>
      <StyledGridList cols = {6} cellHeight={250}>
        <StyledGridListTile key="Subheader" cols={1} >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
              {isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>}
          </div>
          <AddIcon></AddIcon>
          
        </StyledGridListTile>
        
        {file.length > 0 ?
          <StyledGridListTile>
          {file.map((file, idx) => {
            return(
                <img src = {URL.createObjectURL(file)} height = 'auto' width = '300px'></img>
              )
            })
          }
          <StyledGridListTileBar
            id = 'pahaha'
            className = 'puhihi'
            titlePosition="top"
            title="Newly Uploaded"
            style={
              {
                background : `rgba( 191, 255, 253, 0.9 )`,
                color : '#575151', 
                height : '45px'
              }
            }
            fontColor = {'black'}
            actionIcon = {
              <FiberNewIcon
                color = 'primary'
                style = {{opacity : 1, width : '30px'}}
              ></FiberNewIcon>
            }
          ></StyledGridListTileBar>

        </StyledGridListTile>
          : ''
        }



        {attachedFiles.map((file, idx) => {
          let lastSlash = file.lastIndexOf('/')
          let length = file.length  
          let originalFileName = file.slice(lastSlash + 1, length-4)
          console.log(file)
          return(
            <StyledGridListTile 
              onClick = {event => {handleOpenTileDialog(event, originalFileName)}} 
              cols={1} 
              key={file}
            >
              <img src={file} alt={file.title} /> */}
              <StyledGridListTileBar
                titlePosition="top"
                title={originalFileName}
                subtitle={<span>by: {file.author}</span>}
                style={
                  {
                    background : `rgba( 209, 255, 196, 0.9 )`, 
                    // color : '#8cbdf5', 
                    height : '45px'
                  }
                }
                fontColor = {'black'}
                actionIcon={
                  <IconButton 
                    onClick = {event => {console.log('버튼클릭1')}} 
                    aria-label={`info about ${file.title}`}
                    style = {{padding : '0px'}}
                  >
                    {/* <InfoIcon fontSize = {'inherit'} onClick = {event => {
                      event.preventDefault()
                      console.log('버튼클릭1')
                      }}/> */}
                    <GetAppIcon 
                      fontSize = {'inherit'} 
                      onClick = {event => {console.log('버튼클릭2')}} 
                      style = {{opacity : 1, width : '30px'}}

                    />
                  </IconButton>
                }
                actionPosition="right"

              />
              <Dialog
                key = {'tile' + idx}
                open = {openedTileDialog[originalFileName]}
                onClose = {(event) => handleCloseTileDialog(originalFileName)}
                maxWidth = 'md'
                fullWidth = 'lg'
              >
                <img src = {file}></img>
                <Button
                  onClick = {event => {handleCloseTileDialog(originalFileName)}}
                >
                  Close
                </Button>

              </Dialog>
            </StyledGridListTile>
          )
        })}


      </StyledGridList>
    </React.Fragment>
  );
}

export default DropZone;

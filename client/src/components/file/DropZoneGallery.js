import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {useDropzone} from 'react-dropzone'
import produce       from 'immer'
import styled        from 'styled-components'


import FiberNewIcon       from '@material-ui/icons/FiberNew';

import Dialog             from '@material-ui/core/Dialog';
import DialogActions      from '@material-ui/core/DialogActions';
import DialogContent      from '@material-ui/core/DialogContent';
import DialogContentText  from '@material-ui/core/DialogContentText';
import DialogTitle        from '@material-ui/core/DialogTitle';

import Button     from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import InfoIcon   from '@material-ui/icons/Info';
import AddIcon    from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';

import Typography       from '@material-ui/core/Typography';

import GridList         from '@material-ui/core/GridList';
import GridListTile     from '@material-ui/core/GridListTile';
import GridListTileBar  from '@material-ui/core/GridListTileBar';

import { makeStyles }     from '@material-ui/core/styles';
import {generateRandom}   from '../../lib/funcs/fCommon';
import {getFolderStr} from '../../lib/generateFileName';


import bcryptjs from 'bcryptjs' //해시 형성 및 해시 검증하여 정보를 확실히 검증

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


const DropZoneGallery = ({
  motherFrameNo,
  motherNo,
  motherType,

  fixMode, 
  dataType, 
  primaryKey, 
  primaryCode, 
}) => {


  
console.log(getFolderStr())

  const [requestNo, setRequestNo]   = useState('')
  const [hashNo, setHashNo]         = useState('')

  useEffect(() => {
    if (primaryCode && requestNo) {
      setHashNo(getFolderStr())
    }
  },[primaryCode])

  //언마운트시 파일 삭제 api에 요청
  useEffect(() => {
    setRequestNo(generateRandom())
    return ( ) => {
      const url = '/api/clean/folder'
      axios.post(url, {hashNo : hashNo})
    }
  },[hashNo])

  const [fileName, setFileName]           = useState([])

  console.log(hashNo)


  //새 파일들 api에 제출
  const addFiles = () => {
    const url = '/api/addfiles';
    var formData = new FormData();
    formData.append('location', primaryCode)
    formData.append('type', dataType)
    formData.append('primaryKey', primaryKey)
    formData.append('primaryCode', primaryCode)
    formData.append('requestNo', requestNo)
    newFiles.map(newFile => {formData.append(`images`, newFile)})
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
    }
    axios.post(url, formData, config)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    addFiles()
    .then((response) => {
    })
  }

  //기존 저장된 파일 로드
  const [attachedFiles, setAttachedFiles] = useState([])
  useEffect(( )=> {
    const url = '/api/query/files'
    if (hashNo !== '')
    axios.post(url, {relCode : primaryCode, reqNo : hashNo}).then(res => {
      setAttachedFiles(res.data)
    })
  },[hashNo])
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
    

  //첨부파일 확대 및 축소 다이얼로그 기능
  const [openedTileDialog, 
    setOpenedTileDialog]   = useState({})
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


  //드롭존 새파일 추가기능
  const [newFiles, setNewFiles]     = useState([])
  const onDrop = (droppedFiles) => {
    setNewFiles(
      produce(newFiles, draft => {
        droppedFiles.map(newFile => {
          draft.push(newFile)
        })
      })
    )
  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})



  return (
    <React.Fragment>

      <Typography variant="h5">
        Attached Files
      </Typography>

      <StyledGridList cols = {6} cellHeight={250}>

        {/* 첫 타일에 새로 추가 드롭존 */}
        <StyledGridListTile id="Subheader" cols={1} >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
              {isDragActive ?
                <p>Drop the files here ...</p> :
                <div>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                  <AddIcon></AddIcon>
                </div>
              }
          </div>
        </StyledGridListTile>
        
        {/* 둘째 타일부터 새로 추가된 파일들*/}
        {newFiles.length > 0 ?
          <StyledGridListTile>
          {newFiles.map((newFile, idx) => {
            return(
                <img src = {URL.createObjectURL(newFile)} height = 'auto' width = '300px'></img>
              )
            })
          }
          <StyledGridListTileBar
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

        {/* 새로추가된 파일 타일 이후로 api에서 불러온 파일들 */}
        {attachedFiles.map((file, idx) => {
          let lastSlash = file.lastIndexOf('/')
          let length = file.length  
          let originalFileName = file.slice(lastSlash + 1, length-4)
          return(
            <StyledGridListTile 
              onClick = {event => {handleOpenTileDialog(event, originalFileName)}} 
              cols={1} 
              key={'attachedFile' + idx}
            >
              <img src={file} alt={file.title} /> */}
              <StyledGridListTileBar
                titlePosition="top"
                title={originalFileName}
                subtitle={<span>by: {file.author}</span>}
                style={
                  {
                    background : `rgba( 209, 255, 196, 0.9 )`, 
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
                key = {'enlargedTile' + idx}
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

export default DropZoneGallery;

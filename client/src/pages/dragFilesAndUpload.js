import React, { useState, useEffect } from 'react';
import SupplierQuery from '../containers/SupplierQuery';
import MakerList from '../containers/MakerList';
import axios from 'axios';
import pdf from 'pdf-thumbnail';

import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import produce       from 'immer'


// const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');


const TestPage = () => {
  const [file, setFile]                   = useState([])
  const [fileName, setFileName]           = useState([])

  // const pdfBuffer = fs.readFileSync('/SuppliersPage.js')


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
    


    
  const handleFileInput = e => {
    setFile(e.target.files[0])
  }

  const handlePost = ()=>{
    const formData = new FormData();
    formData.append('file', file);

    // return axios.post("/api/upload", formData).then(res => {
    //   alert('성공')
    // }).catch(err => {
    //   alert('실패')
    // })
  }

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles)
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
      <form onSubmit = {handleFormSubmit}>
        이미지: <input type="file" name="file" file={file} value = {fileName} onChange={handleFileChange}></input>
        {/* <input type = "flie" name = "file" onChange = {e=> handleFileInput(e)}></input> */}
        <button type="submit">추가하기</button>
      </form>

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>  

      {file.map(file => {
        return (
          <img src = {URL.createObjectURL(file)}></img>
        )
      })}

      {/* {file && file.length > 0 ? <img src = {URL.createObjectURL(file[0])}></img> : ''} */}



    </React.Fragment>
  );
}

export default TestPage;

import React, { useState, useEffect } from 'react';
import SupplierQuery from '../containers/SupplierQuery';
import MakerList from '../containers/makerList';
import axios from 'axios';
import pdf from 'pdf-thumbnail';

import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

// const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');


const TestPage = () => {
  const [file, setFile]           = useState([])
  const [fileName, setFileName]           = useState()

  // const pdfBuffer = fs.readFileSync('/SuppliersPage.js')


  const handleFormSubmit = (e) => {
    e.preventDefault()
    addFiles()
    .then((response) => {
      console.log(response.data);
    })
  }

  const handleFileChange = e => {
    setFileName(e.target.value)
    console.log(e.target)
    setFile(e.target.files[0])
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

  const onDrop = useCallback(acceptedFiles => {
    console.log('파일드롬됨')
    setFile(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  console.log(file)
  return (
    <React.Fragment>
      <form onSubmit = {handleFormSubmit}>
        프로필 이미지: <input type="file" name="file" file={file} value = {fileName} onChange={handleFileChange}></input>
        {/* <input type = "flie" name = "file" onChange = {e=> handleFileInput(e)}></input> */}
        <button type="submit">추가하기</button>
      </form>

      {file.map(file => {
        return (
          <img src = {URL.createObjectURL(file)}></img>
        )
      })}

      {file && file.length > 0 ? <img src = {URL.createObjectURL(file[0])}></img> : ''}

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>

    </React.Fragment>
  );
}

export default TestPage;

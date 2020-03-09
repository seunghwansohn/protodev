import React, { useState, useEffect } from 'react'
import SupplierQuery from '../containers/SupplierQuery';
import MakerList from '../containers/makerList';
import axios from 'axios';



const TestPage = () => {
  const [file, setFile]           = useState()
  const [fileName, setFileName]           = useState()


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
      const formData = new FormData();

      formData.append('image', file)
      
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
    return axios.post(url, formData, config)
  }
    
    

  console.log(file)
  console.log(fileName)

    
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

  return (
    <React.Fragment>
      <form onSubmit = {handleFormSubmit}>
        프로필 이미지: <input type="file" name="file" file={file} value = {fileName} onChange={handleFileChange}></input>
        {/* <input type = "flie" name = "file" onChange = {e=> handleFileInput(e)}></input> */}
        <button type="submit">추가하기</button>
      </form>

    </React.Fragment>
  );
}

export default TestPage;

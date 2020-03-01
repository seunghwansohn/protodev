import React, { useState, useEffect } from 'react'
import Query                          from '../components/Query'
import axios                          from 'axios'

const SupplierQuery = ({loadReqData}) => {
    const [supplierCode, setSupplierCode] = useState('')
    const [supplierName, setSupplierName] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')
    const [ceo, setCeo] = useState('')
    const [loadedData, setLoadedData] = useState([])

    const queryFormType = 'supplier'

    const style = {
        
    }

    const queryProps = [
        {type : 'primary', newRow : true, size : 5, title: 'supplierCode', state : supplierCode, setState : setSupplierCode, style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'supplierName', state : supplierName, setState : setSupplierName, style:'regular'},
        {type : 'fixable', newRow : false, size : 5, title: 'country', state : country, setState : setCountry, style:'regular'},
        {type : 'fixable', newRow : false, size : 5, title: 'province', state : province, setState : setProvince, style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'},
        {type : 'fixable', newRow : false, size : 5, title: 'ceo', state : ceo, setState : setCeo, style:'regular'},
    ]

    useEffect(() => {
        console.log(loadReqData)
        axios.post('/api/supplier/query', loadReqData).then(res => {
            setLoadedData(res.data)
        })
    },[])

      
    return(
        <React.Fragment>
            dfdf
            <Query loadedTempData = {loadedData} queryFormType = {queryFormType} queryProps = {queryProps}></Query>
        </React.Fragment>
    )
}

export default SupplierQuery
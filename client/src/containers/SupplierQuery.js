import React, { useState, useEffect } from 'react'
import Query                          from '../components/Query'
import axios                          from 'axios'

const SupplierQuery = () => {
    const [supplierName, setSupplierName] = useState('')
    const [country, setCountry] = useState('')
    const [ceo, setCeo] = useState('')
    const [loadedData, setLoadedData] = useState([])


    const queryFormType = 'supplier'


    const style = {
        
    }

    const queryProps = [
        {type : 'primary', newRow : true, size : 5, title: 'supplierName', state : supplierName, setState : setSupplierName, style:'regular'},
        {type : 'fixable', newRow : false, size : 7, title: 'country', state : country, setState : setCountry, style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'},
        {type : 'fixable', newRow : false, size : 5, title: 'ceo', state : ceo, setState : setCeo, style:'regular'},
    ]

    useEffect(() => {
        axios.post('/api/supplier/query', {code:"asdfasdf"}).then(res => {
            setLoadedData(res.data)
        })
    },[])

      
    return(
        <React.Fragment>
            <Query loadedTempData = {loadedData} queryFormType = {queryFormType} queryProps = {queryProps}></Query>
        </React.Fragment>
    )
}

export default SupplierQuery
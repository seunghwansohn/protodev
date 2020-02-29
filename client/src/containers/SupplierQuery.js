import React, { useState, useEffect } from 'react'
import Query                          from '../components/Query'
import axios                          from 'axios'

const SupplierQuery = () => {
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [ceo, setCeo] = useState('')
    const [loadedData, setLoadedData] = useState([])


    const queryFormType = 'supplier'


    console.log(name, country, ceo)
    const style = {
        
    }

    const queryProps = [
        {type : 'primary', newRow : true, size : 5, title: 'name', state : name, setState : setName, style:'regular'},
        {type : 'fixable', newRow : false, size : 7, title: 'country', state : country, setState : setCountry, style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'},
        {type : 'fixable', newRow : false, size : 5, title: 'ceo', state : ceo, setState : setCeo, style:'regular'},
    ]

    useEffect(() => {
        axios.get('/api/supplier/load').then(res => {
            setLoadedData(res)
        })
    },[])

      
    return(
        <React.Fragment>
            <Query loadedTempData = {loadedData} queryFormType = {queryFormType} queryProps = {queryProps}></Query>
        </React.Fragment>
    )
}

export default SupplierQuery
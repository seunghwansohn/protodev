import React, { useState, useEffect } from 'react';
import Query                          from '../components/query/Query';
import axios                          from 'axios';

const MakerQuery = ({reqCode}) => {
    const [supplierCode, setSupplierCode] = useState('')
    const [supplierName, setSupplierName] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')
    const [ceo, setCeo] = useState('')
    const [loadedData, setLoadedData] = useState([])

    const currentType = 'maker'
    const dataType = 'maker'


    const style = {
        
    }

    const queryProps = [
        {type : 'primary', newRow : true, size : 5, title: 'makerCode', state : supplierCode, setState : setSupplierCode, style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'makerName', state : supplierName, setState : setSupplierName, style:'regular'},
        {type : 'fixable', newRow : false, size : 5, title: 'origin', state : country, setState : setCountry, style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'},
        {type : 'fixable', newRow : false, size : 5, title: 'ceo', state : ceo, setState : setCeo, style:'regular'},
    ]

    useEffect(() => {
        axios.post('/api/' + dataType + 'query', reqCode).then(res => {
            setLoadedData(res.data)
        })
    },[])

      
    return(
        <React.Fragment>
            <Query loadedTempData = {loadedData} type = {currentType} queryProps = {queryProps}></Query>
        </React.Fragment>
    )
}

export default MakerQuery
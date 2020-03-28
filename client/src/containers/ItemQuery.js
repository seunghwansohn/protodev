import React, { useState, useEffect } from 'react';
import Query                          from '../components/Query';
import axios                          from 'axios';

const ItemQuery = ({reqCode}) => {
    const [itemCode, setItemCode] = useState('')
    const [supplierName, setSupplierName] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')
    const [ceo, setCeo] = useState('')
    const [loadedData, setLoadedData] = useState([])

    console.log(reqCode)
    const type = 'item'

    const style = {
        
    }

    const queryProps = [
        {type : 'primary', newRow : true, size : 5, title: 'itemCode', state : itemCode, setState : setItemCode, style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'itemName', state : supplierName, setState : setSupplierName, style:'regular'},
        {type : 'fixable', newRow : false, size : 5, title: 'origin', state : country, setState : setCountry, style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'},
        {type : 'fixable', newRow : false, size : 5, title: 'ceo', state : ceo, setState : setCeo, style:'regular'},
    ]

    useEffect(() => {
        axios.post('/api/' + type + '/query', reqCode).then(res => {
            console.log(res.data)
            setLoadedData(res.data[0])
        })
    },[])

    
    console.log(loadedData)
    return(
        <React.Fragment>
            <Query loadedTempData = {loadedData} type = {type} queryProps = {queryProps}></Query>
        </React.Fragment>
    )
}

export default ItemQuery
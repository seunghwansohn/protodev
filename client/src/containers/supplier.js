import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import ButtonHeader from '../components/common/ButtonHeader'
import SupplierAdd from '../components/supplierAdd'
import Table from '../components/common/Table1'
import axios from '../lib/api/axios'

import { onDialogOpen } from '../modules/dialogs'

import { 
    setHeader,
    setInputChange,
 } from '../modules/supplier'


const Supplier = props => {
    
    const [suppliers, setSuppliers] = useState([])

    const getSuppliers = () => {
        axios.get('/api/supplier/load').then(res => {
            setSuppliers(res)
        })
    }
    
    console.log(suppliers)

    return(
        <>
            <button onClick = {getSuppliers}> 체크</button>
            <Table tableArr = {suppliers.data}></Table>
        </>
    )
}   

export default Supplier

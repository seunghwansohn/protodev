import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import ButtonHeader from '../components/common/ButtonHeader'
import { onDialogOpen } from '../modules/dialogs'

import { 
    setHeader,
    setInputChange,
 } from '../modules/supplier'

const Supplier = props => {
    return(
        <>
            <ButtonHeader type = {type} onHeaderButton = { onHeaderButton }></ButtonHeader>
        </>
    )
}   

export default Supplier

import React, { useState, useEffect } from 'react';
import Query                          from '../components/Query';
import axios                          from 'axios';

import {generateRandom}               from '../lib/common';
import {actUpdate}                    from '../modules/itemList'

const ItemQuery = ({motherType, motherNo, reqKey, reqCode}) => {
    const [itemCode, setItemCode]           = useState('')
    const [itemName, setItemName]           = useState('')
    const [description, setDescription]     = useState('')

    const [loadedData, setLoadedData]       = useState([])
    const [primaryKey, setPrimaryKey]       = useState('');



    //개체 기본 속성
    const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
    const type = 'itemQuery'
    const containerNo = type + '_' + frameNo
    const dataType = 'item'

    const style = {
    }

    const setUpdate = (fixedData) => {
        console.log(fixedData)
    }


    
    const queryProps = [
        {type : 'primary', newRow : true, size : 5, title: 'itemCode', state : itemCode, setState : setItemCode, style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'itemName', state : itemName, setState : setItemName, style:'regular'},
        {type : 'fixable', newRow : false, size : 5, title: 'description', state : description, setState : setDescription, style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'},
        // {type : 'fixable', newRow : false, size : 5, title: 'ceo', state : ceo, setState : setCeo, style:'regular'},
    ]

    //-- api로드 부분
    //req값을 obj값으로 만들어서 post로 api 요청하여 값을 받아옴.
    const reqWhere = () =>{
        let tempObj = {}
        tempObj[reqKey] = reqCode
        return tempObj
    }
    useEffect(() => {
        axios.post('/api/' + dataType + '/query', reqWhere()).then(res => {
            setLoadedData(res.data[0])
        })
    },[])



    useEffect(() => {
        let tempPrimaryKey = ''
        queryProps.map(obj => {
            if (obj.type == 'primary') {
                tempPrimaryKey = obj.title
            }
        })
        setPrimaryKey(tempPrimaryKey)
    },[])

    return(
        <React.Fragment>
            <Query
                motherType          = {type}
                motherNo            = {frameNo}
                loadedTempData      = {loadedData}
                onUpdate            = {setUpdate}
                queryProps          = {queryProps}>
            </Query>
        </React.Fragment>
    )
}

export default ItemQuery
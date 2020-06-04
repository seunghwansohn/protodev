import React, { useState, useEffect } from 'react';
import Query                          from '../components/query/Query';
import axios                          from 'axios';

const ProjectQuery = ({reqCode}) => {
    const [projectCode, setProjectCode] = useState('')
    const [projectName, setProjectName] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')
    const [ceo, setCeo] = useState('')
    const [loadedData, setLoadedData] = useState([])

    const type = 'project'

    const style = {
        
    }

    const queryProps = [
        {type : 'primary', newRow : true, size : 5, title: 'projectCode', state : projectCode, setState : setProjectCode, style:'regular'},
        {type : 'fixable', newRow : true, size : 7, title: 'projectName', state : projectName, setState : setProjectName, style:'regular'},
        {type : 'fixable', newRow : false, size : 5, title: 'origin', state : country, setState : setCountry, style:'regular'},
        {type : 'divider', typoGraphy : 'basicInfo'},
        {type : 'fixable', newRow : false, size : 5, title: 'ceo', state : ceo, setState : setCeo, style:'regular'},
    ]

    useEffect(() => {
        axios.post('/api/' + type + '/query', reqCode).then(res => {
            setLoadedData(res.data)
        })
    },[])

      
    return(
        <React.Fragment>
            <Query loadedTempData = {loadedData} type = {type} queryProps = {queryProps}></Query>
        </React.Fragment>
    )
}

export default ProjectQuery
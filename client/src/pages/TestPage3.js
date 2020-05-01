import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Button           from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import produce  from 'immer'
import styled   from 'styled-components';

import axios                from '../lib/api/axios'
import {getIncludingKeys,
    withoutKeys }  from '../lib/common'

const MiniPlaylistAddIcon = styled(PlaylistAddIcon)`
  .MuiButton-root{
    min-width : 30px;
  }
`

const MiniButton = styled(Button)`
  .MuiButton-root{
    min-width : 30px;
  }
`

const ExpenseTable = () => {
  const addDetail = (idx) => {
    console.log(idx)
  }

  const [rawData, setRawData]         = useState([])
  const [primaryKey, setPrimaryKey]   = useState('');
  const [includingKeys, 
      setIncludingKeys]               = useState([]);
  const [findingKeys, 
      setFindingKeys]                 = useState([]);

  const [handleData, setHandleData]   = useState([])
  const [expanded, setExpanded]       = useState([]);

  const dataType = 'expense'
  const getRawData = async () => {
    await axios.get('/api/' + dataType + '/load').then(res => {
        setPrimaryKey(res.data.primaryKey)
        setIncludingKeys(res.data.includingKeys)
        setRawData(withoutKeys(res.data.vals))
        setFindingKeys(res.data.findingKeys)
    })
  }

  const colAttr = {
    id : {
      primary : true,
      fixable : false,
      defaultHided : false,
      validate : ['code'],
      dataType : dataType,
      clickType : 'itemQuery',
      queryType : 'simpleQuery'
    },
    description : {
      fixable : true,
      defaultHided : false,
      validate : ['code'],
      dataType : dataType,
      clickType : 'itemQuery',
      queryType : 'simpleQuery'
    },
  }
  const headers = Object.keys(colAttr)

  console.log(headers)
  console.log(handleData)

  const handleExpandClick = (idx) => {
    setExpanded(
      produce(expanded, draft => {
        draft[idx] = !draft[idx]
      })
    )
  };

  useEffect(() => {
    getRawData()
  },[])

  useEffect(() => {
    setRawData(
      [
        {
          title : '게동이'
        },
        {
          title : '주둥이'
        }
      ]
    )
  },[])

  console.log(handleData)
  useEffect(() => {
    setHandleData(rawData)
  },[rawData])

  useEffect(() => {
    let tempArr = []
    handleData.map((obj, idx) => {
      tempArr.push(false)
    })
    setExpanded(tempArr)
  },[handleData])

  return (
    <>
      바보임?
      <TableContainer>
        <TableHead>

          <TableRow>
            <TableCell>
              detail
            </TableCell>
            {headers.map(header =>{
              return (
                <TableCell>
                  {header}
                </TableCell>
              )
            })}
          </TableRow>
       


        </TableHead>
        <TableBody>
          {handleData.map((obj, idx) => {
            // const isExpanded = 
            return(
              <>
                <TableRow>
                  <TableCell style = {{padding : '0px', margin : '0px'}}>
                    <MiniButton style = {{minWidth : '22px'}} onClick = {event => addDetail(idx)}>
                      <MiniPlaylistAddIcon></MiniPlaylistAddIcon>
                    </MiniButton>
                    <MiniButton
                      onClick={(event) => handleExpandClick(idx)}
                      aria-expanded={expanded}
                      aria-label="show more"
                      style = {{minWidth : '22px'}}
                    >
                      <ExpandMoreIcon />
                    </MiniButton>
                  </TableCell>
                  {headers.map(header => {
                    return (
                      <TableCell>
                        {obj[header]}
                      </TableCell>
                    )
                  })}
                </TableRow>
                <TableRow>
                  <Collapse in={expanded[idx]} timeout="auto" unmountOnExit style = {{paddingLeft : '200px'}}>
                    <Typography paragraph>
                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                      minutes.
                    </Typography>
                    <TableContainer>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            예랄랄라
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            예럴럴러
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </TableContainer>
                  </Collapse>
                </TableRow>
              </>
            )
          })}

        </TableBody>
      </TableContainer>
   </>
 )
}


export default ExpenseTable

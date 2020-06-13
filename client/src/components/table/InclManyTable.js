import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import Typography       from '@material-ui/core/Typography';

import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableContainer   from '@material-ui/core/TableContainer';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';

const InclManyTable = ({
  tableProps,
  loadedData,
}) => {
  console.log(tableProps)
  console.log(loadedData)

  const {tableName} = tableProps

  return (
    <>
      <Typography
        variant="h5"
      >
        {tableName}
      </Typography>
      <Table>
        <TableHead>
          <TableCell>
            No
          </TableCell>
          {function(){
            const {rowName, cols} = tableProps
            console.log(cols)
            return cols.map((header, idx) => {
              return (
                <TableCell>
                  {header}
                </TableCell>
              )
            })
          }()}
        </TableHead>

        <TableBody>
          {function(){
            const {refName, cols} = tableProps
            console.log(loadedData)
            const listData = loadedData[refName] && loadedData[refName].length > 0 ? loadedData[refName] : []
            console.log(listData)
            return listData.map((obj, idx) => {
              console.log(obj)
              return (
                <TableRow>
                  <TableCell>
                    {idx + 1}
                  </TableCell>
                  {cols.map(header => {
                    return(
                      <TableCell>
                        {obj[header]}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
          }()}
        </TableBody>
      </Table>
    </>
  )
}

export default InclManyTable
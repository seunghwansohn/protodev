import React, {useState, useEffect}           from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const TableWithColon = ({subject, arr, colAttr, styleAttr}) => {

    const TableSubject = ({children}) => {
      return (
        <>
              <TableRow>
                <TableCell colSpan = {4} align = "center">
                  {children}
                </TableCell>
              </TableRow>
        </>
      )
    }
  
    const TableComp = ({arr, styleAttr}) => {
  
      const tempFunc = (index) => {
        let align = ['right', 'left', 'right', 'left']
        let temp = ''
        if(index == 1) {
          temp = {width : styleAttr[index], align : align[index], padding : 0, margin : 0}
        } else if (index == 3) {
          temp = {width : styleAttr[index], align : align[index], padding : 3, margin : 3}
        } else {
          temp = {width : styleAttr[index], align : align[index], padding : 0, margin : 0}
        }
  
        return temp
      }
  
      return (
        <>
          {arr.map(arr => {
            return(
              <TableRow>
                {arr.map((header, index) => {
                  return (                    
                    <TableCell style = {tempFunc(index)} align = {tempFunc(index).align} size = 'small'>
                      {header}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </>
      )
    }
    
    return (
      <>
        <TableSubject>
          {subject}
        </TableSubject>
        <TableComp
          arr = {arr}
          colAttr = {colAttr}
          styleAttr = {styleAttr}
        >
        </TableComp>
      </>
    )
}

export default TableWithColon
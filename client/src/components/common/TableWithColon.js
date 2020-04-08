import React           from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import styled   from 'styled-components';

const SubjectTableCell = styled(TableCell)`
    font-size : 100em;
    text-indent : 15px;
`

const TableWithColon = ({subject, arr, styleAttr}) => {

    const TableSubject = ({children}) => {
      return (
        <>
              <TableRow>
                <SubjectTableCell colSpan = {4} align = "left" style = {{fontSize : "1.2em"}} >
                  {children}
                </SubjectTableCell>
              </TableRow>
        </>
      )
    }
  
    const TableComp = ({arr, styleAttr}) => {
  
      const tempFunc = (index) => {
        let align = ['right', 'left', 'right', 'left']
        let temp = ''
        if(index === 1) {
          temp = {width : styleAttr[index], align : align[index], padding : 0, margin : 0}
        } else if (index === 3) {
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
          styleAttr = {styleAttr}
        >
        </TableComp>
      </>
    )
}

export default TableWithColon
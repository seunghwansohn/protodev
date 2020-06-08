import React, {
  useEffect, 
  useSelect, 
  useState
}               from "react";
import Button           from '@material-ui/core/Button';

import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableContainer   from '@material-ui/core/TableContainer';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';
import TablePagination  from '@material-ui/core/TablePagination';



import axios    from 'axios';


const TimeLinePage = () => {
  const [rowData, setRowData] = useState([])
  const onClickCheck = () => {
    console.log('버튼투름')
    const config = {
      headers: {
        'x-access-token' : document.cookie
      },
    }
    const data = {
      user : 'brian',
      expenseCode : '202004261055549',
    }
    axios.post('/api/test/group/load', data, config).then(res => {
      console.log(res)
      setRowData(res.data)
    })
  }
  console.log(rowData)
  return(
    <div className="test">
      <Button
       onClick = {onClickCheck}
      >
        확인
      </Button>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                id
              </TableCell>
              <TableCell>
                Group Code
              </TableCell>
              <TableCell>
                Group Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody> 
              {rowData.map(obj => {
                return (
                  <TableRow>
                    {Object.keys(obj).map(key => {
                      return (
                        <TableCell>
                          {obj[key]}
                        </TableCell>
                      )
                    })}

                  </TableRow>

                )
              })}
          </TableBody>


      </Table>
    </div>
  )
}

export default TimeLinePage
import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const ExpenseTable = () => {
 return (
   <>
      바보임?
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>
              헤드첫셀
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              바디첫셀
            </TableCell>
          </TableRow>
        </TableBody>
      </TableContainer>
   </>
 )
}


export default ExpenseTable

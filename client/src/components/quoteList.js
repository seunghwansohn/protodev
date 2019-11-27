import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

const QuoteListComponent = ({pickedItem}) => {
    console.log(pickedItem)
    return(
        <div>
            <hr></hr>
            <h1>Picked Item</h1>
            <Table>
                <TableHead>
                    <TableCell>No</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Qty</TableCell>
                </TableHead>
                <TableBody>
                    <TableCell>{pickedItem}</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Qty</TableCell>
                </TableBody>
            </Table>
        </div>
    )
}

export default QuoteListComponent
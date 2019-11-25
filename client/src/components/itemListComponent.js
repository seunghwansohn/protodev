import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';


const ItemListComponent = ({code, onFetch, itemList}) => {
    const fff = () => {
        console.log(itemList[0].itemName)
    }

    return(
    <div>
         <Table>
            <TableHead>
              <TableCell>No</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Plus</TableCell>
              <TableCell>Minus</TableCell>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell>{itemList[0].itemName}</TableCell>
                <TableCell>{code}</TableCell>
                <TableCell>Ball Valve 1</TableCell>
                <TableCell> <button onClick = {onFetch}>+1</button></TableCell>
                <TableCell> <button onClick = {fff}>-1</button></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    )
}
export default ItemListComponent
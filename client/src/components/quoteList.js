import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Field, reduxForm } from 'redux-form';


const QuoteListComponent = ({pickedItem, pickedCount, qtySubmit}) => {
    let inputQty = ''
    const handleValueSubmit = (e) => {
        e.preventDefault();
        console.log(inputQty)
        // qtySubmit(inputQty)
        console.log(e.target.quantity.value)
        console.log(e.target.id.value)
    }
    const eee = (e) => {
        e.preventDefault();
        inputQty = e.target.value
        console.log(inputQty)

    }
    console.log(pickedItem)
    const pickedItemMap = () => {
        return pickedItem.map((c, index) => {
            return (
                <TableRow key = {index}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.itemCode}</TableCell>
                    <TableCell>{c.itemName}</TableCell>
                    <TableCell>
                        <form onSubmit = {handleValueSubmit} method ="post">
                            <input type="number" name="quantity" onChange = {eee}></input>
                            <input type="hidden" name="id" value={c.id}></input>
                            <input type="submit" name="submit" value= "→"></input>
                            {inputQty}
                            {c.qty}
                        </form>
                    </TableCell>
                </TableRow>
            )
        })
    }
    return(
        <div>
            <hr></hr>
            <h1>Picked Item</h1>
            Number of picked items : {pickedCount}
            <Table>
                <TableHead>
                    <TableCell>No</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Qty</TableCell>
                </TableHead>
                <TableBody>
                    {pickedItemMap()}
                </TableBody>
            </Table>
        </div>
    )
}

export default QuoteListComponent
import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { PdfDocument } from "../pdf/quotation";
import { PdfDocument1 } from "../pdf/quotation1";

const QuoteListComponent = ({pickedItem, pickedCount, qtySubmit}) => {
    let inputQty = ''
    const handleValueSubmit = (e) => {
        e.preventDefault();
        const idQtyObject = {}
        idQtyObject.no = e.target.no.value
        idQtyObject.qty = e.target.quantity.value
        // console.log(idQtyObject.id)
        qtySubmit(idQtyObject)
    }
    const eee = (e) => {
        e.preventDefault();
        inputQty = e.target.value
    }

    const pickedItemMap = () => {
        return pickedItem.map((c, index) => {
            return (
                <TableRow key = {index}>
                    <TableCell>{c.no}</TableCell>
                    <TableCell>{c.itemCode}</TableCell>
                    <TableCell>{c.itemName}</TableCell>
                    <TableCell>
                        <form onSubmit = {handleValueSubmit} method ="post">
                            <input type="number" name="quantity" onChange = {eee}></input>
                            <input type="hidden" name="no" value={c.no}></input>
                            <input type="submit" name="submit" value= "→"></input>
                            {inputQty}
                            {c.qty}
                        </form>
                    </TableCell>
                </TableRow>
            )
        })
    }
    const rrr = () => {
        console.log(pickedItem)
    }
    const df = {
        id : 1
    }
    return(
        <div>

            <hr></hr>
            <h1>Picked Item</h1>
            <button onClick = {rrr}>확인</button>
            Number of picked items : {pickedCount}
            <PDFDownloadLink
          document={<PdfDocument data={pickedItem} />}
          fileName="movielist.pdf"
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#4a4a4a",
            backgroundColor: "#f2f2f2",
            border: "1px solid #4a4a4a"
          }}
        >
          "Download Pdf"
          }
        </PDFDownloadLink>

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
            <PDFViewer>
                <PdfDocument1 />
            </PDFViewer>
        </div>
    )
}

export default QuoteListComponent
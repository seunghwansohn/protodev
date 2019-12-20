import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { PDFDownloadLink,} from "@react-pdf/renderer";
import Viewer from './viewer'
import { MyDocument } from './viewer'

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;



const QuoteListComponent = ({pdfBlobUrl, pickedItem, pickedCount, qtySubmit, dispatch }) => {
    let inputQty = ''
    const handleValueSubmit = (e) => {
        e.preventDefault();
        const idQtyObject = {}
        idQtyObject.no = e.target.no.value
        idQtyObject.qty = e.target.quantity.value
        // console.log(idQtyObject.id)
        qtySubmit(idQtyObject)
    }
    const hadleValueChange = (e) => {
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
                            <input type="number" name="quantity" onChange = {hadleValueChange}></input>
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
    const consoleLogTemp = () => {
        console.log(pickedItem)
    }
    
    const pdfOpen = () => {
        var pdfContents = {
            content: [
                'First paragraph',
                'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
            ]
            
        }
        pdfMake.createPdf(pdfContents).open();
    }


    let abc = ''
    const previewDocument = (pdfContents) => {
        const pdfDocGenerator = pdfMake.createPdf(pdfContents);
        // Get PDF blob and open in new window
       pdfDocGenerator.getBlob((blob) => {
          let blobURL = URL.createObjectURL(blob);
            abc = blobURL;
            console.log(abc)
            dispatch(abc)
        })

        return abc;
    }

 
    return(
        <div>
            <hr></hr><h1>Picked Item</h1><hr></hr>
            <Viewer pdfBlobUrl = {pdfBlobUrl} previewDocument = {previewDocument} dispatch = {dispatch}/>
            <hr></hr>
            <PDFDownloadLink
                document={<MyDocument data={pickedItem} />}
                fileName="movielist.pdf"
                style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#4a4a4a",
                    backgroundColor: "#f2f2f2",
                    border: "1px solid #4a4a4a"
                }}
                >
                Download PDF
            </PDFDownloadLink>
            <hr></hr>
            <button onClick = {consoleLogTemp}>변수확인</button>
            <button onClick = {pdfOpen}>pdf 새창열기</button>            <hr></hr>
            Number of picked items : {pickedCount}
            <hr></hr>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Qty</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pickedItemMap()}
                </TableBody>
            </Table>
        </div>
    )
}

export default QuoteListComponent
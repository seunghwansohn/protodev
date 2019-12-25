import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Viewer from './viewer'
import FindDialog from './findDialog'

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;



const QuoteListComponent = (
    {
        pdfBlobUrl, 
        pickedItem, 
        pickedCount,
        qtySubmit, 
        dispatch, 
        CustomersfetchAction, 
        clients, 
        QuoteListCustomerSelectAction, 
        quoteList 
    }) => {
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
        console.log(clients)
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


    const previewDocument = (pdfContents) => {
        const pdfDocGenerator = pdfMake.createPdf(pdfContents);
        // Get PDF blob and open in new window
       pdfDocGenerator.getBlob((blob) => {
          let blobURL = URL.createObjectURL(blob);
            dispatch(blobURL)
        })
    }

    let willSubmitCustomersName = ''
    const test = e => {
        e.preventDefault()
        console.log(willSubmitCustomersName)
    }
    const FindCustomersHandleValueChange = e => {
        e.preventDefault()
        willSubmitCustomersName = e.target.value
    }
    
  
    return(
        <div>
            <Table>
                <TableRow>
                    <TableCell>
                        <h1>Picked Item</h1>
                    </TableCell>
                    <TableCell>
                        <Viewer pdfBlobUrl = {pdfBlobUrl} previewDocument = {previewDocument} dispatch = {dispatch}/>
                    </TableCell>
                    <TableCell>
                        <form onSubmit={test}>
                            <input type = 'text' name="name" onChange = {FindCustomersHandleValueChange}/>
                            <input type='submit' value = 'select'/>
                        </form>
                    </TableCell>
                    <TableCell>
                        <FindDialog 
                            CustomersfetchAction = {CustomersfetchAction} 
                            clients = {clients} 
                            QuoteListCustomerSelectAction = {QuoteListCustomerSelectAction}
                        />
                    </TableCell>
   
                </TableRow>
            </Table>
            {quoteList.SelectedCustomerCode}
            <br></br>
 
            <br></br>
            <button onClick = {consoleLogTemp}>변수확인</button>
            <button onClick = {pdfOpen}>pdf 새창열기</button>            <br></br>
            Number of picked items : {pickedCount}
            <br></br>
            
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
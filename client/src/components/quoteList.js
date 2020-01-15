import React        from 'react'
import TableRow     from '@material-ui/core/TableRow';
import TableCell    from '@material-ui/core/TableCell';
import Table        from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableHead    from '@material-ui/core/TableHead';
import TableBody    from '@material-ui/core/TableBody';
import Viewer       from './viewer'
// import FindDialog   from './findDialog'
import QuoteSubmit  from './quoteSubmit'
import InputBase    from '@material-ui/core/InputBase';

var pdfMake     = require('pdfmake/build/pdfmake.js');
var pdfFonts    = require('pdfmake/build/vfs_fonts.js');

pdfMake.vfs     = pdfFonts.pdfMake.vfs;

const TotalComponent = (props) => {
    const totalValues = props.quoteTotalValues
    props.onTotalValue()
    return (
        <div>
            Sub Total: {totalValues.subTotal}
            <br></br>
            VAT: {totalValues.vat}
            <br></br>
            Total: {totalValues.total}
        </div>
    )
}

const QuoteListComponent = (props) => {
    let inputQty = ''
    
    const hadleValueChange = (index, e) => {
        e.preventDefault();
        inputQty = Number(e.target.value)
        props.onQtySubmit(index, inputQty)
    }
    const handleDeleteValueSubmit = (e) => {
        e.preventDefault();
        let idQtyObject = ''
        idQtyObject = Number(e.target.no.value)
        props.onDelPickedItem(idQtyObject)
    }
    const handlePRateChange = (index, e) => {
        e.preventDefault()
        const newPRate = Number(e.target.value)
        props.onChangePRate(index, newPRate)
    }
    const pickedItemMap = () => {
        return props.pickedItem.map((c, index) => {
            return (
                <TableRow key = {index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{c.itemName}</TableCell>
                    <TableCell>{c.VNSellingPrice}</TableCell>
                    <TableCell>
                        <input type="number" placeholder = {c.priceRate + '%'} onChange = {(e) => handlePRateChange(index, e)}></input>
                    </TableCell>
                    <TableCell>{c.fixedPrice}</TableCell>
                    <TableCell>
                        <input type="number" placeholder = '0' onChange = {(e) => hadleValueChange(index, e)}></input>
                    </TableCell>
                    <TableCell>{c.price}</TableCell>
                    <TableCell>
                        <form onSubmit = {handleDeleteValueSubmit} method ="post">
                            <input type="hidden" name="no" value={index + 1}></input>
                            <input type="submit" name="submit" value= "delete"></input>
                        </form>
                    </TableCell>
                </TableRow>
            )
        })
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
          props.onInputPdfBlobUrl(blobURL)
        })
    }
    const subTotal = () => {
        if(props.pickedItem[0] !== undefined) {
            let totalValues = {}
            if (props.pickedItem[0].qty !== undefined) {
                let subTotal = 0;
                props.pickedItem.map(pickedItem => {
                    subTotal = subTotal + pickedItem.VNSellingPrice * pickedItem.qty
                })
                let vat = subTotal * 0.1
                let total = subTotal + vat
                totalValues.subTotal = subTotal
                totalValues.vat = vat
                totalValues.total = total
            }
            return totalValues
        }
    }
    const subTotalValue = subTotal()
    
    async function handleKeyPress (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            await props.onFetchClient()
            await props.onDialogOpen(true)
        }
      }
    return(
        <div>
            <Table>
            <TableBody>
            <TableRow>
                <TableCell>
                    <h1>Picked Item</h1>
                </TableCell>
                <TableCell>
                    <Viewer 
                        pdfBlobUrl          = {props.pdfBlobUrl} 
                        previewDocument     = {previewDocument} 
                        onInputPdfBlobUrl   = {props.onInputPdfBlobUrl}
                        pickedItem          = {props.pickedItem}
                        subTotalValue       = {subTotalValue}
                    />
                </TableCell>
                <TableCell><QuoteSubmit pickedItem = {props.pickedItem}></QuoteSubmit></TableCell>
                <TableCell>
                    <InputBase
                        placeholder="Search…"
                        name = "searchKeyword"
                        onKeyPress={handleKeyPress}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </TableCell>
                <TableCell>
                    {/* <FindDialog 
                        onFetchClient       = {props.onFetchClient} 
                        data                = {props.clients.VNbuyer} 
                        onCustomerSelect    = {props.onCustomerSelect}
                        searchObject        = 'VN Buyer'
                        open                = 'false'
                        setOpen             = {props.onDialogOpen}
                    /> */}
                </TableCell>
            </TableRow>
            </TableBody>
            </Table>
            {props.selectedCustomer}
            <button onClick = {pdfOpen}>pdf 새창열기</button>            <br></br>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>VN U/P</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>fixed U/P</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pickedItemMap()}
                </TableBody>
            </Table>
            {/* <TotalComponent quoteTotalValues = {props.quoteTotalValues} onTotalValue = {props.onTotalValue}/> */}
        </div>
    )
}

export default QuoteListComponent
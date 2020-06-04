import React        from 'react'
import TableContainer from '@material-ui/core/TableContainer';
import TableRow     from '@material-ui/core/TableRow';
import TableCell    from '@material-ui/core/TableCell';
import Table from './table/Table1'
import TableHead    from '@material-ui/core/TableHead';
import TableBody    from '@material-ui/core/TableBody';
import Viewer       from './viewer'
import FindDialog   from './dialogs/FindDialog'
import QuoteSubmit  from './quoteSubmit'

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
    const type = 'item'
    return(
        <div>

        </div>
    )
}

export default QuoteListComponent
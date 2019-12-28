import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


// Create styles

// Create Document Component


export const downloadPdfDoc = (contents) => {
  pdfMake.createPdf(contents).download()
}



const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { marginTop: "3%" },
  emphasis: { fontFamily: 'Helvetica-Bold', color: '#F22300' },
  breakable: { width: '100%', height: 800, backgroundColor: 'tomato' },
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog( { pdfBlobUrl, dispatch, pickedItem, subTotalValue }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const mapTemplateVals = () => {
    let templateVals = {}
    if (subTotalValue !== undefined) {
      templateVals = subTotalValue
    }
    return templateVals
  }

  const todayFunction = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      } 
      if (mm < 10) {
        mm = '0' + mm;
      } 
    var todayReturn = dd + '/' + mm + '/' + yyyy;
    return todayReturn
  }
  const today = todayFunction()

  
  const mapTemplateTable = () => {
    const header =
    [
      {text: 'No'}, 
      {text: 'Items'}, 
      {text: 'Specs'},
      {text: 'Origin'},
      {text: 'Unit'},
      {text: 'Qty'},
      {text: 'Unit Price'},
      {text: 'Price'},
      {text: 'remarks'},
    ]
    let templateRows = []
    if (pickedItem[0] !== undefined) {
      const k = pickedItem[0]
      const row = [k.no, k.itemName, '', 'korea', 'pcs', k.qty, k.VNSellingPrice, '', '']
      templateRows = row
    }
    const templateBody = []
    templateBody.push(header)
    templateBody.push(templateRows)
    return templateBody
  }


  const testText = '090909'
  const templateVals = mapTemplateVals()
  const templateTable = mapTemplateTable()
  const textTest = {
    style: 'tableExample',
    table: {
      widths: [12,'*',80,25,20,20,30,35,45],
      headerRows: 1,
      body: templateTable
    },
  }
  var contents = {
    content: [
          
        {
          text: 'Quotation' + testText + '졸라 짜증나네 씨발',
          style: 'header',
          // font:'nanumgothic'
        },

        `Sub Total: ${templateVals.subTotal}`,
        `VAT: ${templateVals.vat}`,
        `Total: ${templateVals.total}`,
        `Item1: ${templateTable}`,
        {
          style: 'tableExample',
          table: {
            widths: [48, 5, '*' ,40,80],
            
            body: [
              ['To', ':','something','Date:', today],
              ['Att', ':','something', '', ''],
              ['Project', ':','something','',''],
              ['Location',':','something' ,'',''],
            ]
          },
          layout: 'noBorders'
        },
        textTest,
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
        'Another paragraph, this time a little bit longer to {make sure, this line will be divided into at least two lines',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus lectus vitae posuere tristique. Phasellus sodales justo at sem pellentesque, pharetra malesuada mi sagittis. Cras rutrum finibus vulputate. Morbi sit amet convallis nisl. Nunc a egestas ipsum, eu auctor odio. Proin sit amet magna sed ex tristique volutpat sed sed tortor. Vivamus tempor est sit amet dui facilisis semper quis et just
  
        Curabitur in dapibus nunc. Etiam non urna ut mauris ultrices placerat vel sit amet ante. Pellentesque eget fermentum enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras convallis id sem in gravida. Suspendisse eleifend rhoncus dui, ac lobortis leo scelerisque eu.
        
        Suspendisse convallis, dolor a venenatis tempus, diam neque vulputate nibh, et finibus nulla massa in purus. Quisque scelerisque metus vitae leo consequat, ac volutpat purus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque id nisl a nisl ultricies dapibus. Sed rutrum metus id nisi varius tristique. Duis et sollicitudin dui, sagittis fringilla nisl. Donec vehicula imperdiet diam eget vulputate. Morbi blandit est sit amet risus semper, vitae convallis tortor condimentum. Nulla euismod ornare commodo. Fusce ornare massa vitae neque fringilla lacinia. Praesent dignissim viverra elementum. Mauris vel odio ut risus dapibus mollis ultricies a turpis. Morbi elementum ex ut ex aliquam vestibulum.
        
        Etiam elit magna, ullamcorper non hendrerit elementum, lobortis eget leo. Ut quis quam efficitur dui gravida vulputate eu vitae nibh. Cras euismod vulputate enim vitae congue. Proin non felis porttitor sem porttitor lacinia. Donec turpis magna, pulvinar eu tortor eget, pulvinar facilisis sem. Pellentesque aliquet leo et pellentesque laoreet. Etiam sit amet malesuada erat, ut viverra sapien. Proin porttitor dui augue, vitae porttitor lectus bibendum eu. Integer non pretium augue. Cras commodo, neque non tincidunt congue, ipsum nisi dignissim nisl, sed mollis elit lacus eget massa. Nunc id lectus rhoncus libero convallis scelerisque.
        
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce aliquam ante sed magna rutrum, at feugiat orci placerat. Vestibulum eget turpis consectetur tellus ultricies commodo id a dui. Quisque nibh eros, consectetur nec aliquet vitae, faucibus et diam. Quisque ac enim ligula. Aliquam sit amet tellus non dui mattis placerat. Quisque malesuada sit amet erat in suscipit. Sed iaculis eu leo quis feugiat. Sed dolor risus, malesuada a tempor sit amet, ullamcorper ut tortor. Praesent efficitur molestie tincidunt.
        
        Generated 5 paragraphs, 405 words, 2755 bytes of Lorem IpsumCurabitur in dapibus nunc. Etiam non urna ut mauris ultrices placerat vel sit amet ante. Pellentesque eget fermentum enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras convallis id sem in gravida. Suspendisse eleifend rhoncus dui, ac lobortis leo scelerisque eu.
        
        Suspendisse convallis, dolor a venenatis tempus, diam neque vulputate nibh, et finibus nulla massa in purus. Quisque scelerisque metus vitae leo consequat, ac volutpat purus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque id nisl a nisl ultricies dapibus. Sed rutrum metus id nisi varius tristique. Duis et sollicitudin dui, sagittis fringilla nisl. Donec vehicula imperdiet diam eget vulputate. Morbi blandit est sit amet risus semper, vitae convallis tortor condimentum. Nulla euismod ornare commodo. Fusce ornare massa vitae neque fringilla lacinia. Praesent dignissim viverra elementum. Mauris vel odio ut risus dapibus mollis ultricies a turpis. Morbi elementum ex ut ex aliquam vestibulum.
        
        Etiam elit magna, ullamcorper non hendrerit elementum, lobortis eget leo. Ut quis quam efficitur dui gravida vulputate eu vitae nibh. Cras euismod vulputate enim vitae congue. Proin non felis porttitor sem porttitor lacinia. Donec turpis magna, pulvinar eu tortor eget, pulvinar facilisis sem. Pellentesque aliquet leo et pellentesque laoreet. Etiam sit amet malesuada erat, ut viverra sapien. Proin porttitor dui augue, vitae porttitor lectus bibendum eu. Integer non pretium augue. Cras commodo, neque non tincidunt congue, ipsum nisi dignissim nisl, sed mollis elit lacus eget massa. Nunc id lectus rhoncus libero convallis scelerisque.
        
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce aliquam ante sed magna rutrum, at feugiat orci placerat. Vestibulum eget turpis consectetur tellus ultricies commodo id a dui. Quisque nibh eros, consectetur nec aliquet vitae, faucibus et diam. Quisque ac enim ligula. Aliquam sit amet tellus non dui mattis placerat. Quisque malesuada sit amet erat in suscipit. Sed iaculis eu leo quis feugiat. Sed dolor risus, malesuada a tempor sit amet, ullamcorper ut tortor. Praesent efficitur molestie tincidunt.
        
        Generated 5 paragraphs, 405 words, 2755 bytes of Lorem Ipsum`
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      },
      tableHeader : {
        fontSize: 8,
        alignment: 'center',
        bold : true
      },
      tableExample : {
        fontSize: 8,
      }
    }
  }

  const previewDocument = (contents, pickedItem) => {
    const fonts = pdfMake.fonts = {
      Roboto: {
              normal: 'nanumgothic.ttf',
              bold: 'nanumgothic.ttf',
              italics: 'nanumgothic.ttf',
              bolditalics: 'nanumgothic.ttf',
              nanumgothic: {
                normal: 'nanumgothic.ttf'
              }
              
        }
    };
    const pdfDocGenerator = pdfMake.createPdf(contents, null, fonts);
    // Get PDF blob and open in new window
    pdfDocGenerator.getBlob((blob) => {
        let blobURL = URL.createObjectURL(blob);
          dispatch(blobURL)
    })
  }
  async function showBBConsole() {
    await previewDocument(contents)
    await handleClickOpen()
  }

  const test = () => {
    console.log(subTotalValue)
  }
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={showBBConsole}>
        Check Pdf
      </Button>
      <Button variant="outlined" color="primary" onClick={test}>
        Check totalvalue
      </Button>
      <Dialog
        TransitionComponent={Transition}
        maxWidth={'md'}
        fullWidth={true}
        scroll={'paper'}
        open={open}
        onClose={handleClose}
      >
        <iframe src ={pdfBlobUrl} height="500px">
        </iframe>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </div>
  );
}

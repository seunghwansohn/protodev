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

  const mapTemplateTable = () => {
    let templateVals = ''
    if (pickedItem[0] !== undefined) {
      templateVals = pickedItem[0].itemName
    }
    return templateVals
  }

  const templateVals = mapTemplateVals()
  const templateTable = mapTemplateTable()
  console.log(templateTable)
  var contents = {
    content: [
        
        `Sub Total: ${templateVals.subTotal}`,
        `VAT: ${templateVals.vat}`,
        `Total: ${templateVals.total}`,
        `Item1: ${templateTable}`,
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?']
            ]
          }
        },
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
    ]
  }

  const previewDocument = (contents, pickedItem) => {
    const pdfDocGenerator = pdfMake.createPdf(contents);
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

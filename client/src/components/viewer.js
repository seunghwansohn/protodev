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
export const MyDocument = () => (
  <Document>
    <Page style={styles.page} size="A4" >
      <Text style={styles.title}>
      This is a This is a This is a This is a 
      This is a This is a This is a This is a 
      This is a This is a This is a This is a 
      This is a This is a This is a This is a 
      This is a This is a This is a This is a 
      This is a This is a This is a This is a 
      This is a This is a This is a This is a 
      This is a This is a This is a This is a 
      </Text>

{/*  
      <Text style={styles.emphasis}>breakable</Text> component made <Text style={styles.emphasis}>unbreakable</Text>. Instead of wrapping between both pages, it jumps straight to the next one</Text>
      <View style={styles.breakable} wrap={false} /> */}
    </Page>
  </Document>
);



const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { marginTop: "3%" },
  emphasis: { fontFamily: 'Helvetica-Bold', color: '#F22300' },
  breakable: { width: '100%', height: 400, backgroundColor: 'tomato' },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog( { pdfBlobUrl, dispatch }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // previewDocument()
  var dd = {
    content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ]
  }

  let abc = ''

  const previewDocument = (dd) => {
    const pdfDocGenerator = pdfMake.createPdf(dd);
    
    // Get PDF blob and open in new window
   pdfDocGenerator.getBlob((blob) => {
      let blobURL = URL.createObjectURL(blob);
        abc = blobURL;
        dispatch(abc)
    })

    return abc;
  }
  // previewDocument(dd)
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth={'sm'}
        fullWidth={false}
      >
             {/* <Button variant="outlined" color="primary" onClick={previewDocument(dd)}>
        Open full-screen dialog
      </Button> */}
        <iframe src ={pdfBlobUrl}>

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

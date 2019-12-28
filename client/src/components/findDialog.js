import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import FindVnBuyer from './clients/vnBuyer'
// Create styles



const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { marginTop: "3%" },
  emphasis: { fontFamily: 'Helvetica-Bold', color: '#F22300' },
  breakable: { width: '100%', height: 800, backgroundColor: 'tomato' },
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog( { pdfBlobUrl, dispatch, CustomersfetchAction, clients, QuoteListCustomerSelectAction}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function showBBConsole() {
    await CustomersfetchAction()
    await handleClickOpen()
  }

  // CustomersfetchAction()
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={showBBConsole}>
        Find
      </Button>
      <Dialog
        TransitionComponent={Transition}
        maxWidth={'md'}
        fullWidth={true}
        scroll={'paper'}
        open={open}
        onClose={handleClose}
      >

        asdflkjasdf
        <FindVnBuyer CustomersfetchAction = {CustomersfetchAction} clients = {clients} QuoteListCustomerSelectAction = {QuoteListCustomerSelectAction}></FindVnBuyer>

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

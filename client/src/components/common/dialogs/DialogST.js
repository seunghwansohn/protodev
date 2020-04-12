import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import camelize from '../../../lib/camelize'
import { useDispatch } from 'react-redux';
import { onDialogClose, onDialogOpen } from '../../../modules/dialogs'


const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function MaxWidthDialog({frameNo, motherNo, attr, children}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [fullWidth, setFullWidth] = React.useState(true);

  const {open, type, funcs, maxWidth, title, scroll, onClose} = attr

  const handleClose = () => {
    const ox = false
    const type = camelize(title)
    let tempObj = {frameNo : frameNo, currentNo : motherNo, type : type, open : false}
    dispatch(onDialogClose(tempObj))
    if (onClose !== undefined) {
      onClose()
    }
  };
  

  const optionFunc = function () { 
    const temp = {}
    if (type === 'addItem') {
        temp.title = 'Add Item'
      }
    return temp
  }
  const option = optionFunc()
  
  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        scroll = {scroll}
      >
        <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
        <DialogContent>
            {children} 

          <DialogContentText>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick = {handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

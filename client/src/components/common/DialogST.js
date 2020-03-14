import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import camelize from '../../lib/camelize'
import { connect, useSelector, useDispatch } from 'react-redux';
import { onDialogOpen } from '../../modules/dialogs'


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

export default function MaxWidthDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [fullWidth, setFullWidth] = React.useState(true);

  const {attr} = props
  const {open, type, funcs, maxWidth, title, scroll, onClose} = attr

  const handleClose = () => {
    const ox = false
    const type = camelize(title)
    dispatch(onDialogOpen(ox,type))
    if (onClose !== undefined) {
      onClose()
    }
  };
  

  const optionFunc = function () { 
    const temp = {}
    if (props.type === 'addItem') {
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
        <DialogTitle id="max-width-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            {props.children}

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

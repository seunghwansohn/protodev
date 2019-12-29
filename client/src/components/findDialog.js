import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog( {mode, data, selection, searchObject, open, setOpen}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function showBBConsole() {
    await mode()
    await handleClickOpen()
  }


  const tableHeadValues = Object.keys(data[0])
  
  const handleValueSubmit = (e) => {
    e.preventDefault()
    selection(e.target.code.value)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={showBBConsole}>
        Find {searchObject}
      </Button>
      <Dialog
        TransitionComponent={Transition}
        maxWidth={'md'}
        fullWidth={true}
        scroll={'paper'}
        open={open}
        onClose={handleClose}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeadValues.map(tableHeadValues => (
                <TableCell>
                  {tableHeadValues}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(data => (
              <TableRow>
                {Object.values(data).map(values => (
                  <TableCell>
                    {values}
                  </TableCell>
                ))}
                  <TableCell>                       
                    <form onSubmit = {handleValueSubmit} method ="post">
                        <input type="hidden" name="code" value={data.code}></input>
                        <button>삽입</button>
                    </form>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close">
          <CloseIcon />
        </IconButton>
      </Dialog>
    </div>
  );
}

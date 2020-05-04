import Checkbox         from '@material-ui/core/Checkbox';
import React, {useEffect, useState} from 'react';
import Dialog             from '@material-ui/core/Dialog';
import Button           from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import TextField          from '@material-ui/core/TextField';
import NoteIcon from '@material-ui/icons/Note';
import Badge from '@material-ui/core/Badge';



const ChkBoxWithAlert = ({motherFrameNo}) => {

    const [open, setOpen]       = useState(false)
    const [checked, setChecked] = useState(false)
    const [memo, setMemo]       = useState('')

    const handleChangeMemo = (e) => {
        setMemo(e.target.value)
    }

    const handleChange = (e) => {
        setChecked(!checked)
        setOpen(true)
    }

    const handleCloseDialog = (e) => {
        setOpen(false)
    }

    return (
        <>  

            <Dialog
                open = {open}
                onClose = {handleCloseDialog}
                maxWidth = 'md'
                fullWidth = 'lg'
            >
                <Typography>Do you agree?</Typography>
                <TextField
                    value = {memo}
                    placeholder="Leave a memo for this approval"
                    multiline
                    rows={10}
                    rowsMax={10}
                    style = {{width : '500px'}}
                    onChange = {handleChangeMemo}
                />

                <Button onClick = {handleCloseDialog}>Close</Button>
            </Dialog>
            <Checkbox
                checked  = {checked}
                onChange = {handleChange}     
            >
            </Checkbox>
            {memo ? 
                <Button>
                    <Badge badgeContent={'t'} color="secondary">
                        <NoteIcon></NoteIcon>
                    </Badge>
                    
                </Button>
            : ''    
        }

        </>
    )
}

export default ChkBoxWithAlert
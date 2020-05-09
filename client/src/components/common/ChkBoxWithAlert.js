import Checkbox         from '@material-ui/core/Checkbox';
import React, {useEffect, useState} from 'react';
import Dialog             from '@material-ui/core/Dialog';
import Button           from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import TextField          from '@material-ui/core/TextField';
import NoteIcon from '@material-ui/icons/Note';
import Badge from '@material-ui/core/Badge';
import CreateIcon from '@material-ui/icons/Create';



const ChkBoxWithAlert = ({
    motherFrameNo, 
    fixMode,
    onChange, 
    onChangeMemo, 
    user,
    onSubmit,
    val,
    attr,
    newMode
}) => {

    const {byCode, checkCode, memoCode} = attr
    const [open, setOpen]       = useState(false)
    const [checked, setChecked] = useState(false)
    const [memo, setMemo]       = useState('')

    const handleChangeMemo = (e) => {
        setMemo(e.target.value)
        onChangeMemo(e)
    }

    const handleChange = (e) => {
        console.log(e.target)
        setChecked(!checked)
        setOpen(true)
        onChange(e)
    }

    console.log(user)

    console.log(val)
    const handleSaveNClose = (e) => {
        onSubmit()
        setOpen(false)
    }

    const handleCloseDialog = (e) => {
        setOpen(false)
    }
    console.log(user)
    console.log(attr)

    console.log(val)

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

                <Button onClick = {handleSaveNClose}>Save & Close</Button>
                <Button onClick = {handleCloseDialog}>Close</Button>
            </Dialog>

            {fixMode || newMode? 
                <>
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
                    {checked ? 
                        user.username
                    : '' 
                    }
                </>

            : 
                <>
                    By: {user.username}
                    {val && val[memoCode] ? 
                    <Button>
                        <NoteIcon></NoteIcon> 
                    </Button> : ''} 
                </>
            }

            {newMode && !memo ?
                <Button>
                    <CreateIcon></CreateIcon> 
                </Button> 
            : ''}


        </>
    )
}

export default ChkBoxWithAlert
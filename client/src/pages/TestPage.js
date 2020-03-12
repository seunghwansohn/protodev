import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Input                                    from '@material-ui/core/Input';


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import produce                                  from 'immer'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const basicBlankTask = {title:'', type : 'basic', urgent : false, staffCode : ''}

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [taskArr, setTaskArr] = React.useState([basicBlankTask]);
  const [anchorEl, setAnchorEl] = React.useState(null);


  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  useEffect(() => {
    const arrLength = taskArr.length
      console.log(taskArr[arrLength -1].title)
    if (taskArr[arrLength -1].title.length == 1) {
      setTaskArr(
        produce(taskArr, draft => {
          draft.push(basicBlankTask)
        })
      );
    }
  },[taskArr[taskArr.length - 1]])

  console.log(taskArr[taskArr.length - 1])

  console.log(taskArr.length)

  const handleArrChange = (e, index) => {
    setTaskArr(
      produce(taskArr, draft => {
        draft[index].title = e.target.value
      }
    ))
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyPress = (e, index)=> {
    if (e.key ==='Tab') {
      e.preventDefault()
      console.log('탭키다운')
      setAnchorEl(e.currentTarget);
      // setTaskArr(
      //   produce(taskArr, draft => {
      //     draft[index].type = 'checkBox'
      //   }
      // ))
    }
    console.log(e.key)
  }
  console.log(taskArr)

  return (
    <React.Fragment>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem>
      </StyledMenu>
      <List className={classes.root}>
        {taskArr.map((obj,index) => {
          const labelId = `checkbox-list-label-${obj.id}`;

          return (
            <ListItem key={obj.id} role={undefined} dense button onClick={handleToggle(obj.id)}>
              {obj.type == 'checkBox' ?               
              <Checkbox
                  edge="start"
                  checked={checked.indexOf(obj.title) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                /> : ''
              }

              <Input type = 'text' id={index} value={obj.title} onKeyDown = {e => handleKeyPress(e, index)} onChange={e => handleArrChange(e, index)}/>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
}


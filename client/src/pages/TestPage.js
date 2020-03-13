import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Input                                    from '@material-ui/core/Input';

import Grid             from '@material-ui/core/Grid';


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ExpantionPane from '../components/common/expantionPane';

import axios from '../lib/api/axios'

import produce                                  from 'immer'
import { setAddNotes } from '../modules/common';

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
  grid: {
    padding: theme.spacing(0),
    textAlign: 'left',
    alignContent: 'center',
    justifyContent : 'center',
    display: 'flex',
    backgroundColor : '#ecdfed',
  },
  paperAlignCenter : {
    padding: theme.spacing(0),
    color : 'black',
    backgroundColor: '#efdbfd',
    justifyContent: 'center',
    display: 'flex',
    fontSize : '18px'
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
  const [projects, setProjects] = React.useState([]);
  const [notes, setNotes] = React.useState([]);

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

  const onClickMenus = () => {
    console.log('메뉴클릭드')
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyPress = (e, index)=> {
    if (e.key ==='Tab') {
      e.preventDefault()
      console.log('탭키다운')
      setAnchorEl(e.currentTarget);
    }

    if (e.key ==='`') {
      e.preventDefault()
      console.log('`키다운`')
      setAnchorEl(e.currentTarget);
    }
    console.log(e.key)
  }
  console.log(taskArr)

  const getProjectData = async () => {
    await axios.get('/api/' + 'project' + '/load').then(res => {
        setProjects(res.data)
    })
  }

  useEffect(() => {
    getProjectData()
  },[])

  console.log(projects)

  return (
    <React.Fragment>
      {projects.length > 0 ? 
        projects.map(project => {
          const {projectName, shortDesc, desc} = project
          return (
            <ExpantionPane 
              title = {projectName} 
              shortDesc = {shortDesc} 
              desc = {desc}
            >
              메에롱개새끼야
            </ExpantionPane>

          )
        }
          
        ) : ''}


      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick = {onClickMenus}>
          <ListItemIcon>
            <CheckBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add Check Box" />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <FormatListNumberedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add Numbered Lists" />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem>
      </StyledMenu>

      <Grid Container Item xs = {12} className = {classes.grid}>
        <Grid item xs = {7} className = {classes.paperAlignCenter}>notes</Grid>
        <Grid item xs = {1} className = {classes.paperAlignCenter}>Brian</Grid>
        <Grid item xs = {1} className = {classes.paperAlignCenter}>Tuyen</Grid>
        <Grid item xs = {1} className = {classes.paperAlignCenter}>Jenny</Grid>
      </Grid>
        {taskArr.map((obj,index) => {
          const labelId = `checkbox-list-label-${obj.id}`;

          return (
            <React.Fragment>
                <Grid Container Item xs = {12} className = {classes.grid}>
                  {obj.type == 'checkBox' ?               
                  <Checkbox
                      edge="start"
                      checked={checked.indexOf(obj.title) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    /> : ''
                  }

                  <Grid item xs = {7} className = {classes.paperAlignCenter}>
                    <Input type = 'text' id={index} value={obj.title} onKeyDown = {e => handleKeyPress(e, index)} onChange={e => handleArrChange(e, index)}/>
                  </Grid>
                  <Grid item xs = {1} className = {classes.paperAlignCenter}>Brian</Grid>
                  <Grid item xs = {1} className = {classes.paperAlignCenter}>Tuyen</Grid>
                  <Grid item xs = {1} className = {classes.paperAlignCenter}>Jenny</Grid>
                </Grid>
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
}


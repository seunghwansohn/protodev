import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';


import { makeStyles }           from '@material-ui/core/styles';
import List                     from '@material-ui/core/List';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemIcon             from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction  from '@material-ui/core/ListItemSecondaryAction';
import ListItemText             from '@material-ui/core/ListItemText';
import FormatListNumberedIcon   from '@material-ui/icons/FormatListNumbered';
import Checkbox                 from '@material-ui/core/Checkbox';
import CheckBoxIcon             from '@material-ui/icons/CheckBox';
import Input                    from '@material-ui/core/Input';
import Grid                     from '@material-ui/core/Grid';
import Button                   from '@material-ui/core/Button';
import InboxIcon                from '@material-ui/icons/MoveToInbox';
import DraftsIcon               from '@material-ui/icons/Drafts';
import SendIcon                 from '@material-ui/icons/Send';
import Menu                     from '@material-ui/core/Menu';
import MenuItem                 from '@material-ui/core/MenuItem';
import Popover                  from '@material-ui/core/Popover';
import Paper                    from '@material-ui/core/Paper';

import FormControl              from '@material-ui/core/FormControl';

import styled, { keyframes } from 'styled-components';

import TextField from '@material-ui/core/TextField';


import { withStyles } from '@material-ui/core/styles';

import ExpantionPane          from '../components/common/expantionPane';
import SingleTask             from '../components/singleTask';
import STTable                from '../components/common/Table1';
import CommentDialog          from '../components/common/CommentDialog';

import { setAddNotes }        from '../modules/common';
import { setFinishTask }      from '../modules/task';


import axios                  from '../lib/api/axios'

import produce                from 'immer'

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

export const ProjectTaskList = () => {
  const classes = useStyles();
  const [checked, setChecked]           = useState([0]);
  const [taskArr, setTaskArr]           = useState([basicBlankTask]);
  const [anchorEl, setAnchorEl]         = useState(null);
  const [projects, setProjects]         = useState([]);
  const [notes, setNotes]               = useState([]);
  const [checkedArr, setCheckedArr]     = useState([]);
  const [dialogOpen, setDialogOpen]     = useState(false)
  const [comment, setComment]           = useState('')
  const [checkedNow, setCheckedNow]     = useState({})

  const dispatch = useDispatch();

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
  }

  const handleArrChange = (e, index) => {
    setTaskArr(
      produce(taskArr, draft => {
        draft[index].title = e.target.value
      }
    ))
  }

  const getProjectTaskListData = async () => {
    await axios.get('/api/' + 'project' + '/load').then(res => {
        setProjects(res.data)
    })
  }

  const onchecked = (ox, project, idx) => {
    console.log(ox, project, idx)
    if (ox) {
      setDialogOpen(true)
      setCheckedNow({ox : ox, project : project, idx : idx})
      setCheckedArr(
        produce(checkedArr, draft => {
          const tempObj = {project : project, idx : idx, submitted : false}
          draft.push(tempObj)
        }
      ))
    } else if (!ox) {
      const tempArr = checkedArr.filter(function(obj) {
        let temp = null
        if(obj.project !== project || obj.idx !== idx) {
          temp = obj
        }
        console.log(temp)
        return temp
      })
      setCheckedArr(tempArr)
    }
  }
  
  const checkIfCheckedBox = () => {
    let ox = false
    if (checkedArr.length > 0){
      ox = true
    }
    return ox
  }

  const onSubmitComment = (event) => {
    event.preventDefault()
    console.log(comment)
  }
  
  const dialogStates = {
    open : dialogOpen
  }

  const dialogSetStates = {
  }

  const dialogFuncs = {
    onChangeComment : function (e) {
      setComment(e.target.value)
    },
    onSolved : function () {
      let tempObj =  checkedNow
      tempObj.comment = comment
      console.log(comment)
      setDialogOpen(false)
      dispatch(setFinishTask(tempObj))
    },
    onDialogClose : function () {
      setDialogOpen(false)
      console.log(comment)
    }
  }

  useEffect(() => {
    getProjectTaskListData()
  },[])

  useEffect(() => {
    const arrLength = taskArr.length
    if (taskArr[arrLength -1].title.length == 1) {
      setTaskArr(
        produce(taskArr, draft => {
          draft.push(basicBlankTask)
        })
      );
    }
  },[taskArr[taskArr.length - 1]])

  useEffect(() => {
    setDialogOpen(checkIfCheckedBox())
  },[checkedArr])

  return (
    <React.Fragment>

      <CommentDialog
        states    = {dialogStates}
        setStates = {dialogSetStates}
        funcs     = {dialogFuncs}
      ></CommentDialog>

      {projects.length > 0 ? 
        projects.map((project, index) => {
          const {projectName, shortDesc, desc, notes} = project
          return (
            <React.Fragment>
              <ExpantionPane 
                title = {projectName} 
                shortDesc = {shortDesc} 
                desc = {desc}
              >
                {notes.length > 0 ? (function () {
                  return (
                    notes.map(note => {
                      console.log(note)
                      return (
                        <SingleTask
                          type        = {projectName}
                          idx         = {index}
                          onchecked   = {onchecked}
                          className   = {classes.grid}
                          rawData     = {note.note}
                        ></SingleTask>
                      )
                    })
                  )
                })()

                :'노트없음'}
              </ExpantionPane>

            </React.Fragment>
          )
        })
      :''}

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
        </StyledMenuItem>T

        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem>
      </StyledMenu>

    </React.Fragment>
  );
}


export default ProjectTaskList

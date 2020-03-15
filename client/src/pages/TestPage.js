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
import TextField                from '@material-ui/core/TextField';
import FormControl              from '@material-ui/core/FormControl';

import { withStyles }           from '@material-ui/core/styles';

import styled, { keyframes }    from 'styled-components';

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
  const dispatch = useDispatch();

  const [projects, setProjects]         = useState([]);
  const [tmpRawData, setTmpRawData]     = useState([]);

  const [checkedArr, setCheckedArr]     = useState([]);
  const [checkedNow, setCheckedNow]     = useState({})
  const [dialogOpen, setDialogOpen]     = useState(false)
  const [comment, setComment]           = useState('')

  const [addedNewTask, setAddedNewTask]     = useState([])

  const getProjectTaskListData = async () => {
    await axios.get('/api/' + 'project' + '/load').then(res => {
        setProjects(res.data)
        setTmpRawData(res.data)
    })
  }

  const onchecked = (ox, project, idx) => {
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
    // console.log(comment)
  }
  
  const addSubTask = (type, idx, id) => {
    // console.log('서브태스크추가', type, idx, id)
    setAddedNewTask(
      produce(addedNewTask, draft => {
        draft.push({type : type, idx : idx, belongedId : id, value : null})
      })
    )
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
      // console.log(comment)
      setDialogOpen(false)
      dispatch(setFinishTask(tempObj))
    },
    onDialogClose : function () {
      setDialogOpen(false)
      // console.log(comment)
    }
  }

  useEffect(() => {
    getProjectTaskListData()
  },[])


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

      {tmpRawData.length > 0 ? 
        tmpRawData.map((project, index) => {
          const {projectName, shortDesc, desc, notes} = project
          return (
            <React.Fragment>
              <ExpantionPane 
                title = {projectName} 
                shortDesc = {shortDesc} 
                desc = {desc}
                addSubTask = {addSubTask}
              >
                {notes.length > 0 ? (function () {
                  return (
                    notes.map((note, index) => {
                      let matchCount = 0
                      let ArrMatched = []
                      addedNewTask.map(obj => {
                        if (obj.belongedId == note.id) {
                          matchCount = matchCount + 1
                          ArrMatched.push(obj)
                        }
                      })
                      return (
                        <SingleTask
                          type        = {projectName}
                          idx         = {index +1}
                          onchecked   = {onchecked}
                          className   = {classes.grid}
                          rawData     = {note}
                          showData    = {note.note}
                          id          = {note.id}
                          addSub      = {addSubTask}
                          subArr      = {ArrMatched}
                        ></SingleTask>
                      )
                    })
                  )
                })()
                :'노트없음'}
                {addedNewTask.map(obj => {
                  return (
                    <SingleTask
                      rawData = {obj}
                    >

                    </SingleTask>
                  )
                })}

              </ExpantionPane>

            </React.Fragment>
          )
        })
      :''}
    </React.Fragment>
  );
}


export default ProjectTaskList

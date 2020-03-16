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
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SingleTask             from '../components/singleTask';
import STTable                from '../components/common/Table1';
import CommentDialog          from '../components/common/CommentDialog';

import { setAddNotes }        from '../modules/common';
import { setFinishTask }      from '../modules/task';

import axios                  from '../lib/api/axios'

import produce                from 'immer'
import { NoMeetingRoom } from '@material-ui/icons';

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

const basicBlankTask = {title:'', projectCode : 'basic', urgent : false, staffCode : ''}

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

  const onAddBlank = (obj) => {
    console.log(tmpRawData)
    let arrNo = null
    let idxArr = []
    tmpRawData.map((rawObj, index) => {
      if (rawObj.projectCode == obj.projectCode) {
        arrNo = index
        rawObj.tasks.map(task => {
          if (obj.level + 1 == task.level) {
            idxArr.push(task.idx)
          }
        })
      }
    })
    console.log(arrNo)
    console.log(idxArr)

    const lastNo = () => {
      return Math.max.apply(null,idxArr)
    }

    let newObj = {projectCode : obj.projectCode, note : null, belongedIdx : obj.idx, idx: lastNo() + 1, level : obj.level + 1}
    console.log(newObj)

    setTmpRawData(
      produce(tmpRawData, draft => {
        draft[arrNo].tasks.push(newObj)
      }
    ))
    // console.log(obj)
  }

  const onSubmitComment = (event) => {
    event.preventDefault()
    // console.log(comment)
  }
  
  const addSubTask = (projectCode, level, belongedIdx, idx) => {
    console.log(projectCode, level, belongedIdx, idx)
    setAddedNewTask(
      produce(addedNewTask, draft => {
        draft.push({projectCode : projectCode, level : level, idx : idx, belongedIdx : idx, value : ''})
      })
    )
  }

  // console.log(tmpRawData)
  // console.log(addedNewTask)

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
          const {projectName, shortDesc, desc, tasks} = project
          const level = 0
          return (
            <React.Fragment key = {index}>
              <ExpantionPane 
                key   = {index}
                title = {projectName} 
                shortDesc = {shortDesc} 
                desc = {desc}
                addSubTask = {addSubTask}
              >
                {tasks.length > 0 ? (function () {
                  let ArrSubLevel = []
                  let idx = ''
                  return (
                    <SingleTask
                      key         = {index}
                      level       = {level}
                      projectCode = {projectName}
                      onchecked   = {onchecked}
                      addSub      = {addSubTask}
                      rawArr      = {tasks}
                      setAddBlank = {onAddBlank}
                      onAddBlank  = {onAddBlank}
                    ></SingleTask>
                  )
                })()
                :'노트없음'}
              </ExpantionPane>

            </React.Fragment>
          )
        })
      :''}
    </React.Fragment>
  );
}


export default ProjectTaskList

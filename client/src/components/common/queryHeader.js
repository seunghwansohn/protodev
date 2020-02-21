import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      display: 'flex'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color : 'white',
        backgroundColor :'#68869A',
        display: 'flex'

    },
}));

const QueryHeader = (props) => {
    const classes = useStyles();

    const {quoteNo, type, funcs} = props
    const { onQuerySubmit } = funcs

    const [clientName, setClientName] = React.useState(null);

    const {selectedClientName, selectedClientRate} = useSelector(({quoteList}) => ({
        selectedClientName : quoteList.query.clients.result.clientName,
        selectedClientRate : quoteList.query.clients.result.clientRate

    }))

    const onClientSubmit = (e) => {
        e.preventDefault()
        const type = 'clients'
        onQuerySubmit(type, clientName)
    }

    const handleValueChange = e => {
        e.preventDefault()
        setClientName(e.target.value)
    }

    return (
        <div className = {classes.root}>

        <Grid container spacing={0}>
            <Grid item xs = {3}> 
                <Paper className={classes.paper}> 
                    <div>Quote No</div>
                    <div>{': '} </div>
                    <div> {quoteNo}</div>
                </Paper>
                <Paper className={classes.paper}> 
                <div>Date</div>
                    <div>{': '} </div>
                    <div> {quoteNo}</div>                
                </Paper>
            </Grid>

            <Grid item xs = {3}> 
                <Paper className={classes.paper}> 
                    Customer: <input type = 'text' onClick = {onClientSubmit} value = {selectedClientName}/>
                </Paper>
                <Paper className={classes.paper}> 
                    Customer Rate: {selectedClientRate}
                </Paper>
            </Grid>

            <Grid item xs = {3}> 
            </Grid>
            <Grid item xs = {3}> 
            </Grid>
        </Grid>
        </div>
    )
}

export default QueryHeader
import React from 'react'
import PropTypes from 'prop-types';
import Table from './common/Table'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from 'react-redux';
import filterArrayBySearchKeyword from '../lib/filterArrayBySearchKeyword'

const Clients = () => {
  return (
    <div>
        <h1>Client</h1>
    </div>
  );
}

export default Clients
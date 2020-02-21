import React from 'react';
import ItemList from '../containers/itemList'
import Quote from '../containers/quote'
<<<<<<< HEAD
// import { withRouter } from 'react-router-dom';


const itemListPage = () => {
  const onOpenDialog = () => {
  }
  return (
    <>
      <ItemList></ItemList>
      <Quote></Quote>
=======

import { withRouter } from 'react-router-dom';


const itemListPage = () => {
  return (
    <>
       <ItemList></ItemList>
       <Quote></Quote>
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
    </>
  );
};

export default itemListPage;

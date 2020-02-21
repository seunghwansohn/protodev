import React from 'react';
import ItemList from '../containers/itemList'
import Quote from '../containers/quote'
// import { withRouter } from 'react-router-dom';


const itemListPage = () => {
  const onOpenDialog = () => {
  }
  return (
    <>
      <ItemList></ItemList>
      <Quote></Quote>
    </>
  );
};

export default itemListPage;

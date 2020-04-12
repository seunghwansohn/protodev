import React from 'react';
import ItemList from '../containers/itemList'
import MakingQuote from '../containers/MakingQuote'
// import { withRouter } from 'react-router-dom';


const itemListPage = () => {
  const onOpenDialog = () => {
  }
  return (
    <>
      <ItemList></ItemList>
      <MakingQuote></MakingQuote>
    </>
  );
};

export default itemListPage;

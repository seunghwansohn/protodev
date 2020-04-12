import React from 'react';
import ItemList from '../containers/ItemList'
import QuoteMaking from '../containers/QuoteMaking'
// import { withRouter } from 'react-router-dom';


const ItemListPage = () => {
  const onOpenDialog = () => {
  }
  return (
    <>
      <ItemList></ItemList>
      <QuoteMaking></QuoteMaking>
    </>
  );
};

export default ItemListPage;

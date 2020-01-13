import React from 'react';
import ItemList from '../containers/itemList'
import { withRouter } from 'react-router-dom';


const itemListPage = () => {
  return (
    <>
       <ItemList></ItemList>
    </>
  );
};

export default itemListPage;

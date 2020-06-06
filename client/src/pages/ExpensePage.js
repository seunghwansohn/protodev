import React from 'react';
import ExpenseList from '../containers/ExpenseList'
import cookieParser from 'cookie-parser'
const ExpensePage = () => {
  console.log(document.cookie)

  return (
    <>
      <ExpenseList></ExpenseList>
    </>
  );
};


export default ExpensePage;

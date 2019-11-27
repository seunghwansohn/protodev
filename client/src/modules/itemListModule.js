const axios = require('axios');

const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';
const APILOAD = 'itemList/APILOAD';

export function fetchAction() {
  return function(callback) {
    return axios.get("/api/customers")
      .then(({ data }) => {
        callback(itemListAction(data));
    });
  };
}

const jfj = [{id : '1', itemName : 'Bvv', itemCode : '코드입니다'}]

let initialState = {
    input:'sdfsdf',
    itemList: jfj,
    searchKeyword: 'initial state 값을 전달받는데 성공',
};

export const search = searchKeyword => ({
  type: SEARCHKEYWORD, 
  searchKeyword
});

export const itemListAction = (itemList) => (
  console.log(itemList),
  {
  type: APILOAD,
  itemList
});

function getUserData() {
  return new Promise((resolve, reject) => {
      axios.get("/api/customers")
        .then(res => resolve(res.data))
        .catch(
          err => reject(err));
  });
};

const inner = getUserData().then(function(userData) {
  console.log(userData)
  initialState = {
    itemList: userData, // ' ' or axios result
  };
  console.log(initialState.itemList)
  return initialState.itemList
}); 

console.log(inner)

function itemListModule (state = initialState, action) {
  switch (action.type) {
      case SEARCHKEYWORD:
        return {
          ...state,
          searchKeyword: action.searchKeyword
        };
      case APILOAD:
        console.log(action.type)
        return {
          ...state,
          itemList: action.itemList
        }
      default:
        return state;
    } 
}

export default itemListModule

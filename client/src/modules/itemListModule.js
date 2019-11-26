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

const initialState = {
    input:'sdfsdf',
    itemList: [{id : '1', itemName : 'Bvv'}],
    searchKeyword: 'initial state 값을 전달받는데 성공',
};

export const search = searchKeyword => ({
  type: SEARCHKEYWORD, 
  searchKeyword
});

export const itemListAction = (itemList) => (
  {
  type: APILOAD,
  itemList
});


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

const axios = require('axios');

const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';
const APILOAD = 'itemList/APILOAD';
const INPUTITEM = 'itemList/INPUTITEM'
const INPUTQTY = 'itemList/INPUTQTY'

export function fetchAction() {
  return function(callback) {
    return axios.get("/api/customers")
      .then(({ data }) => {
        callback(itemListAction(data));
    });
  };
}
export const itemListAction = (itemList) => (
  {
  type: APILOAD,
  itemList
});

var pickedItemArray = []
const jfj = [{id : 1, itemName : 'Bvv', itemCode : '코드입니다'}]

let initialState = {
    input:'sdfsdf',
    itemList: jfj,
    searchKeyword: 'initial state 값을 전달받는데 성공',
    pickedCount: 0,
    pickedItem: [],
};

export const search = searchKeyword => ({
  type: SEARCHKEYWORD, 
  searchKeyword
});

export const inputItemAction = (pickedItem) => (
  console.log(pickedItem),
  pickedItem.qty = 0, 
  pickedItemArray.push(pickedItem),
  
  {
  type: INPUTITEM,
  pickedItemArray
});

export const inputQtyAction = (inputQty) => (
  {type: INPUTQTY,
  inputQty
  }
)
  
function itemListModule (state = initialState, action) {
  switch (action.type) {
      case SEARCHKEYWORD:
        return {
          ...state,
          searchKeyword: action.searchKeyword
        };
      case APILOAD:
        return {
          ...state,
          itemList: action.itemList
        };
      case INPUTITEM:
        return {
          ...state,
          pickedItem: action.pickedItemArray,
          pickedCount: action.pickedItemArray.length
        };
      case INPUTQTY:
        console.log(action.inputQty)
        return {
          ...state,
          pickedItem : {
            qty : action.inputQty
          }
        }
      default:
        return state;
    } 
}

export default itemListModule

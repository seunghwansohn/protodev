import update from 'immutability-helper';

const axios = require('axios');
const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';
const APILOAD = 'itemList/APILOAD';
const INPUTITEM = 'itemList/INPUTITEM'
const INPUTQTY = 'itemList/INPUTQTY'
const INPUTPDFBLOBURL = 'itemList/INPUTPDFBLOBURL'

export function fetchAction() {
  return function(callback) {
    return axios.get("/api/customers")
      .then(({ data }) => {
        callback(itemListAction(data))
    });
  };
}
export const itemListAction = (itemList) => (
  {
    type: APILOAD,
    itemList
});

let initialState = {
    input:'',
    itemList: [],
    searchKeyword: 'initial state 값을 전달받는데 성공',
    pickedCount: 0,
    pickedItem: [],
    pdfBlobUrl:'dfaefae'
};

export const search = searchKeyword => (
  {
  type: SEARCHKEYWORD, 
  searchKeyword
});

export const inputItemAction = (pickedItem) => (
  {
  type: INPUTITEM,
  pickedItem
});

export const inputQtyAction = (inputQty) => (
  {type: INPUTQTY,
  inputQty
  }
)

export const inputPdfBlobUrl = (blobUrl) => (
  {type: INPUTPDFBLOBURL,
  blobUrl
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

      case INPUTQTY:
        let no = action.inputQty.no - 1
        return update(state, {
          pickedItem: {
            [no]: {
              qty : {$set:action.inputQty.qty}
            }
          }
        })
      case INPUTITEM:
        return update(state, {
          pickedItem: {$push : [action.pickedItem]}
      })
      case INPUTPDFBLOBURL:
        console.log(action)
        return {
          ...state,
          pdfBlobUrl : action.blobUrl
        }
      default:
        return state;
    } 
}

export default itemListModule

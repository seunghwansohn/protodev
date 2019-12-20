import produce from 'immer'

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
        return produce(state, draft =>{
          draft.searchKeyword = action.searchKeyword
        })       
      case APILOAD:
        return produce(state, draft =>{
          draft.itemList = action.itemList
        })
      case INPUTQTY:
        let no = action.inputQty.no - 1
        return produce(state, draft => {
          draft.pickedItem[no].qty = action.inputQty.qty
        })
      case INPUTITEM:
        return produce(state, draft => {
          draft.pickedItem.push(action.pickedItem)
        })
      case INPUTPDFBLOBURL:
        return produce(state, draft => {
          draft.pdfBlobUrl = action.blobUrl
        })  
      default:
        return state;
    } 
}

export default itemListModule

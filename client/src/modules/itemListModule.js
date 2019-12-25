import produce from 'immer'

const axios = require('axios');
const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';
const APILOAD = 'itemList/APILOAD';
const INPUTITEM = 'itemList/INPUTITEM'
const INPUTQTY = 'itemList/INPUTQTY'
const INPUTPDFBLOBURL = 'itemList/INPUTPDFBLOBURL'
const SETSEARCHINGNOW = 'itemList/SETSEARCHINGNOW'
const FETCHVNCUSTOMERS = 'itemList/FETCHVNCUSTOMERS'
const QUOTELISTSELECTCUSTOMER = 'itemList/QUOTELISTSELECTCUSTOMER'

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

export function CustomersfetchAction() {
  return function(callback) {
    return axios.get("/api/VNCustomers")
      .then(({ data }) => {
        callback(CustomersAction(data))
    });
  };
}
export const CustomersAction = (VNCustomersList) => (
  {
    type: FETCHVNCUSTOMERS,
    VNCustomersList
});

export const QuoteListCustomerSelectAction = (SelectedCustomerCode) => (
  {
    type: QUOTELISTSELECTCUSTOMER,
    SelectedCustomerCode
})

let initialState = {
    mainSearchBar : 
      {
        searchKeyword: '',
      },
    itemList: [],
    pickedCount: 0,
    pickedItem: [],
    pdfBlobUrl:'dfaefae',
    searchingNow: false,
    clients : {
      VNbuyer : [{id: 'DTE', ENName : 'DATA GROUP', VNName : 'Data iii', MST : '33759298', RecentNews : 'established'}, {id:'', name: 'Entec'}],
      KRseller : [{id: 'JU', name : 'Jaeung'}, {id:'EnT', name: 'Entec'}]
    },
    quoteList:{
      SelectedCustomerCode : 'sdfsdf'
    }
};

export const search = searchKeyword => (
  {
  type: SEARCHKEYWORD, 
  searchKeyword,
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
export const setSearchingNow = (ox) => (
  {type: SETSEARCHINGNOW,
  ox
  }
)
function itemListModule (state = initialState, action) {
  switch (action.type) {
      case SEARCHKEYWORD:
        console.log(action.searchKeyword)
        return produce(state, draft =>{
          console.log(state)
          draft.mainSearchBar.searchKeyword = action.searchKeyword
          draft.searchingNow = true
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
      case SETSEARCHINGNOW:
        return produce(state, draft => {
          draft.searchingNow = action.ox
        })  
      case FETCHVNCUSTOMERS:
        return produce(state, draft => {
          draft.clients.VNbuyer = action.VNCustomersList
        }) 
      case QUOTELISTSELECTCUSTOMER:
        console.log(action)
        return produce(state, draft => {
          draft.quoteList.SelectedCustomerCode = action.SelectedCustomerCode
        }) 
      default:
        return state;
    } 
}

export default itemListModule

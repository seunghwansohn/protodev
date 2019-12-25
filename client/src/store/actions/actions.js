export const axios = require('axios');
export const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';
export const APILOAD = 'itemList/APILOAD';
export const INPUTITEM = 'itemList/INPUTITEM'
export const INPUTQTY = 'itemList/INPUTQTY'
export const INPUTPDFBLOBURL = 'itemList/INPUTPDFBLOBURL'
export const SETSEARCHINGNOW = 'itemList/SETSEARCHINGNOW'
export const FETCHVNCUSTOMERS = 'itemList/FETCHVNCUSTOMERS'
export const QUOTELISTSELECTCUSTOMER = 'itemList/QUOTELISTSELECTCUSTOMER'

export const itemListAction = (itemList) => ({
      type: APILOAD,
      itemList
});
export function fetchAction() {
    return function(callback) {
      return axios.get("/api/customers")
        .then(({ data }) => {
          callback(itemListAction(data))
      });
    };
  }
export function CustomersfetchAction() {
    return function(callback) {
        return axios.get("/api/VNCustomers")
        .then(({ data }) => {
            callback(CustomersAction(data))
        });
    };
}
export const CustomersAction = (VNCustomersList) => ({
    type: FETCHVNCUSTOMERS,
    VNCustomersList
});

export const QuoteListCustomerSelectAction = (SelectedCustomerCode) => ({
    type: QUOTELISTSELECTCUSTOMER,
    SelectedCustomerCode
})
export const search = searchKeyword => ({
    type: SEARCHKEYWORD, 
    searchKeyword,
});
export const inputItemAction = (pickedItem) => ({
    type: INPUTITEM,
    pickedItem
});
export const inputQtyAction = (inputQty) => ({
    type: INPUTQTY,
    inputQty
})
export const inputPdfBlobUrl = (blobUrl) => ({
    type: INPUTPDFBLOBURL,
    blobUrl
})
export const setSearchingNow = (ox) => ({
    type: SETSEARCHINGNOW,
    ox
})
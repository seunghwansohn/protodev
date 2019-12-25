const axios = require('axios');
export const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';
export const APILOAD = 'itemList/APILOAD';

export const INPUTQTY = 'quoteList/INPUTQTY'
export const PICKITEM = 'quoteList/PICKITEM'
export const INPUTPDFBLOBURL = 'itemList/INPUTPDFBLOBURL'
export const SETSEARCHINGNOW = 'itemList/SETSEARCHINGNOW'
export const FETCHVNCUSTOMERS = 'itemList/FETCHVNCUSTOMERS'
export const QUOTELISTSELECTCUSTOMER = 'itemList/QUOTELISTSELECTCUSTOMER'

export const search = searchKeyword => ({type: SEARCHKEYWORD, searchKeyword});
export const setSearchingNow = (ox) => ({type: SETSEARCHINGNOW, ox})

export const itemListFetchAction = (itemList) => ({type: APILOAD, itemList});
export const alreadyPickedCheck = (pickedItem) => ({type: PICKITEM, pickedItem})

export const CustomersAction = (VNCustomersList) => ({type: FETCHVNCUSTOMERS, VNCustomersList});
export const QuoteListCustomerSelectAction = (SelectedCustomerCode) => ({type: QUOTELISTSELECTCUSTOMER, SelectedCustomerCode});
export const inputQtyAction = (inputQty) => ({type: INPUTQTY, inputQty})
export const inputPdfBlobUrl = (blobUrl) => ({type: INPUTPDFBLOBURL, blobUrl})
export const inputItemAction = (pickedItem) => ({type: PICKITEM, pickedItem});


export function fetchAction() {
    return function(callback) {
      return axios.get("/api/customers")
        .then(({ data }) => {
          callback(itemListFetchAction(data))
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





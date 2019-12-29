const axios = require('axios');
export const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';
export const APILOAD = 'itemList/APILOAD';

export const INPUTQTY = 'quoteList/INPUTQTY'
export const PICKITEM = 'quoteList/PICKITEM'
export const DELITEM = 'quoteLIst/DELITEM'
export const CHANGEPRATE = 'quoteList/CHANGEPRATE'
export const TOTAL_VALUE = 'quoteList/TOTAL_VALUE'

export const INPUTPDFBLOBURL = 'itemList/INPUTPDFBLOBURL'
export const SETSEARCHINGNOW = 'itemList/SETSEARCHINGNOW'
export const FETCHVNCUSTOMERS = 'clients/FETCHVNCUSTOMERS'
export const QUOTELISTSELECTCUSTOMER = 'itemList/QUOTELISTSELECTCUSTOMER'

export const ON_DIALOG_OPEN  = 'dialog/ON_DIALOG_OPEN'

export const search = searchKeyword => ({type: SEARCHKEYWORD, searchKeyword});
export const setSearchingNow = (ox) => ({type: SETSEARCHINGNOW, ox})

export const itemListFetchAction = (itemList) => ({type: APILOAD, itemList});
export const alreadyPickedCheck = (pickedItem) => ({type: PICKITEM, pickedItem})

export const CustomersAction = (VNCustomersList) => ({type: FETCHVNCUSTOMERS, VNCustomersList});
export const QuoteListCustomerSelectAction = (SelectedCustomerCode) => ({type: QUOTELISTSELECTCUSTOMER, SelectedCustomerCode});
export const inputQtyAction = (index, inputQty) => ({type: INPUTQTY, index, inputQty})
export const inputPdfBlobUrl = (blobUrl) => ({type: INPUTPDFBLOBURL, blobUrl})
export const inputItemAction = (pickedItem) => ({type: PICKITEM, pickedItem});
export const delItemAction = (pickedItemNo) => ({type : DELITEM, pickedItemNo})
export const changePRate = (index, rate) => ({type : CHANGEPRATE, index, rate})
export const totalValue = () => ({type : TOTAL_VALUE})

export const onDialogOpen = (ox) => ({type: ON_DIALOG_OPEN, ox})

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




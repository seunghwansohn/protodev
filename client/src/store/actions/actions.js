const axios = require('axios');
export const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';
export const APILOAD = 'itemList/APILOAD';

export const INPUTQTY = 'quoteList/INPUTQTY'
export const PICKITEM = 'quoteList/PICKITEM'
export const DELITEM = 'quoteLIst/DELITEM'
export const CHANGEPRATE = 'quoteList/CHANGEPRATE'
export const TOTAL_VALUE = 'quoteList/TOTAL_VALUE'

export const ON_INPUT_PDF_BLOB_URL = 'itemList/ON_INPUT_PDF_BLOB_URL'
export const SETSEARCHINGNOW = 'itemList/SETSEARCHINGNOW'
export const FETCHVNCUSTOMERS = 'clients/FETCHVNCUSTOMERS'
export const QUOTELISTSELECTCUSTOMER = 'itemList/QUOTELISTSELECTCUSTOMER'

export const ON_DIALOG_OPEN  = 'dialog/ON_DIALOG_OPEN'

export const onSearch = searchKeyword => ({type: SEARCHKEYWORD, searchKeyword});
export const onSetSearchingNow = (ox) => ({type: SETSEARCHINGNOW, ox})

export const itemListFetchAction = (itemListArr) => ({type: APILOAD, itemListArr});
export const onAlreadyPickedCheck = (pickedItem) => ({type: PICKITEM, pickedItem})

export const CustomersAction = (VNCustomersList) => ({type: FETCHVNCUSTOMERS, VNCustomersList});
export const QuoteListCustomerSelectAction = (SelectedCustomerCode) => ({type: QUOTELISTSELECTCUSTOMER, SelectedCustomerCode});
export const inputQtyAction = (index, inputQty) => ({type: INPUTQTY, index, inputQty})
export const onInputPdfBlobUrl = (blobUrl) => ({type: ON_INPUT_PDF_BLOB_URL, blobUrl})
export const inputItemAction = (pickedItem) => ({type: PICKITEM, pickedItem});
export const delItemAction = (pickedItemNo) => ({type : DELITEM, pickedItemNo})
export const changePRate = (index, rate) => ({type : CHANGEPRATE, index, rate})
export const totalValue = () => ({type : TOTAL_VALUE})

export const onDialogOpen = (ox) => ({type: ON_DIALOG_OPEN, ox})

export function onFetchItem() {
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




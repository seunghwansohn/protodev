import produce from 'immer'
import * as actionTypes from '../actions/actions';

const initialState = {
    itemList: [],
    pickedCount: 0,
    pdfWorks : 
      {
        pdfBlobUrl : ''
      },
    quoteList:{
      SelectedCustomerCode : 'sdfsdf'
    }
};

function reducer (state = initialState, action) {
  switch (action.type) {
      case actionTypes.APILOAD:
        return produce(state, draft =>{
          draft.itemList = action.itemList
        })

      case actionTypes.INPUTPDFBLOBURL:
        return produce(state, draft => {
          draft.pdfWorks.pdfBlobUrl = action.blobUrl
        })  
      case actionTypes.FETCHVNCUSTOMERS:
        return produce(state, draft => {
          draft.clients.VNbuyer = action.VNCustomersList
        }) 
      case actionTypes.QUOTELISTSELECTCUSTOMER:
        return produce(state, draft => {
          draft.quoteList.SelectedCustomerCode = action.SelectedCustomerCode
        }) 
      default:
        return state;
    } 
}

export default reducer

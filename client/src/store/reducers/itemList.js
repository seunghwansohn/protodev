import produce from 'immer'
import * as actionTypes from '../actions/actions';

const initialState = {
    itemListArr: [],
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
        console.log('푸하히더')
        return produce(state, draft =>{
          draft.itemListArr = action.itemListArr
        })

      case actionTypes.ON_INPUT_PDF_BLOB_URL:
        return produce(state, draft => {
          draft.pdfWorks.pdfBlobUrl = action.blobUrl
        })  


      default:
        return state;
    } 
}

export default reducer

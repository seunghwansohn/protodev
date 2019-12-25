import produce from 'immer'
import * as actionTypes from '../actions/actions';

const initialState = {
    pickedCount: 0,
    pickedItem:[],
    pdfWorks : 
      {
        pdfBlobUrl : ''
      },
    clients : {
      VNbuyer : [{id: 'DTE', ENName : 'DATA GROUP', VNName : 'Data iii', MST : '33759298', RecentNews : 'established'}, {id:'', name: 'Entec'}],
      KRseller : [{id: 'JU', name : 'Jaeung'}, {id:'EnT', name: 'Entec'}]
    },
    quoteList:{
      SelectedCustomerCode : 'sdfsdf'
    }
};
function reducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.INPUTQTY:
          let no = action.inputQty.no - 1
          return produce(state, draft => {
            draft.pickedItem[0].no = 3
          })
        case actionTypes.PICKITEM:
            console.log(action)
        return produce(state, draft => {
            draft.pickedItem.push(action.pickedItem)
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

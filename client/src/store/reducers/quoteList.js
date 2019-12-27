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
      SelectedCustomerCode : 'none'
    }
};
function reducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.INPUTQTY:
          let no = action.inputQty.no - 1
          console.log(typeof action.inputQty.qty)
          return produce(state, draft => {
            draft.pickedItem[no].qty = action.inputQty.qty
            draft.pickedItem[no].price = action.inputQty.qty * draft.pickedItem[no].VNSellingPrice
          })
        case actionTypes.PICKITEM:
            console.log(action)
            let pickedItemArray = state.pickedItem
            let number = state.pickedItem.length
            let nowPickedItemId = action.pickedItem.id
            const alreadyCheck = (pickedItemArray, number, nowPickedItemId) => {
              const found = pickedItemArray.some(el => el.id === nowPickedItemId);
              if (!found) {
                action.pickedItem.no = number + 1
                return false
              } else if (found) {
                return true
              }
            }
            const checkIf = alreadyCheck(pickedItemArray, number, nowPickedItemId)
            if (!checkIf) {
              return produce(state, draft => {
              draft.pickedItem.push(action.pickedItem)
              })
            } else if (checkIf) {
              console.log('이미 값이 있음')
            }
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
        case actionTypes.DELITEM:
          console.log(action)
          return produce(state, draft => {
            draft.pickedItem.splice(action.pickedItemNo - 1, 1)
          })
          
        default:
          return state;
    } 
}


  // console.log(id.no)
//검색어 결과로 filtered된 배열값이 아래의 변수이름임

export default reducer

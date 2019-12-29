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
    SelectedCustomerCode : 'none',
    quoteTotalValues :  {
      subTotal : 0,
      vat :  0,
      Total : 0,
  }
};
function reducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.INPUTQTY:
          let no = action.index
          return produce(state, draft => {
            const rate = (draft.pickedItem[no].priceRate * 0.01) + 1
            draft.pickedItem[no].qty = action.inputQty
            draft.pickedItem[no].price = action.inputQty * draft.pickedItem[no].fixedPrice
          })

        case actionTypes.PICKITEM:
            let pickedItemArray = state.pickedItem
            let number = state.pickedItem.length
            let nowPickedItemId = action.pickedItem.id
            const alreadyCheck = (pickedItemArray, number, nowPickedItemId) => {
              const found = pickedItemArray.some(el => el.id === nowPickedItemId);
              if (!found) {
                action.pickedItem.no = number + 1 //no처음규정됨.
                action.pickedItem.priceRate = 0
                action.pickedItem.fixedPrice = action.pickedItem.VNSellingPrice
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
            draft.SelectedCustomerCode = action.SelectedCustomerCode
          }) 
        case actionTypes.DELITEM:
          const newLength = state.pickedItem.length - 1
          const startNo = action.pickedItemNo + 1
          const Produce = (state) => {
            return produce(state, draft => {
              for (let i=startNo; i < newLength; i++) {
                return draft.pickedItem[0].no = 9
              }
              draft.pickedItem.splice(action.pickedItemNo - 1, 1)
            })
          }

          return Produce(state)

        case actionTypes.CHANGEPRATE:
          const index = action.index
          return produce(state, draft => {
            const rate = (action.rate * 0.01) + 1
            draft.pickedItem[index].priceRate = action.rate
            draft.pickedItem[index].fixedPrice = 10000*(Math.round((draft.pickedItem[index].VNSellingPrice * rate)/10000))
            draft.pickedItem[index].price = draft.pickedItem[index].qty * draft.pickedItem[index].fixedPrice
            
          })
        
        case actionTypes.TOTAL_VALUE:
          let totalValues = {}
          totalValues.subTotal = 0
          state.pickedItem.map(pickedItem => {
            totalValues.subTotal = totalValues.subTotal + pickedItem.price
          })
          totalValues.vat = totalValues.subTotal * 0.1
          totalValues.total = totalValues.subTotal + totalValues.vat
          return produce(state, draft => {
            draft.quoteTotalValues.subTotal = totalValues.subTotal
            draft.quoteTotalValues.vat = totalValues.vat
            draft.quoteTotalValues.total = totalValues.total
            }) 
          
        case actionTypes.QUOTELISTSELECTCUSTOMER:
          return produce(state, draft => {
            draft.quoteList.SelectedCustomerCode = action.SelectedCustomerCode
          }) 
        default:
          return state;
    } 
}


  // console.log(id.no)
//검색어 결과로 filtered된 배열값이 아래의 변수이름임

export default reducer

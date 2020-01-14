import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';

export const quoteSELECTCUSTOMER = 'quote/quoteSELECTCUSTOMER'
export const INPUTQTY = 'quote/INPUTQTY'
export const PICKITEM = 'quote/PICKITEM'
export const DELITEM = 'quote/DELITEM'
export const CHANGEPRATE = 'quote/CHANGEPRATE'
export const TOTAL_VALUE = 'quote/TOTAL_VALUE'
export const ON_INPUT_PDF_BLOB_URL = 'itemList/ON_INPUT_PDF_BLOB_URL'




export const TEST = 'login/TEST'


export const onAlreadyPickedCheck = createAction(PICKITEM, pickedItem => pickedItem);
export const inputQtyAction = (index, inputQty) => ({type: INPUTQTY, index, inputQty})
export const onCustomerSelect = (SelectedCustomerCode) => ({type: quoteSELECTCUSTOMER, SelectedCustomerCode});

export const onInputPdfBlobUrl = (blobUrl) => ({type: ON_INPUT_PDF_BLOB_URL, blobUrl})
export const onDelPickedItem = (pickedItemNo) => ({type : DELITEM, pickedItemNo})
export const onChangePRate = (index, rate) => ({type : CHANGEPRATE, index, rate})
export const totalValue = () => ({type : TOTAL_VALUE})


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
    },
    quoteTotalValues :  {
        subTotal : 0,
        vat :  0,
        Total : 0,
    }
};


function reducer (state = initialState, action) {
    switch (action.type) {
        case INPUTQTY:
          let no = action.index
          return produce(state, draft => {
            draft.pickedItem[no].qty = action.inputQty
            draft.pickedItem[no].price = action.inputQty * draft.pickedItem[no].fixedPrice
          })
        case PICKITEM:
            const pickedItem = action.payload
            let pickedItemArray = state.pickedItem
            let number = state.pickedItem.length
            let nowPickedItemId = pickedItem.id
            const alreadyCheck = (pickedItemArray, number, nowPickedItemId) => {
              const found = pickedItemArray.some(el => el.id === nowPickedItemId);
              if (!found) {
                pickedItem.no = number + 1 //no처음규정됨.
                pickedItem.priceRate = 0
                pickedItem.fixedPrice = pickedItem.VNSellingPrice
                return false
              } else if (found) {
                return true
              }
            }
            const checkIf = alreadyCheck(pickedItemArray, number, nowPickedItemId)
            if (!checkIf) {
              return produce(state, draft => {
              draft.pickedItem.push(pickedItem)
              })
            } else if (checkIf) {
              console.log('이미 값이 있음')
            }
        case onInputPdfBlobUrl:
          return produce(state, draft => {
            draft.pdfWorks.pdfBlobUrl = action.blobUrl
          })  

        case quoteSELECTCUSTOMER:
          return produce(state, draft => {
            draft.SelectedCustomerCode = action.SelectedCustomerCode
          }) 
        case DELITEM:
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

        case CHANGEPRATE:
          const index = action.index
          return produce(state, draft => {
            const rate = (action.rate * 0.01) + 1
            draft.pickedItem[index].priceRate = action.rate
            draft.pickedItem[index].fixedPrice = 10000*(Math.round((draft.pickedItem[index].VNSellingPrice * rate)/10000))
            draft.pickedItem[index].price = draft.pickedItem[index].qty * draft.pickedItem[index].fixedPrice
            
          })
        
        case TOTAL_VALUE:
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
          
        case quoteSELECTCUSTOMER:
          return produce(state, draft => {
            draft.quote.SelectedCustomerCode = action.SelectedCustomerCode
          }) 
     
        case ON_INPUT_PDF_BLOB_URL:
            return produce(state, draft => {
              draft.pdfWorks.pdfBlobUrl = action.blobUrl
            })  
            
        default:
          return state;
    } 
}


  // console.log(id.no)
//검색어 결과로 filtered된 배열값이 아래의 변수이름임

export default reducer

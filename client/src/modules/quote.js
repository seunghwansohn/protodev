import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';
import * as quote                                      from '../lib/api/quote';
import { takeLatest, call }                           from 'redux-saga/effects';
import {getDate_yyyymmdd} from '../lib/getDate'

export const quoteSELECTCUSTOMER = 'quoteList/quoteSELECTCUSTOMER'
export const INPUTQTY = 'quoteList/INPUTQTY'
export const PICKITEM = 'quoteList/PICKITEM'
export const DELITEM = 'quoteList/DELITEM'
export const CHANGEPRATE = 'quoteList/CHANGEPRATE'
export const TOTAL_VALUE = 'quoteList/TOTAL_VALUE'
export const ON_INPUT_PDF_BLOB_URL = 'itemList/ON_INPUT_PDF_BLOB_URL'
export const SET_QUOTELIST_HEADER = 'quoteList/SET_QUOTELIST_HEADER'
export const TEST = 'login/TEST'
export const SET_ADD_HEADER = 'quoteList/SET_ADD_HEADER'
export const ADD_STORE_VALUE = 'quoteList/ADD_STORE_VALUE'
export const SET_HEADER = 'quoteList/SET_HEADER'
export const SET_SELECTED_ITEMS = 'quoteList/SET_SELECTED_ITEMS'
export const SET_INPUT_CHANGE = 'quoteList/SET_INPUT_CHANGE'
export const QUERY_SUBMIT = 'quoteList/QUERY_SUBMIT'
export const SET_INSERT_CLIENT = 'quoteList/SET_INSERT_CLIENT'
export const SET_SUBMIT = 'quoteList/SET_SUBMIT'

export const SET_UPDATE_CHANGE      = 'quoteList/SET_UPDATE_CHANGE'
export const SET_CLICKED_TABLE_COL  = 'quoteList/SET_CLICKED_TABLE_COL'


const [SET_ADD, SET_ADD_SUCCESS, SET_ADD_FAILURE ] 
= createRequestActionTypes('quoteList/SET_ADD');
const [SET_UPDATE, SET_UPDATE_SUCCESS, SET_UPDATE_FAILURE ] 
= createRequestActionTypes('quoteList/SET_UPDATE');
const [SET_LOAD, SET_LOAD_SUCCESS, SET_LOAD_ADD_FAILURE ] 
= createRequestActionTypes('quoteList/SET_LOAD');
const [SET_DELETE, SET_DELETE_SUCCESS, SET_DELETE_FAILURE ] 
= createRequestActionTypes('quoteList/SET_DELETE');

const [RECORD_QUOTE, RECORD_QUOTE_SUCCESS, RECORD_QUOTE_FAILURE ] = createRequestActionTypes('quoteList/RECORD_QUOTE');

export const onAlreadyPickedCheck = createAction(PICKITEM, pickedItem => pickedItem);
export const setQuoteListHeader = createAction(SET_QUOTELIST_HEADER, header => header)
export const setAddHeader = createAction(SET_ADD_HEADER, header => header)
export const addStoreValue = createAction(ADD_STORE_VALUE, value => value);
export const setHeader = createAction(SET_HEADER, columns => columns)
export const setSelectedItems = createAction(SET_SELECTED_ITEMS, items => items)
export const setInputChange = createAction(SET_INPUT_CHANGE, ({id, name, value}) => ({id, name, value}))
export const recordQuote = createAction(RECORD_QUOTE)
export const querySubmit = createAction(QUERY_SUBMIT, ({type, payload})=> ({type, payload}))
export const setInsertClient = createAction(SET_INSERT_CLIENT, clientCode => clientCode)
export const actSubmit = createAction(SET_SUBMIT, obj => obj)

export const actAdd             = createAction(SET_ADD, (addedNew, includingKeys) => ({addedNew, includingKeys}))
export const actLoad            = createAction(SET_LOAD)
export const actUpdate          = createAction(SET_UPDATE, arr => arr)
export const actUpdateChange    = createAction(SET_UPDATE_CHANGE, ox => ox)
export const actClickedTableCol = createAction(SET_CLICKED_TABLE_COL, obj => obj)
export const actDelete          = createAction(SET_DELETE, (type, code) => ({type, code}))

const recordQuoteSaga = createRequestSaga(RECORD_QUOTE, quote.recordQuote);

export const inputQtyAction = (index, inputQty) => ({type: INPUTQTY, index, inputQty})
export const onCustomerSelect = (SelectedCustomerCode) => ({type: quoteSELECTCUSTOMER, SelectedCustomerCode});

export const onInputPdfBlobUrl = (blobUrl) => ({type: ON_INPUT_PDF_BLOB_URL, blobUrl})
export const onDelPickedItem = (pickedItemNo) => ({type : DELITEM, pickedItemNo})
export const onChangePRate = (index, rate) => ({type : CHANGEPRATE, index, rate})
export const totalValue = () => ({type : TOTAL_VALUE})

export function* quoteSaga() {
  yield takeLatest(RECORD_QUOTE, recordQuoteSaga);
}


const initialState = {
    pickedCount: 0,
    table : {
      contents:[],
      header : [],
      totalValues :  {
        subTotal : 0,
        vat :  0,
        Total : 0,
      },
      info : {
        date : '',
        quoteLastNo : ''
      }
    },
    query : {
      clients : {
        request : '',
        result : {}
      },
    },
    pdfWorks : 
      {
        pdfBlobUrl : ''
      },
    clients : {
      VNbuyer : [{id: 'DTE', ENName : 'DATA GROUP', VNName : 'Data iii', MST : '33759298', RecentNews : 'established'}, {id:'', name: 'Entec'}],
      KRseller : [{id: 'JU', name : 'Jaeung'}, {id:'EnT', name: 'Entec'}]
    },
    SelectedCustomerCode : 'none',
};


function reducer (state = initialState, action) {
    switch (action.type) {
        case INPUTQTY:
          let no = action.index
          return produce(state, draft => {
            draft.table.contents[no].qty = action.inputQty
            draft.table.contents[no].price = action.inputQty * draft.table.contents[no].fixedPrice
          })
        case PICKITEM:
            const pickedItem = action.payload
            let tempPickedItem = {}
            
            let pickedItemArray = state.table.contents
            let alreadyPickedNumber = state.table.contents.length
            let nowPickedItemId = pickedItem.itemCode
            const alreadyCheck = (pickedItemArray, alreadyPickedNumber, nowPickedItemId) => {
            const found = pickedItemArray.some(el => el.itemCode === nowPickedItemId);
            if (!found) {
                Object.keys(pickedItem).map(key => {
                  tempPickedItem[key] = pickedItem[key]
                })
                tempPickedItem.id = alreadyPickedNumber + 1 //no처음규정됨.
                tempPickedItem.priceRate = null
                tempPickedItem.qty = null
                tempPickedItem.amount = null
                tempPickedItem.quotePrice = null
                
                return false
              } else if (found) {
                return true
              }
            }
            const date = getDate_yyyymmdd()
            const quoteLastNo = '001'
            const checkIf = alreadyCheck(pickedItemArray, alreadyPickedNumber, nowPickedItemId)
            if (!checkIf) {
              return produce(state, draft => {
                draft.table.contents.push(tempPickedItem)
                draft.table.info.date = date
                draft.table.info.quoteLastNo = quoteLastNo
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
        case SET_QUOTELIST_HEADER:
            return produce(state, draft => {
              draft.header = action.payload
            }) 
        case SET_ADD_HEADER:
            return produce(state, draft =>{
              draft.header.push(action.payload)
            })
        case SET_HEADER:
          return produce(state, draft => {
            draft.table.header = action.payload
          })
        case SET_INPUT_CHANGE:
          return produce(state, draft => {
            const {id, name, value} = action.payload
            if (action.payload.name == 'priceRate') {
              draft.table.contents[id-1][name] = Number(value)
            } else {
              draft.table.contents[id-1][name] = value
            }

            draft.table.contents[id-1].quotePrice = Math.round(draft.table.contents[id-1].VNPrice * ((1 + draft.table.contents[id-1].priceRate * 0.01)))
            draft.table.contents[id-1].amount = draft.table.contents[id-1].qty *draft.table.contents[id-1].quotePrice
            let subTotal = 0
            draft.table.contents.map(item => {
              subTotal = subTotal + item.amount
            })
            draft.table.totalValues.subTotal = subTotal
            draft.table.totalValues.VAT = Math.round(subTotal * 0.1)
            draft.table.totalValues.total = Math.round(subTotal * 1.1)
          })
        case QUERY_SUBMIT:
          return produce(state, draft => {
            const payload = action.payload
            draft.query[payload.type].request = payload.payload
          })
        case SET_INSERT_CLIENT:
          return produce(state, draft => {
            draft.query.clients.result = action.payload
          })

        case SET_SUBMIT:
          return produce(state, draft => {
            draft.requested = action.payload
            console.log(action.payload)
          })
          
        default:
          return state;
    } 
}

export default reducer

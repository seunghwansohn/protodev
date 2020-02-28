import produce                                        from 'immer'
import { createAction, handleActions }                from 'redux-actions';
import { takeLatest, call }                           from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';
import * as item                                      from '../lib/api/item';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import monolizeObj from '../lib/monolizeObj'

toast.configure()


const [APILOAD, APILOAD_SUCCESS, APILOAD_FAILURE ] 
= createRequestActionTypes('itemList/APILOAD');
const [NEWITEM, NEWITEM_SUCCESS, NEWITEM_FAILURE ] 
= createRequestActionTypes('itemList/NEWITEM');
const [NEWCOPIED, NEWCOPIED_SUCCESS, NEWCOPIED_FAILURE ] 
= createRequestActionTypes('itemList/NEWCOPIED');
const [SETSUBMITADDITEM, SETSUBMITADDITEM_SUCCESS, SETSUBMITADDITEM_FAILURE ] 
= createRequestActionTypes('itemList/SETSUBMITADDITEM');

const apiLoadSaga   = createRequestSaga(APILOAD, item.load);
const newItemSaga   = createRequestSaga(NEWITEM, item.newItem);
const newCopiedSaga = createRequestSaga(NEWCOPIED, item.newCopied);
const addItemSaga   = createRequestSaga(SETSUBMITADDITEM, item.addItem);

export const CLICK_BUTTON_HEADER      = 'item/CLICK_BUTTON_HEADER'
export const IS_THERE_SELECTED        = 'item/IS_THERE_SELECTED'
export const SELECT_ITEMS             = 'item/SELECT_ITEMS'
export const CHANGE_NEW_ITEM_SPECS    = 'item/CHANGE_NEW_ITEM_SPECS'
export const SET_HEADER               = 'item/SET_HEADER'
export const SET_SELECTED_ITEMS       = 'item/SET_SELECTED_ITEMS'
export const SET_ITEM_QUERY_INIT_LOAD = 'item/SET_ITEM_QUERY_INIT_LOAD'

export const setApiLoad         = createAction(APILOAD)
export const setNewItem         = createAction(NEWITEM, (newItemValues) => (newItemValues))
export const checkedItem        = createAction(NEWCOPIED, itemCode => itemCode)
export const IsThereSelected    = createAction(IS_THERE_SELECTED, ox => ox)
export const selectItems        = createAction(SELECT_ITEMS, newSelected => newSelected)
export const clickButtonHeader  = createAction(CLICK_BUTTON_HEADER, type => type)
export const changeNewItemSpecs = createAction(CHANGE_NEW_ITEM_SPECS, spec => spec)
export const setHeader          = createAction(SET_HEADER, columns => columns)
export const setSelectedItems   = createAction(SET_SELECTED_ITEMS, items => items)
export const setSubmitAddItem   = createAction(SETSUBMITADDITEM, item => item)

export function* itemsSaga() {
  yield takeLatest(APILOAD, apiLoadSaga);
  yield takeLatest(NEWITEM, newItemSaga);
  yield takeLatest(NEWCOPIED, newCopiedSaga);
  yield takeLatest(SETSUBMITADDITEM, addItemSaga);
}

const initialState = {
    pickedCount: 0,
    pdfWorks : 
      {
        pdfBlobUrl : ''
      },
    quoteList:{
      SelectedCustomerCode : 'sdfsdf'
    },
    addItem : {
      copiedItem : ''
    },
    headerButton : {
      clicked : '',
    },
    dialogs : {
      opened : [],
      closed : []
    },
    table : {
      contents: [],
      header: [],
      isThereSelected : '',
      selectedItem : []
    },
};

function reducer (state = initialState, action) {
  switch (action.type) {

      case APILOAD_SUCCESS:
        const newItemListArr = []
        const itemListArr = action.payload
        itemListArr.map(itemList => {
          let newItemList = monolizeObj(itemList)
          newItemListArr.push(newItemList)
        })
        return produce(state, draft =>{
          draft.table.contents = newItemListArr
        })

      case CLICK_BUTTON_HEADER:
        const type = action.payload
        switch(type) {
          case 'itemAdd' :
            return produce(state, draft =>{
              if (!draft.dialogs.opened.includes(type)) {
                draft.dialogs.opened.push(type)
              }
                draft.headerButton.clicked = type
            })
          case 'check' :
            return produce(state, draft =>{
              if (!draft.dialogs.opened.includes(type)) {
                draft.dialogs.opened.push(type)
              }
                draft.headerButton.clicked = type
            })
        default: 
            return state;
        }
      
      case NEWCOPIED_SUCCESS:
        return produce(state, draft => {
          draft.addItem.copiedItem = action.payload
        })

      case NEWITEM_SUCCESS:
        if (action.meta.data.error.length > 0){
          toast(action.meta.data.error[0].message)
        }
        return produce(state, draft => {
          if (action.payload == '성공') {
            toast('New item successfully added!')
          }
        })

      case NEWITEM_FAILURE:
        return produce(state, draft => {
          if (action.payload == '성공') {
            toast('New item successfully added!')
          }
        }) 
      
      case IS_THERE_SELECTED:
        return produce(state, draft =>{
          draft.table.isThereSelected = action.payload})

      case SELECT_ITEMS:
        return produce(state, draft => {
          draft.table.selectedItem = action.payload})

      case CHANGE_NEW_ITEM_SPECS:
        return produce(state, draft => {
          draft.addItem.copiedItem = action.payload
        })
      
      case SET_HEADER:
        return produce(state, draft => {
          draft.table.header = action.payload
        })

      case SET_SELECTED_ITEMS:
        return produce(state, draft => {
          draft.table.selectedItem = action.payload
        })
      case SETSUBMITADDITEM_SUCCESS:
        return produce(state, draft => {
        })
      case SETSUBMITADDITEM_FAILURE:
        return produce(state, draft => {
        })
  
      default:
        return state;
    } 
}

export default reducer

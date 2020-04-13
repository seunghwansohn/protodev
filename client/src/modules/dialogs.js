import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call }                           from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';


const initialState = {
    opened : []
};

export const ON_DIALOG_OPEN  = 'dialog/ON_DIALOG_OPEN'
export const ON_DIALOG_CLOSE  = 'dialog/ON_DIALOG_CLOSE'

export const onDialogOpen = createAction(ON_DIALOG_OPEN, obj => obj)
export const onDialogClose = createAction(ON_DIALOG_CLOSE, obj => obj)

function reducer (state = initialState, action) {
  switch (action.type) {
    case ON_DIALOG_OPEN:
      return produce(state, draft =>{
        if (!draft.opened.includes(action.payload)) {
          draft.opened.push(action.payload)
        }
      })
    case ON_DIALOG_CLOSE:
      const {frameNo, currentNo, type, open} = action.payload
      const isMatched = (obj) => {
        return obj.frameNo !== frameNo && obj.currentNo !== currentNo && obj.type !== type
      }
      return produce(state, draft =>{
        const filtered = draft.opened.filter(isMatched)
        draft.opened = filtered
      })

    default:
      return state;
  } 
}

export default reducer

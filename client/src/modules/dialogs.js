import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call }                           from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';


const initialState = {
    opened : []
};

export const ON_DIALOG_OPEN  = 'dialog/ON_DIALOG_OPEN'
export const ON_DIALOG_CLOSE  = 'dialog/ON_DIALOG_CLOSE'

export const actDialogOpen = createAction(ON_DIALOG_OPEN, obj => obj)
export const actDialogClose = createAction(ON_DIALOG_CLOSE, obj => obj)

function reducer (state = initialState, action) {
  switch (action.type) {
    case ON_DIALOG_OPEN:
      return produce(state, draft =>{

        if (!draft.opened.includes(action.payload)) {
          let {frameNo, currentNo, motherNo, currentType, clickType} = action.payload
          let checkDupe = (obj) => {
            let matchedCount = 0
            draft.opened.map(obj => {
              if (obj.frameNo == frameNo && obj.currentNo == currentNo && obj.motherNo == motherNo &&  obj.currentType == currentType &&  obj.clickType == clickType) {
                matchedCount = matchedCount + 1
              }
            })
            if (matchedCount == 0) {
              draft.opened.push(action.payload)
            }
          }
          checkDupe(action.payload)
        }
      })
    case ON_DIALOG_CLOSE:
      const {frameNo, currentNo, currentType, clickedType} = action.payload
      console.log(action.payload)

      return produce(state, draft =>{
        draft.opened = draft.opened.filter(function(obj){
          return obj.frameNo !== frameNo || obj.currentNo !== currentNo || obj.currentType !== currentType
        })
        // draft.opened = filtered
      })

    default:
      return state;
  } 
}

export default reducer

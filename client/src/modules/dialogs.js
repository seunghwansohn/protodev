import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call }                           from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';


const initialState = {
    opened : []
};

export const ON_DIALOG_OPEN  = 'dialog/ON_DIALOG_OPEN'
export const onDialogOpen = createAction(ON_DIALOG_OPEN, ox => ox, (ox, type, payload) => ({ox, type, payload}))


// const [ON_DIALOG_OPEN, ON_DIALOG_OPEN_SUCCESS, ON_DIALOG_OPEN_FAILURE ] 
// = createRequestActionTypes('dialog/ON_DIALOG_OPEN');

// const dialogLoadInitSaga = createRequestSaga(ON_DIALOG_OPEN, item.addItem);


// export function* dialogSaga() {
//   yield takeLatest(ON_DIALOG_OPEN, dialogLoadInitSaga);
// }

function reducer (state = initialState, action) {
  switch (action.type) {
      case ON_DIALOG_OPEN:
        return produce(state, draft =>{
            console.log(action.meta)
            const temp = {}
            if (action.meta.type == 'copyItem') {
              temp.type = 'itemAdd'
            }

            if (action.meta.type == 'itemQuery') {
              temp.type = 'itemQuery'
              temp.initVal = action.meta.payload
            }
            
            else {temp.type = action.meta.type}

            if (action.meta.ox == true) {
              temp.ox = action.meta.ox
              draft.opened.push(temp)

            } else if (action.meta.ox == false){
              state.opened.map((dialog, index) => {
                if (dialog.type == action.meta.type) {
                  delete draft.opened[index]
                }
              })
            }
        })
      default:
        return state;
    } 
}

export default reducer

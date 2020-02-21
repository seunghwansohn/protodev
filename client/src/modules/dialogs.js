import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';


const initialState = {
    opened : []
};

export const ON_DIALOG_OPEN  = 'dialog/ON_DIALOG_OPEN'
export const onDialogOpen = createAction(ON_DIALOG_OPEN, ox => ox, (ox, type) => ({ox, type}))


function reducer (state = initialState, action) {
  switch (action.type) {
      case ON_DIALOG_OPEN:
        return produce(state, draft =>{
            const temp = {}
            if (action.meta.type == 'copyItem') {
              temp.type = 'itemAdd'
            }
            else {temp.type = action.meta.type}
            temp.ox = action.meta.ox
            draft.opened.push(temp)
        })
      default:
        return state;
    } 
}

export default reducer

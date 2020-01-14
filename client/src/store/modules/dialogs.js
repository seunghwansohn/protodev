import produce from 'immer'

const initialState = {
    findDialogsOpen : {
        VNBuyers : false
    }
};

export const ON_DIALOG_OPEN  = 'dialog/ON_DIALOG_OPEN'
export const onDialogOpen = (ox) => ({type: ON_DIALOG_OPEN, ox})


function reducer (state = initialState, action) {
  switch (action.type) {
      case ON_DIALOG_OPEN:
        return produce(state, draft =>{
            draft.findDialogsOpen.VNBuyers = action.ox
        })
      default:
        return state;
    } 
}

export default reducer

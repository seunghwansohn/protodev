import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';


const initialState = {
    opened : []
};

export const HEADER_BUTTON_CLICK  = 'dialog/HEADER_BUTTON_CLICK'
export const headerButtonClick = createAction(HEADER_BUTTON_CLICK, ox => ox, (ox, type) => ({ox, type}))


function reducer (state = initialState, action) {
    switch (action.type) {
            case HEADER_BUTTON_CLICK:
                switch(action.meta.type) {
                    case 'Copy Item':
                        return produce(state, draft => {
                            const temp = {}
                        })
                
                default:
                    return
            return state;
        } 
    }
}

export default reducer

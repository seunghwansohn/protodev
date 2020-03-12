import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, takeEvery, call }                           from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';
import * as common                                    from '../lib/api/common';


const initialState = {
    opened : [],
    update : {}
};

const [SET_ADD_NOTES, SET_ADD_NOTES_SUCCESS, SET_ADD_NOTES_FAILURE ] 
= createRequestActionTypes('common/SET_ADD_NOTES');
const [SET_LOAD_NOTES, SET_LOAD_NOTES_SUCCESS, SET_LOAD_NOTES_FAILURE ] 
= createRequestActionTypes('common/SET_LOAD_NOTES');

export const SET_UPDATED  = 'common/SET_UPDATED'

const addNotesSaga  = createRequestSaga(SET_ADD_NOTES, common.addNotes);
const loadNotesSaga = createRequestSaga(SET_LOAD_NOTES, common.loadNotes);

export const setAddNotes    = createAction(SET_ADD_NOTES, (obj) => (obj))
export const setLoadNotes   = createAction(SET_LOAD_NOTES, (type) => (type))
export const setUpdated     = createAction(SET_UPDATED, ({type, ox}) => ({type, ox}))

export function* commonSaga() {
    yield takeLatest(SET_ADD_NOTES, addNotesSaga)
    yield takeLatest(SET_LOAD_NOTES, loadNotesSaga)

}

function reducer (state = initialState, action) {
  switch (action.type) {
        case SET_ADD_NOTES_SUCCESS:
            return produce(state, draft => {
                draft.update[action.payload.type] = true
            }
        )

        case SET_UPDATED:
            return produce(state, draft => {
                console.log(action.payload)
                draft.update[action.payload.type] = action.payload.ox
            }
        )

      default:
        return state;
    } 
}

export default reducer

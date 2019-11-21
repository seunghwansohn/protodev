import {createAction, handleActions} from 'redux-actions'

const SEARCH = 'itemList/SEARCH'

export const search = createAction(SEARCH, searchKeyword => searchKeyword)

const initialState = {
    searchKeyword: '',
};

const ItemLIstModule = handleActions (
    {
        [SEARCH]: (state, action) => ({searchKeyword : state.searchKeyword}),
    },
    initialState,
)

export default ItemLIstModule

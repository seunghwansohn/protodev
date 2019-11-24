const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';

const initialState = {
    input:'sdfsdf',
    itemList: [
    ],
    searchKeyword: 'initial state 값을 전달받는데 성공',
};

export const search = searchKeyword => ({
  type: SEARCHKEYWORD, 
  searchKeyword
});

function itemList (state = initialState, action) {
    switch (action.type) {
      case SEARCHKEYWORD:
        return {
          ...state,
          searchKeyword: 'dflkjdflkjsd'
        };
      default:
        return state;
    } 
}

export default itemList

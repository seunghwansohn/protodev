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
        console.log(action)
        return {
          // ...state,
          searchKeyword: action.searchKeyword
        };
      default:
        return state;
    } 
}

export default itemList

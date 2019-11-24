const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';

const initialState = {
    input:'sdfsdf',
    itemList: [
    ],
    searchKeyword: 'dfefef',
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

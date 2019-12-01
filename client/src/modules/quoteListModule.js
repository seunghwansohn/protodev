const INPUTITEM = 'quoteList/INPUTITEM'

let initialState = {
  pickedItem: [{id : 0, itemCode : 'asdf', itemName : 'eflkjef'}],
};

const pickedItemArray = []

export const inputItemAction = (pickedItem) => (
  pickedItemArray.push(pickedItem),
  {
  type: INPUTITEM,
  pickedItemArray
});
  

function quoteListModule (state = initialState, action) {
  switch (action.type) {
      case INPUTITEM:
          console.log(action.pickedItemArray)
          return {
            ...state,
            pickedItem: action.pickedItemArray
          }
      default:
        return state;
    } 
}

export default quoteListModule

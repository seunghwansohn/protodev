export const selectMultipleStates = (key, defaultArr, state, setFuncs) => {
    const hidedIndex = state.indexOf(key);
    let newHided = [];
    if (defaultArr !== null && defaultArr !== undefined) {
      newHided = defaultArr
    }
    if (hidedIndex === -1) {
      newHided = newHided.concat(state, key);
    } else if (hidedIndex === 0) {
      newHided = newHided.concat(state.slice(1));
    } else if (hidedIndex === state.length - 1) {
      newHided = newHided.concat(state.slice(0, -1));
    } else if (hidedIndex > 0) {
      newHided = newHided.concat(
        state.slice(0, hidedIndex),
        state.slice(hidedIndex + 1),
      );
    }
    var filtered = newHided.filter(function (el) {
      return el != null;
    });
    setFuncs(filtered);
}

const handleClickFlag = (event, name, itemCode, state, setState) => {
    const selectedIndex = state.indexOf(itemCode);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(state, itemCode);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(state.slice(1));
    } else if (selectedIndex === state.length - 1) {
      newSelected = newSelected.concat(state.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        state.slice(0, selectedIndex),
        state.slice(selectedIndex + 1),
      );
    }
    setState(newSelected);
};
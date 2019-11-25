const axios = require('axios');

const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';
const APILOAD = 'itemList/APILOAD';

const callApi = async (callback) => {    //node.js api 서버를 호출하는 함수. async는 비동기 처리를 위한 것
  const response = await fetch('/api/customers');
  const body = await response.json();  //json 형식으로 받아 body라는 변수에 저장
  callback(body)
  return body; //body를 return하여 callApi라는 메소드의 값으로 반환
}


export function apiLoad() {
  return function(dispatch) {
    return axios.get("/api/customers")
      .then(({ data }) => {
        dispatch(apiLoad1(data));
    });
  };
}

const initialState = {
    input:'sdfsdf',
    itemList: [{id : '1', itemName : 'Bvv'}],
    searchKeyword: 'initial state 값을 전달받는데 성공',
};

export const search = searchKeyword => ({
  type: SEARCHKEYWORD, 
  searchKeyword
});

export const apiLoad1 = (itemList) => (
  {
  type: APILOAD,
  itemList
});


function itemList (state = initialState, action) {
  let result = []
    
  switch (action.type) {
      case SEARCHKEYWORD:
        return {
          ...state,
          searchKeyword: action.searchKeyword
        };
      case APILOAD:
        console.log('adpi로드로드중')
        console.log(itemList)
        return {
          ...state,
          itemList: action.itemList
        }
        // callApi(function(body1) {
        //   return body1
        //  })
        // return {
        //   ...state,
        //   itemList: callApi(function(body1) {
        //     return body1
        //    })
        // }
        
       
      default:
        return state;
    } 
}

export default itemList

const axios = require('axios');

// export const fetchArticleDetails = () => {
//   return function(dispatch) {
//     return axios.get("/api/customers")
//       .then(({ data }) => {
//       dispatch(setArticleDetails(data));
//     });
//   };
// }

const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';
const APILOAD = 'itemList/APILOAD';

const initialState = {
    input:'sdfsdf',
    itemList: [{id : 1, itemName : 'BVV'}
    ],
    searchKeyword: 'initial state 값을 전달받는데 성공',
};

export const search = searchKeyword => ({
  type: SEARCHKEYWORD, 
  searchKeyword
});

export const apiLoad = () => ({
  type: APILOAD,
  itemList
});


const callApi = async (callback) => {    //node.js api 서버를 호출하는 함수. async는 비동기 처리를 위한 것
  const response = await fetch('/api/customers');
  const body = await response.json();  //json 형식으로 받아 body라는 변수에 저장
  callback(body)
  return body; //body를 return하여 callApi라는 메소드의 값으로 반환
}

function itemList (state = initialState, action) {
    switch (action.type) {
      case SEARCHKEYWORD:
        return {
          ...state,
          searchKeyword: action.searchKeyword
        };
      case APILOAD:
        // let result = ''
        // console.log('adpi로드로드중')
        // result = callApi(function(body1) {
        //   return body1
        //  })
        return {
          ...state,
          itemList: [{id: 'dfadsfe', itemName: 'asdflkjasdf'}]
        }
        
       
      default:
        return state;
    } 
}

export default itemList

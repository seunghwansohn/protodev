import axios from 'axios';

const client = axios.create({
  validateStatus: function (status) {
       return status == 200;
   },
});
/*
  글로벌 설정 예시:
  
  // API 주소를 다른 곳으로 사용함
  client.defaults.baseURL = 'https://external-api-server.com/' 

  // 헤더 설정
  client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

  // 인터셉터 설정
  */
// axios.intercepter.response.use(
//   response => {
//     // 요청 성공 시 특정 작업 수행
//     return response;
//   }, 
//   error => {
//     // 요청 실패 시 특정 작업 수행
//     return Promise.reject(error);
//   }
// )  

export const axiosPost = async (addr, req) => {
  var strr = ''
  await axios.post(addr, req).then(function(res){
    strr = res
  })
  return strr
}

export default client;

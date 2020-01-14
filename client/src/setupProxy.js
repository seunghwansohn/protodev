//http-proxy-middleware 패키지를 통해 프록시를 구성할 때 반드시 이 파일명으로 src 폴더에 넣어야 함.
//걍 외우면 됨.

const proxy = require('http-proxy-middleware'); //프록시를 위한 패키지 로드

module.exports = function(app) {
  app.use(
    proxy('/query/*', {                 //node.js로 구성한 api서버의 리퀴스트 주소
      target: 'http://localhost:5000/',       //node.js 서버의 포트 규정
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api_s/customers', {                 //node.js로 구성한 api서버의 리퀴스트 주소
      target: 'http://localhost:5000/',       //node.js 서버의 포트 규정
      changeOrigin: true
    })
  );

  app.use(
    proxy('/api/items', {                 //node.js로 구성한 api서버의 리퀴스트 주소
      target: 'http://localhost:4000/',       //node.js 서버의 포트 규정
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api/auth/login', {                 //node.js로 구성한 api서버의 리퀴스트 주소
      target: 'http://localhost:4000/',       //node.js 서버의 포트 규정
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api/auth/register', {                 //node.js로 구성한 api서버의 리퀴스트 주소
      target: 'http://localhost:4000/',       //node.js 서버의 포트 규정
      changeOrigin: true
    })
  );
};
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer, { rootSaga} from './store/modules/';
// import { tempSetUser, check } from './store/modules/user';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(sagaMiddleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// function loadUser() {
//   console.log('로드유저실행중')
//   try {
//     const user = localStorage.getItem('user');
//     console.log('로컬스토리지유저', user)
//     if (!user) return; // 로그인 상태가 아니라면 아무것도 안함

//     store.dispatch(tempSetUser(user));
//     store.dispatch(check());
//   } catch (e) {
//     console.log('localStorage is not working');
//   }
// }

sagaMiddleware.run(rootSaga);
// loadUser();


ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );

serviceWorker.unregister();

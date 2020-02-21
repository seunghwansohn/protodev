import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
<<<<<<< HEAD
import rootReducer, { rootSaga} from './modules/';
import { tempSetUser, check } from './modules/user';
=======
import rootReducer, { rootSaga} from './store/modules/';
import { tempSetUser, check } from './store/modules/user';
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(sagaMiddleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안함
<<<<<<< HEAD
    store.dispatch(tempSetUser(user));
    const checkObject = {username : user}
    store.dispatch(check(checkObject));
=======

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
  } catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();


ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );

serviceWorker.unregister();

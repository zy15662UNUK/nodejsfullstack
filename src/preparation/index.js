import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from './preparation/App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './preparation/config'; // 意思是直接在这里运行config.js
import Auth from './preparation/Auth';
import Dashboard from './preparation/Dashboard';
const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension? window.devToolsExtension(): () => {}
        )
);
// function render () {
//     ReactDOM.render(
//         <Provider store={store}>
//             <App/>
//         </Provider>
// ,
//         document.getElementById('root')
//     );
// }
// store.subscribe(render); // 给store注册监听器，一旦state发生变化就调用传入的函数，也就是重新渲染
// render();
ReactDOM.render(
    <Provider store={store}>
        <App/>
        <BrowserRouter>
            <Switch>
                <Route path='/auth' component={Auth}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

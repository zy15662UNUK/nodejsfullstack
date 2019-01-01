/*
* 当state有多个的时候，就需要通过合并reducers来合并state。将他们写在一个专门的js中
* */
import {combineReducers} from 'redux';

import {reducerCounter} from './index.redux';
import {reducerAuth} from './Auth.redux';

export default combineReducers({reducerAuth, reducerCounter});
import axios from 'axios';
import {redirPath} from '../utils';
const ERROR = 'ERROR';
const REGISTER_OR_LOGIN_SUCCESS = 'SUCCESS';
const USER_DATA = 'USER_DATA';
const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
const LOG_OUT = 'LOGOUT';
const initState = {user: '', password: '', isAuth: false, type: '', msg: '', redirTo: ''};

// reducer
export function user(state=initState, action) {
    switch (action.type) {
        case ERROR:
            return {...state, msg: action.payload};
        case REGISTER_OR_LOGIN_SUCCESS:
            return {...state, isAuth: true, ...action.payload, msg: '', redirTo: redirPath(action.payload)};
        case USER_DATA:
            return {...state, isAuth: true, ...action.payload, msg: ''};
        case UPDATE_SUCCESS:
            return {...state, isAuth: true, ...action.payload, msg: '', redirTo: redirPath(action.payload)};
        case LOG_OUT:
            return {...initState, redirTo: '/login'}; // 退出登录时恢复初始设置即可
        default:
            return state;
    }
}

// action creator
function errMsg(msg) {
    return {type: ERROR, payload: msg};
}

// 暴露给用户的触发action的方法
export function register({user, password, repeatpwd, type}) {
    if (!user || !password || !type) {
        return errMsg('用户名和密码不能为空!');
    }
    if (password !== repeatpwd) {
        return errMsg('密码输入不一致！');
    }
    return dispatch => {
        axios.post('/user/register', {user, password, type})
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        dispatch({type: REGISTER_OR_LOGIN_SUCCESS, payload: {user, password, type}})
                    }else {
                        dispatch(errMsg(res.data.msg));
                    }
                }
            });
    };
}

export function login({user, password}) {
    if (!user || !password) {
        return errMsg('用户名和密码不能为空!');
    }
    return dispatch => {
        axios.post('/user/login', {user, password})
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        let d = res.data.data;
                        d.password = '';
                        dispatch({type: REGISTER_OR_LOGIN_SUCCESS, payload: d});
                    }else {
                        dispatch(errMsg(res.data.msg));
                    }
                }
            });
    };
}

// 用于AuthRouter中验证cookies的。如果cookie存在则将用户信息添加到redux中。否则跳转到登陆页面
export function loadData(d) {
    d.password = '';
    return {type: USER_DATA, payload: d};
}

// 用于更新附加信息

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        let d = res.data.data;
                        dispatch({type: UPDATE_SUCCESS, payload: {...d}});
                    }else {
                        dispatch(errMsg(res.data.msg));
                    }
                }
            });
    };
}

// 退出登陆清空user数据

export function logout() {
    return {type: LOG_OUT};
}


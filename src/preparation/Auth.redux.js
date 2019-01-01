import axios from 'axios';

const LOGIN = 'login';
const LOGOUT = 'logout';
const DATA = 'data';

export function reducerAuth(state={isAuth: false, user: 'james', age: 20}, action) {
    switch (action.type) {
        case (LOGIN):
            return {...state, isAuth: true};
        case (LOGOUT):
            return {...state, isAuth: false};
        case DATA: // 请求完数据后触发reducer。reducer来修改state。注意额外数据通过action.payload传递
            return {...state, user: action.payload.user, age: action.payload.age};
        default:
            return state;
    }
}

// action creator

// 用于请求用户数据的异步action creator
export function getUserData() {
    return dispatch => {
        axios.get('/data')
            .then((res) => {
                    console.log(res);
                    dispatch({type: DATA, payload: res.data});
                });
    };
}
export function login() {
    return {type: LOGIN};
}
export function logout() {
    return {type: LOGOUT};
}
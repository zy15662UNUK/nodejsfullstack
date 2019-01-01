import axios from 'axios';
// 获取boss列表或者牛人列表
const USER_UPDATE = 'USER_UPDATE';
const initState = {userlist: []};
export function chatuser(state=initState, action) {
    switch (action.type) {
        case USER_UPDATE:
            return {...state, userlist: action.payload};
        default:
            return state;
    }
}

export function getUserList(type) {
    return dispatch => {
        axios.get('/user/list?type='+type)
            .then(res => {
                if (res.data.code === 0) {
                    dispatch({type: USER_UPDATE, payload: res.data.data});
                }
            });
    };
}
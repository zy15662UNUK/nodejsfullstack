import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093'); //由于端口不一致。所以必须手动创建和后端的链接
const MSG_LIST = 'MSG_LIST'; // 获取聊天列表
const MSG_RECV = 'MSG_RECV'; // 读取信息
const MSG_READ = 'MSG_READ'; // 标识已读
const initState = {
    chatmsg: [], // 所有聊天信息列表
    users: {},
    unread: 0 // 未读信息数量
};
export function chat(state=initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatmsg: action.payload.data, users: action.payload.users, unread: action.payload.data.filter(v => !v.read && action.payload.id === v.to).length};
        case MSG_RECV:
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1};
        case MSG_READ:
            return {...state, chatmsg: state.chatmsg.map(v => v.from === action.payload.id? {...v, read: true}: v), unread: state.unread - action.payload.num}
        default:
            return state;
    }
}
export function sendMsg({from, to, content}) {
    const chatid = [from, to].sort().join('-');
    return dispatch => {
        socket.emit('sendmsg', {chatid, from, to, content});
    }
}
export function receiveMsg() {
    return dispatch => {
        socket.on('receiveMsg', d => {
            dispatch({type: MSG_RECV, payload: d});
        });
    };
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    let d = res.data;
                    let userid = getState().user._id;
                    dispatch({type: MSG_LIST, payload: {users: d.users, data: d.data, id: userid}});
                }
            });
    };
}

export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {from})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    let d = res.data;
                    dispatch({type: MSG_READ, payload: {num: d.data, id: from}});
                }
            });
    };
}
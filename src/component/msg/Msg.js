import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

class Msg extends React.Component{
    render() {
        let chatgroup = {};
        this.props.chat.chatmsg.forEach(v => {
            chatgroup[v.chatid] = chatgroup[v.chatid] || []; // key不存在则添加空数组
            chatgroup[v.chatid].push(v);
        });
        const chatgroupVals = Object.values(chatgroup).sort((a, b) => {
            return b[b.length - 1].create_time - a[a.length - 1].create_time;
        });
        return (
            <div>
                <List>
                    {chatgroupVals.map(v => {
                        const lastMsg = v[v.length - 1];
                        const id = lastMsg.from === this.props.user._id?lastMsg.to:lastMsg.from;
                        const unreadNum = v.filter(i => !i.read && i.to ===this.props.user._id).length;
                        return (
                            <List.Item
                                key={Math.random()}
                                extra={<Badge text={unreadNum}/>}
                                arrow='horizontal'
                                onClick={() => {console.log(123);this.props.history.push(`/chat/${id}`)}}
                                thumb={require(`../../img/${this.props.chat.users[id].avatar}.png`)}>
                                {lastMsg.content}
                                <List.Item.Brief>{this.props.chat.users[id].name}</List.Item.Brief>
                            </List.Item>
                        );
                    })}
                </List>
            </div>
        );
    }
}
Msg = withRouter(Msg);
Msg = connect(
    state => state
)(Msg);
export default Msg;
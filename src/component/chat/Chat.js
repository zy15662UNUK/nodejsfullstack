import React from 'react';
import {List, InputItem, NavBar, Icon} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import {getMsgList, sendMsg, receiveMsg, readMsg} from '../../redux/chat.redux';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', msg: []};
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }

    componentWillUnmount() {
        // 退出的时候将本聊天对话框的消息全部设为未读
        const withWhom = this.props.match.params.user;
        this.props.readMsg(withWhom);
    }

    handleSubmit = () => {
        console.log(this.state);
        this.props.sendMsg({from: this.props.user._id, to: this.props.match.params.user, content: this.state.text});
        this.setState({text: ''});
    }

    render() {
        const users = this.props.chat.users;
        if (!users[this.props.match.params.user]) {
            return null;
        }
        return (
            <div>
                <NavBar
                    mode='dark'
                    icon={<Icon type='left' onClick={() => this.props.history.goBack()}/>}
                >{users[this.props.match.params.user].name}</NavBar>
                <QueueAnim type='left' delay={100}>
                    {this.props.chat.chatmsg.map(v => {
                        const avatar = require(`../../img/${users[v.from].avatar}.png`);
                        const chatid = [this.props.user._id, this.props.match.params.user].sort().join('-'); // 根据chatid筛选这两人相关的对话
                        if (v.chatid === chatid) {
                            let key = Math.random();
                            return v.from === this.props.user._id ? (
                                <List key={key}>
                                    <List.Item
                                        className='chat-me'
                                        extra={<img src={avatar}/>}>
                                        {v.content}
                                    </List.Item>
                                </List>
                            ) : (
                                <List key={key}>
                                    <List.Item thumb={avatar}>
                                        {v.content}
                                    </List.Item>
                                </List>
                            );
                        } else {
                            return null;
                        }
                    })}
                </QueueAnim>

                <div className="stick-footer">
                    <List>

                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={(v) => {
                                this.setState({text: v});
                            }}
                            extra={<div style={{zIndex: 10}} onClick={this.handleSubmit}>发送</div>}

                        ></InputItem>
                    </List>
                </div>
            </div>
        );
    }
}

Chat = connect(
    state => state,
    {getMsgList, sendMsg, receiveMsg, readMsg}
)(Chat);
Chat = withRouter(Chat);
export default Chat;


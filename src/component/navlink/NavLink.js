import React from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {getMsgList, receiveMsg} from '../../redux/chat.redux';
class NavLink extends React.Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }
    render () {
        const data = this.props.data.filter(v => !v.hidden);
        console.log(data);
        const pathname = this.props.location.pathname;
        return (
            <TabBar>
                {data.map(v => {
                    return (
                        <TabBar.Item
                        title={v.text}
                        badge={v.path === '/message'?this.props.chat.unread:0}
                        icon={{uri: require(`../../img/img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`../../img/img/${v.icon}-active.png`)}}
                        key={v.path}
                        selected={pathname === v.path}
                        onPress={() => this.props.history.push(v.path)}
                        >
                        </TabBar.Item>
                    );
                })}
            </TabBar>
        );
    }
}
NavLink = connect(
    state => state,
    {getMsgList, receiveMsg}
)(NavLink);
NavLink = withRouter(NavLink);
export default NavLink;
import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import NavLink from '../navlink/NavLink';
import QueueAnim from 'rc-queue-anim';
import Boss from '../boss/Boss';
import Genius from '../genius/Genius';
import User from '../user/User';
import Msg from '../msg/Msg';
class Dashboard extends React.Component {

    render() {
        const pathname = this.props.location.pathname;
        const user = this.props.user;
        // 导航栏显示的内容，根据当前的redux中的角色来选择性显示内容
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hidden: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'job',
                title: '职位列表',
                component: Genius,
                hidden: user.type === 'boss'
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User,
            },
            {
                path: '/message',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            }
        ];
        const searchResult = navList.find(v => v.path === pathname);
        return (
            <div>
                <NavBar mode='dark'>{searchResult?searchResult.title:null}</NavBar>
                <QueueAnim type='scaleX' duration={100}>
                    {searchResult?<Route path={searchResult.path} component={searchResult.component} key={searchResult.path}/>: this.props.history.push('/login')}
                </QueueAnim>
                <NavLink data={navList}/>
            </div>
        );
    }
}

Dashboard = connect(state => state)(Dashboard);
export default Dashboard;
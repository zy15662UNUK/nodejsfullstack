import React from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {Redirect} from 'react-router-dom';
import {logout} from '../../redux/user.redux';

class User extends React.Component{
    logout = () => {
        console.log('logout')
        const alert = Modal.alert;
        alert('注销', '确认退出?', [
            {text: '取消', onPress: () => {console.log('退出')}},
            {text: '确认', onPress: () => {
                browserCookie.erase('userId');
                this.props.logout();
                }}
        ]);
    }
    render() {
        const props = this.props;
        return props.user?(
            <div>
                <Result
                img={<img src={require(`../../img/${props.avatar}.png`)} style={{width: 50}} alt=""/>}
                title={props.user}
                message={props.type==='boss'?props.company:null}
                />
                <List
                renderHeader={() => '简介'}
                >
                    <List.Item>
                        {props.title}
                        {props.desc.split('\n').map((v=><List.Item.Brief key={Math.random()}>{v}</List.Item.Brief>))}
                        {props.money?(<List.Item.Brief>薪资: {props.money}</List.Item.Brief>):null}
                    </List.Item>
                </List>
                <WhiteSpace/>
                <List.Item onClick={this.logout}>退出登陆</List.Item>
            </div>
        ): <Redirect to={this.props.redirTo}/>;
    }
}
User = connect(
    state => state.user,
    {logout}
)(User);
export default User;
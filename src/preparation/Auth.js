import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login, getUserData} from './Auth.redux';
class Auth extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getUserData(); // 当页面完成渲染之后。就触发action creator来更新redux中的用户数据
    }

    render() {
        const redirect = <Redirect to='/dashboard'/>;
        const signin = (
            <div>
                <h1>姓名: {this.props.auth.user}, 年龄 {this.props.auth.age}</h1>
                <button onClick={this.props.login}>登陆</button>
            </div>
        );
        return (
            <div>
                {this.props.auth.isAuth?redirect:signin}
            </div>
        );
    }
}
Auth = connect(
    state => ({auth: state.reducerAuth}),
    {login, getUserData}
)(Auth);
export default Auth;
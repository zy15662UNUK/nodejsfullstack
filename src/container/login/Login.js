import React from 'react';
import {connect} from 'react-redux';
import {Button, WhiteSpace, WingBlank, InputItem} from 'antd-mobile';
import Logo from '../../component/logo/logo';
import {login} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
import AdvanceForm from '../../component/advanceform/AdvanceForm';
import './Login.css';

class Login extends React.Component{
    onClickLogin = () => {
        this.props.login(this.props.state);
    }
    onClickRegister = () => {
        this.props.history.push('/register');
    }

    render() {
        return (
            <div>
                <Logo></Logo>
                <h1>login</h1>
                <WingBlank>
                    {this.props.msg.length > 0? <p className="err-msg">{this.props.msg}</p>: null}
                    {this.props.redirTo? <Redirect to={this.props.redirTo}/>: null}
                    <InputItem onChange={v => {this.props.handleChange('user', v)}}>用户</InputItem>
                    <WhiteSpace/>
                    <InputItem onChange={v => {this.props.handleChange('password', v)}}>密码</InputItem>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.onClickLogin}>登陆</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.onClickRegister}>注册</Button>
                </WingBlank>
            </div>

        );
    }
}
Login = AdvanceForm(Login);
Login = connect(
    state => state.user,
    {login}
)(Login);
export default Login;
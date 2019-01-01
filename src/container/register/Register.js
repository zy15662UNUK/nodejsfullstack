import {Button, InputItem, WhiteSpace, List, Radio} from 'antd-mobile'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';
import AdvanceForm from '../../component/advanceform/AdvanceForm';
import React from 'react';
import Logo from '../../component/logo/logo';
import './Register.css';
class Register extends React.Component{
    componentDidMount() {
        this.props.handleChange('type', 'genius');
    }

    handleRegister = () => {
        this.props.register(this.props.state);
    }
    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo></Logo>
                <h1>register</h1>
                <List>
                    {this.props.msg.length > 0? <p className="err-msg">{this.props.msg}</p>: null}
                    {this.props.redirTo? <Redirect to={this.props.redirTo}/>: null}
                    <InputItem onChange={v => {this.props.handleChange('user', v)}}>用户</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' onChange={v => {this.props.handleChange('password', v)}}>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' onChange={v => {this.props.handleChange('repeatpwd', v)}}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem onChange={v => {this.props.handleChange('type', 'genius')}} checked={this.props.state.type === 'genius'}>牛人</RadioItem>
                    <RadioItem onChange={v => {this.props.handleChange('type', 'boss')}} checked={this.props.state.type === 'boss'}>BOSS</RadioItem>
                </List>
                <Button type='primary' onClick={this.handleRegister}>注册</Button>
            </div>

        );
    }
}
// 将redux中的数据和方法都绑定到props中
Register = AdvanceForm(Register);
Register = connect(
    state => state.user,
    {register}
)(Register);
export default Register;
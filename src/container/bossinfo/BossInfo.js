import React from 'react';
import {connect} from 'react-redux';
import { InputItem, TextareaItem, NavBar, Button} from 'antd-mobile';
import AvatarSelector from '../../component/avatarSelector/AvatarSelector';
import {update} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom'

class BossInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange = (k, v) => {
        this.setState({[k]: v});
    }
    handleClick = (v) => {
        this.setState({avatar: v});
    }
    handleSubmit = () => {
        this.props.update(this.state);
    }
    render() {
        return (
            <div>
                {this.props.msg.length > 0? <p className="err-msg">{this.props.msg}</p>: null}
                {this.props.redirTo && this.props.redirTo !== '/bossinfo'? <Redirect to={this.props.redirTo}/>: null}
                <NavBar mode="dark">BOSS信息完善</NavBar>
                <AvatarSelector handleClick={this.handleClick}/>
                <InputItem onChange={(v) =>this.handleChange('title', v)}>招聘职位</InputItem>
                <InputItem onChange={(v) =>this.handleChange('company', v)}>公司名称</InputItem>
                <InputItem onChange={(v) =>this.handleChange('money', v)}>职位薪资</InputItem>
                <TextareaItem rows={3} autoHeight title="职位要求" onChange={(v) =>this.handleChange('desc', v)}/>
                <Button type='primary' onClick={this.handleSubmit}>保存</Button>
            </div>
        );
    }
}
BossInfo = connect(
    state => state.user,
    {update}
)(BossInfo);
export default BossInfo;
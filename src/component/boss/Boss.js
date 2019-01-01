import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';
import UserCard from '../usercard/UserCard';
class Boss extends React.Component{
    componentDidMount() {
        this.props.getUserList('genius');
    }

    render() {
        return (
            <div>
                <UserCard userlist={this.props.userlist}/>
            </div>
        );
    }
}

Boss = connect(
    state => state.chatuser,
    {getUserList}
)(Boss);
export default Boss;
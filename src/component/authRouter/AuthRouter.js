import React from 'react';
import {connect} from 'react-redux';
import {loadData} from '../../redux/user.redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios'

class AuthRouter extends React.Component {
    componentDidMount() {
        const set = new Set(['/login', '/register']);
        console.log(this.props.location.pathname);
        if (set.has(this.props.location.pathname)) {
            // 如果用户随便访问的一个。那么不用管
            return null;
        }
        axios('/user/info')
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    if (res.data.code === 0) {
                        // 说明用户已经登陆
                        let d = res.data.data;
                        this.props.loadData(d);
                    }else {
                        // 说明用户没有登陆， 跳转到登陆页面
                        this.props.history.push('/login');
                    }
                }
            })
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
AuthRouter = connect(
    state => state.user,
    {loadData}
)(AuthRouter);
AuthRouter = withRouter(AuthRouter);

export default AuthRouter;
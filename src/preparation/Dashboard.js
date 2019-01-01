import React from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import App from './App';
import {logout} from './Auth.redux';

function One() {
    return (<h2>One</h2>);
}

function Two() {
    return (<h2>Two</h2>);
}
class Dashboard extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const match = this.props.match; // 当前命中的路由都是可以通过this.props.match来获得
        const dashboard = (
            <div>
                <ul>
                    <li><Link to={`${match.url}/`}>Zero</Link></li>
                    <li><Link to={`${match.url}/1`}>One</Link></li>
                    <li><Link to={`${match.url}/2`}>Two</Link></li>
                </ul>
                <button onClick={this.props.logout}>登出</button>
                <Route path={`${match.url}/`} component={App} exact></Route>
                <Route path={`${match.url}/1`} component={One}></Route>
                <Route path={`${match.url}/2`} component={Two}></Route>
            </div>
        );
        const redir = <Redirect to='/auth'/>;
        return (
            <div>
                {this.props.auth.isAuth? dashboard: redir}
            </div>
        );
    }
}
Dashboard = connect(
    (state) => ({auth: state.reducerAuth}),
    {logout}
)(Dashboard);
export default Dashboard;
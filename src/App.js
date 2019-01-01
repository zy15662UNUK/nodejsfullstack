import React from 'react';
import AuthRouter from './component/authRouter/AuthRouter'
import {Route, Switch} from 'react-router-dom'
import Login from './container/login/Login'
import Register from './container/register/Register'
import BossInfo from './container/bossinfo/BossInfo'
import GeniusInfo from './container/geniusinfo/GeniusInfo'
import Chat from './component/chat/Chat'
import Dashboard from './component/dashboard/Dashboard'
export default class App extends React.Component{
    render() {
        return (
            <div>
                <AuthRouter/>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        );
    }
}
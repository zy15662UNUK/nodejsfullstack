import React from 'react';
import {Card} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

class UserCard extends React.Component {
    handleClick = (v) => {
        console.log(1234560)
        this.props.history.push(`/chat/${v._id}`);
    }
    render() {
        return (
            <div>
                {
                    this.props.userlist? (this.props.userlist.map(v => {
                        return v.avatar?(
                            <Card
                                key={v._id}
                                onClick={()=>this.handleClick(v)}
                                style={{zIndex:100}}
                            >
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../../img/${v.avatar}.png`)}
                                    extra={(<span>{v.title}</span>)}
                                />
                                <Card.Body>
                                    {v.type === 'boss'? <div>公司: {v.company}</div>: null}
                                    {v.type === 'boss'? <div>薪资: {v.money}</div>: null}
                                    {v.desc.split('\n').map(v =>(<div key={Math.random()}>{v}</div>))}
                                </Card.Body>
                            </Card>
                        ):null;
                    })): null
                }
            </div>
        );
    }
}
UserCard = withRouter(UserCard);
export default UserCard;
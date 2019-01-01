import React from 'react';
import { Grid, List} from 'antd-mobile';
import PropType from 'prop-types';
class AvatarSelector extends React.Component{
    static propTypes = {
        handleClick: PropType.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state={};
    }
    render() {
        const data = ['boy', 'bull', 'chick', 'crab', 'girl', 'hedgehog', 'hippopotamus', 'koala',
            'lemur', 'man', 'pig', 'tiger', 'whale', 'woman', 'zebra'].map(v => {
                return {
                    icon: require(`../../img/${v}.png`),
                    text: v
                };
        });
        const header = <div>当前选择头像为: {this.state.avatar?<img src={require(`../../img/${this.state.avatar}.png`)}></img>: <span>请选择头像</span>}</div>;

        return (
            <div>
                <List renderHeader={header}>
                    <Grid data={data} columnNum={5} onClick={el => {
                        this.setState({avatar: el.text});
                        this.props.handleClick(el.text);
                    }}/>
                </List>
            </div>

        );
    }
}

export default AvatarSelector;
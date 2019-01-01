import React from 'react';

export default function (Componenet) {
    return class Wrapper extends React.Component{
        constructor(props) {
            super(props);
            this.state = {};
        }
        handleChange = (k, v) => {
            this.setState({[k]: v});
        }
        render() {
            return (
                <div>
                    <Componenet handleChange={this.handleChange} state={this.state} {...this.props}/>
                </div>
            )
        }
    }
}
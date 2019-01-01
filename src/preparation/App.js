import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {minus, addAsync, add} from './index.redux';

class App extends Component {
  render() {
    const add = this.props.add;
    const minus = this.props.minus;
    const addAsync = this.props.addAsync;
    return (
      <div className="App">
        <h1>老子有枪 {this.props.num}</h1>
        <button onClick={() => add()}>add</button>
        <button onClick={() => minus()}>minus</button>
          <button onClick={() => addAsync()}>add later</button>
      </div>
    );
  }
}
// decorator 写法，将App包装一下再返回一个组件
App = connect(
    (state) => {return {num: state.reducerCounter}}, // 把state什么属性放进props里. 注意这里合并reducer之后state里面以不同reducer的名字来划分不同的state
    {add, minus, addAsync} // 把action creater 放进属性里
)(App);
export default App;

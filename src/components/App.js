import React, { Component } from 'react';

const ValueShow = (props) => (
  <div className="value-wrapper">
    <p className="value-text">
      Amount clicked: {props.value}
    </p>
  </div>
);

const Buttons = (props) => (
  <div>
    <button onClick={props.onIncrement}>+</button>
    <button onClick={props.onDecrement}>-</button>
    <button onClick={props.incrementIfOdd}>increment if odd</button>
    <button onClick={props.incrementAsync}>increment async</button>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
    this.incrementAsync = this.incrementAsync.bind(this);
  }

  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync() {
    setTimeout(() => {this.props.onIncrement()}, 1000);
  }

  render() {
    const {value, onIncrement, onDecrement} = this.props;
    return (
      <div className="app">
        <ValueShow value={value} />
        <Buttons
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          incrementIfOdd={this.incrementIfOdd}
          incrementAsync={this.incrementAsync} />
      </div>
    );
  }
}
export { ValueShow, Buttons }
export default App;

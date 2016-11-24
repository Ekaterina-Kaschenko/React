import React, {Component} from "react";
import ReactDOM from "react-dom";

const app = document.getElementById('app');
const CounterComponent = (props) =>
  <div>
    {
      Array.from({ length: props.repeat }).map((item, index) =>
        <h1 key={index}>{props.counter}</h1>
      )
    }
  </div>
;

class MainContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = {repeatCount: 1}
    this.changeField = this.changeField.bind(this);
  }

  changeField (event) {
    this.setState({repeatCount: event.target.value})
  }

  render() {
    return (
    <div>
      <h1>Hello React</h1>
      <input type='number' value={this.state.repeatCount} onChange={this.changeField} />
      <CounterComponent counter={3} repeat={this.state.repeatCount} />
    </div>
   )
  }
}
ReactDOM.render(<MainContainer />, app);

import React, {Component} from "react";
import ReactDOM from "react-dom";

const root = document.getElementById('app');
const myNews = [
  {
    author: 'Sasha',
    text: 'Im Sasha',
    bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '
  },
  {
    author: 'Vasya',
    text: 'Im Vasya',
    bigText: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    author: 'Guest',
    text: 'Im Guest',
    bigText: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];

const News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function () {
    return {
      counter: 0
    }
  },
  render: function () {
    let newsTemplate;
    if (this.props.data.length > 0) {
      newsTemplate = this.props.data.map(function (item, index) {
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        );
      });
    } else {
      newsTemplate = <p>No news</p>
    }

    return (
      <div className='news'>
        {newsTemplate}
        <strong
          className = {'news__count ' + (this.props.data.length > 0 ? '':'none')}>
          Всего новостей: {this.props.data.length}
      </strong>
      </div>
    );
  }
});

const Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },
  getInitialState: function () {
    return {
      visible: false
    }
  },
  readMoreClick: function (event) {
    event.preventDefault();
    this.setState({visible: true})
  },
  render: function () {
    let author = this.props.data.author,
          text = this.props.data.text,
          bigText = this.props.data.bigText,
          visible = this.state.visible;

    return (
      <div className='article'>
        <p className='news__author'>{author}:</p>
        <p className='news__text'>{text}:</p>
        <a href='#'
          onClick={this.readMoreClick}
          className={'news__readmore ' + (visible ? 'none' : '' )}>
          More
        </a>
        <p className={'news__big-text ' + ( visible ? '': 'none' )}>{bigText}:</p>
      </div>
    )
  }
});

const TestInput = React.createClass({
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.myTestInput).focus();
  },
  onButtonClick: function () {
    console.log(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  },
  render: function () {
    return (
      <div>
        <input
          className='test-input'
          defaultValue=''
          placeholder='enter value'
          ref='myTestInput'
        />
        <button
          onClick={this.onButtonClick}
          ref='buttonClick'>Ok</button>
      </div>
    )
  }
})

const App = React.createClass({
  render: function () {
    return (
      <div>
        <h3>Новости</h3>
        <TestInput />
        <News data={myNews} />
      </div>
    );
  }
});

ReactDOM.render(<App />, root);

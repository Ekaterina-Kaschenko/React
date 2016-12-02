'use strict';
import React, {Component} from "react";
import ReactDOM from "react-dom";
import EventEmitter from 'events';

window.ee = new EventEmitter();
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

const Add = React.createClass({
  getInitialState: function () {
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    }
  },
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onButtonClick: function (e) {
    e.preventDefault();
    var textEl = ReactDOM.findDOMNode(this.refs.text);
    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = ReactDOM.findDOMNode(this.refs.text).value;
    var item = [{
      author: author,
      text: text,
      bigText: '...'
    }];
    window.ee.emit('News.add', item);
    textEl.value = '';
    this.setState({textIsEmpty: true});
  },
  onCheckRuleClick: function (e) {
    this.setState({agreeNotChecked: !this.state.agreeNotChecked});
  },
  onFieldChange: function (fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]: false})
    } else {
      this.setState({[''+fieldName]: true})
    }
  },
  render: function () {
    var agreeNotChecked = this.state.agreeNotChecked,
        authorIsEmpty = this.state.authorIsEmpty,
        textIsEmpty = this.state.textIsEmpty;
    return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
          placeholder='Your name'
          ref='author'
        />
        <textarea
          className='add__text'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          placeholder='Text news'
          ref='text'
        >
        </textarea>
        <label className='add__checkrule'>
          <input
            type='checkbox'
            defaultChecked={false}
            ref='checkrule'
            onChange={this.onCheckRuleClick} />
            I agree with rules
        </label>
        <button
          className='add__btn'
          onClick={this.onButtonClick}
          ref='buttonClick'
          disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>
          Add news
        </button>
      </form>
    );
  }
});

const App = React.createClass({
  getInitialState: function () {
    return {
      news: myNews
    };
  },
  componentDidMount: function () {
    var self = this;
    window.ee.addListener('News.add', function (item) {
      var nextNews = item.concat(self.state.news);
      self.setState({news: nextNews});
    })
  },
  ComponentWillUnmount: function () {
    window.ee.removeListener('News.add');
  },
  render: function () {
    console.log('render');
    return (
      <div className='app'>
        <h3>Новости</h3>
        <Add />
        <News data={this.state.news} />
      </div>
    );
  }
});

ReactDOM.render(<App />, root);

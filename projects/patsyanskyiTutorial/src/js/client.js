import React, {Component} from "react";
import ReactDOM from "react-dom";

const root = document.getElementById('app');

const myNews = [
  {
    author: 'Sasha',
    text: 'Im Sasha'
  },
  {
    author: 'Vasya',
    text: 'Im Vasya'
  },
  {
    author: 'Guest',
    text: 'Im Guest'
  }
];

const News = React.createClass({
  render: function () {
    const newsTemplate = this.props.data.map(function (item, index) {
      return (
        <div key={index}>
          <p className='news__author'>{item.author}:</p>
          <p className='news__text'>{item.text}</p>
        </div>
      );
    });

    return (
      <div className='news'>
        {newsTemplate}
      </div>
    )
  }
});

const Comments = React.createClass({
  render: function () {
    console.log(this);
    return (
      <div className = 'comments'>
        No news - nothing comment
      </div>
    );
  }
});

const App = React.createClass({
  render: function () {
    return (
      <div>
        Привет, я компонент Арр. Я умею отображать новости
        <News data={myNews} />
        <Comments />
      </div>
    );
  }
});

ReactDOM.render(<App />, root);

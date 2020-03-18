import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tabs from './components/tab';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
  <div className="demo">
    <Tabs>
      <div tab="订阅号概览" key={1}>1</div>
      <div tab="订阅号推送" key={2}>2</div>
      <div tab="互动消息" key={3}>3</div>
      <div tab="自动回复设置" key={4}>4</div>
    </Tabs>
  </div>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

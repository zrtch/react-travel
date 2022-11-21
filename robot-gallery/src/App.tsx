import React from 'react';
import './App.css';
import robots from './mockdata/robots.json'
import Robot from './components/Robot'

function App() {
  // 循环输出 Robot 组件
  return (
    <ul>
      {robots.map(r => <Robot id={r.id} email={r.email} name={r.name} />)}
    </ul>
  );
}

export default App;

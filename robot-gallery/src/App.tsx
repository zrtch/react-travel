import React from 'react';
import robots from './mockdata/robots.json'
import Robot from './components/Robot'
import styles from './App.module.css'

function App() {
  // 循环输出 Robot 组件
  return (
    <div className={styles.app}>
       <div className={styles.robotList}>
        {robots.map(r => <Robot id={r.id} email={r.email} name={r.name} />)}
      </div>
    </div>
  );
}

export default App;

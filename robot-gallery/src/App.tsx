import React from 'react';
import logo from './assets/images/logo.svg'
import robots from './mockdata/robots.json'
import Robot from './components/Robot'
import ShoppingCart from './components/ShoppingCart'
import styles from './App.module.css'

function App() {
  // 循环输出 Robot 组件
  return (
    <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} alt="" className={styles.appLogo}/>
          <h1>Robot 瞅你咋地</h1>
        </div>
        <ShoppingCart />
       <div className={styles.robotList}>
        {robots.map(r => <Robot id={r.id} email={r.email} name={r.name} />)}
      </div>
    </div>
  );
}

export default App;

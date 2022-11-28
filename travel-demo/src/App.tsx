import React from 'react'
import styles from './App.module.css'
import { Header, Footer } from './components' //整个组件库 components 成为一个整体，把整个组价库拆分出来，以独立项目依赖的形式，提供别人使用

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Footer />
    </div>
  )
}

export default App

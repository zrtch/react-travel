import React from 'react'
import styles from './App.module.css'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { HomePage, NotFound } from './pages'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*兜底，如果上面的都匹配不到，就会渲染NotFound组件*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

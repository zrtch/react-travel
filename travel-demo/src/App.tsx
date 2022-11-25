import React from 'react'
import logo from './logo.svg'
import styles from './App.module.css'
import { Layout, Typography, Input } from 'antd'

const { Header } = Layout

function App() {
  return (
    <div className={styles.App}>
      <Layout className={styles['app-header']}>
        <Header className={styles['main-header']}>
          <img src={logo} alt="" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>
            旅游网
          </Typography.Title>
          <Input.Search
            placeholder={'请输入旅游目的地、主题、或关键字'}
            className={styles['search-input']}
          />
        </Header>
      </Layout>
    </div>
  )
}

export default App

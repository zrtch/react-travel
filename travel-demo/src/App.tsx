import React from 'react'
import styles from './App.module.css'
import { Header, Footer, Carousel, SideMenu } from './components' //整个组件库 components 成为一个整体，把整个组价库拆分出来，以独立项目依赖的形式，提供别人使用
import { Row, Col } from 'antd'

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles['page-content']}>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}

export default App

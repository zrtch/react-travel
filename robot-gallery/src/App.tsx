import React, { useState, useEffect } from 'react'
import logo from './assets/images/logo.svg'
import Robot from './components/Robot'
import RobotDiscount from './components/RobotDiscount'
import ShoppingCart from './components/ShoppingCart'
import styles from './App.module.css'

const App: React.FC = (props) => {
  const [count, setCount] = useState<number>(0)
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  //传入一个匿名函数，每次ui渲染，状态改变 useEffect都会执行
  useEffect(() => {
    document.title = `点击${count}次`
  }, [count])

  useEffect(() => {
    //把副作用的逻辑代码放在一个新的异步的匿名函数
    const fetchData = async () => {
      setLoading(true)
      try {
        const responses = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        const data = await responses.json()
        setRobotGallery(data)
      } catch (e: any) {
        setError(e.message)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  // 循环输出 Robot 组件
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} alt="" className={styles.appLogo} />
        <h1>Robot 瞅你咋地</h1>
      </div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click
      </button>
      <span className={styles.count}>Count：{count}</span>
      <ShoppingCart />
      {!error || (error !== '' && <div>网站出错：{error}</div>)}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r, index) =>
            index % 2 === 0 ? (
              <RobotDiscount id={r.id} email={r.email} name={r.name} />
            ) : (
              <Robot id={r.id} email={r.email} name={r.name} />
            )
          )}
        </div>
      ) : (
        <h2>loading 加载中</h2>
      )}
    </div>
  )
}

export default App

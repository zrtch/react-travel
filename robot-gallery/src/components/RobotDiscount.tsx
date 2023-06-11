import React, { useContext } from 'react'
import styles from './Robot.module.css'
import { appContext } from '../AppState'
import { useAddToCart } from './addToCart'

console.log('孙子组件触发')

interface RobotProps {
  id: number
  name: string
  email: string
}

// 使用props传递组件的数据
const RobotDiscount: React.FC<RobotProps> = ({ id, name, email }) => {
  // 使用useContext来访问上下文关系对象
  const value = useContext(appContext)
  const addToCart = useAddToCart()
  return (
    <div className={styles.cardContainer}>
      <img src={`https://www.robohash.org/${id}`} alt="" />
      <h2>打折商品</h2>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.username}</p>
      <button onClick={() => addToCart(id, name)}>加入购物车</button>
    </div>
  )
}

export default RobotDiscount

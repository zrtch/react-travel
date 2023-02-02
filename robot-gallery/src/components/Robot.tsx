import React, { useContext } from 'react'
import styles from './Robot.module.css'
import { appContext } from '../AppState'
import { withAddCart } from './addToCart'
export interface RobotProps {
  id: number
  name: string
  email: string
  addToCart: (id, name) => void
}

// 使用props传递组件的数据
const Robot: React.FC<RobotProps> = ({ id, name, email, addToCart }) => {
  // 使用useContext来访问上下文关系对象
  const value = useContext(appContext)

  return (
    <div className={styles.cardContainer}>
      <img src={`https://www.robohash.org/${id}`} alt="" />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.username}</p>
      <button onClick={() => addToCart(id, name)}>加入购物车</button>
    </div>
  )
}

export default withAddCart(Robot)

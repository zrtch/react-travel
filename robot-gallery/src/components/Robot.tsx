import React, { useContext } from 'react'
import styles from './Robot.module.css'
import { appContext, appSetStateContext } from '../AppState'
interface RobotProps {
  id: number
  name: string
  email: string
}

//使用props传递组件的数据
const Robot: React.FC<RobotProps> = ({ id, name, email }) => {
  // 使用useContext来访问上下文关系对象
  const value = useContext(appContext)
  const setState = useContext(appSetStateContext)
  const addToCart = () => {
    if (setState) {
      setState((state) => {
        return {
          ...state,
          shoppingCart: {
            items: [...state.shoppingCart.items, { id, name }],
          },
        }
      })
    }
  }
  return (
    <div className={styles.cardContainer}>
      <img src={`https://www.robohash.org/${id}`} alt="" />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.username}</p>
      <button onClick={addToCart}>加入购物车</button>
    </div>
  )
}

export default Robot

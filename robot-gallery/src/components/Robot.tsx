import React  from "react";
import styles from './Robot.module.css'
interface RobotProps{
  id: number,
  name: string,
  email: string
}

//使用props传递组件的数据
const Robot : React.FC<RobotProps> = ({id, name, email}) =>{
  return <div className={styles.cardContainer}>
    <img src={`https://www.robohash.org/${id}`} alt="" />
    <h2>{name}</h2>
    <p>{email}</p>
  </div>
}

export default Robot
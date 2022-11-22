import React  from "react";
import styles from './ShoppingCart.module.css'

interface Props{

}
//组件自己的状态
interface State{
  isOpen: boolean
}

class ShoppingCart extends React.Component<Props, State>{ //继承React.Component
  constructor(props: Props){
      super(props);
      this.state = {
        isOpen: false
      }
  }

  render(){
     return(
      <div className={styles.cartContainer}>
        <button className={styles.button} onClick={()=>{
          this.setState({
            isOpen: !this.state.isOpen
          })
        }}
        >购物车 2 (件)</button>
        <div className={styles.cartDropDown}
          style={{display: this.state.isOpen ? 'block' : 'none'}}
        >
          <ul>
            <li>robot 1</li>
            <li>robot 2</li>
          </ul>
        </div>
      </div>
     )
  }
}

export default ShoppingCart
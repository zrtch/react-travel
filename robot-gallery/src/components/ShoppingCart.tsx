import React from 'react'
import styles from './ShoppingCart.module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { appContext } from '../AppState'

interface Props {}
//组件自己的状态
interface State {
  isOpen: boolean
}

class ShoppingCart extends React.Component<Props, State> {
  //继承React.Component
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.target)
    console.log(e.currentTarget)
    //点击span元素下拉菜单正常，点击icon就无效
    if ((e.target as HTMLElement).nodeName === 'SPAN') {
      this.setState({ isOpen: !this.state.isOpen })
    }
  }

  deleteClick = () => {
    console.log(11)
  }

  render() {
    return (
      <appContext.Consumer>
        {(value) => {
          return (
            <div className={styles.cartContainer}>
              <button className={styles.button} onClick={this.handleClick}>
                <FiShoppingCart />
                <span> 购物车 {value.shoppingCart.items.length} (件)</span>
              </button>
              <div
                className={styles.cartDropDown}
                style={{ display: this.state.isOpen ? 'block' : 'none' }}
              >
                <ul>
                  {value.shoppingCart.items.map((item, index) => (
                    <li className={styles.items}>
                      <span>
                        {index + 1}.{item.name}
                      </span>
                      <span onClick={this.deleteClick}>×</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }}
      </appContext.Consumer>
    )
  }
}

export default ShoppingCart

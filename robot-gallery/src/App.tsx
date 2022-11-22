import React from 'react'
import logo from './assets/images/logo.svg'
import robots from './mockdata/robots.json'
import Robot from './components/Robot'
import ShoppingCart from './components/ShoppingCart'
import styles from './App.module.css'

interface Props{

}

interface State{
  robotGallery: any[]
}
class App extends React.Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      robotGallery: []
    }
  }

  componentDidMount()   {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then((data) => this.setState({ robotGallery: data }) )
  }

  // 循环输出 Robot 组件
  render(): React.ReactNode {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} alt="" className={styles.appLogo} />
          <h1>Robot 瞅你咋地</h1>
        </div>
        <ShoppingCart />
        <div className={styles.robotList}>
          {this.state.robotGallery.map((r) => (
            <Robot id={r.id} email={r.email} name={r.name} />
          ))}
        </div>
      </div>
    )
  }
}

export default App

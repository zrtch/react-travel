原文地址：[https://coding.imooc.com/class/chapter/475.html#Anchor](https://coding.imooc.com/class/chapter/475.html#Anchor)<br />

完整代码github地址：

- [https://github.com/search?q=react%E6%97%85%E6%B8%B8%E7%BD%91&type=Repositories](https://github.com/search?q=react%E6%97%85%E6%B8%B8%E7%BD%91&type=Repositories)


### React 与 Typescript

2010 第一代 AngularJS与 MVC 出现

- 双向数据绑定
- 网站运行速度缓慢
- MVC架构：页面状态管理混乱

组件化：

- 把网页拆成若干个独立的模块
- 可以被轻易复制和管理
- ReactJS，VueJS，Angular（二代以上）
- 状态管理思想：Flex，Redux，Mobx，Immutable，RxJS

React的设计理念

- 单向数据流
  - 数据与界面绑定
  - 单向渲染
  - 就好像一个函数，同样的输入，同样的输出
- 虚拟DOM
  - 类似Docker或VMware的Snapshot快照技术
- 组件化
  - 保持交互一致性
  - 保持视觉风格的统一
  - 便于同事互相之间的协作

#### react函数式组件

```typescript
npx create-react-app robot-gallery --template typescript
```

```tsx
import React from 'react';
import './App.css';
import robots from './mockdata/robots.json'
import Robot from './components/Robot'

function App() {
  // 循环输出 Robot 组件·
  return (
    <ul>
      {robots.map(r => <Robot id={r.id} email={r.email} name={r.name} />)}
    </ul>
  );
}

export default App
```

#### JSX编程思维

```tsx
//这是react自创语言： JSX
const element = <h1>Hello</h1>
```

JSX并不是标准的js语法；鼓励在 .js 文件里使用标准JS语法；而React语法用在 .jsx 文件中，使用两者都可以。<br />为什么使用JSX？

- React并不强制使用JSX，也可以使用原生Javascript
- React认为视图的本质就是渲染逻辑与UI视图表现的内在统一
- React把HTML与渲染逻辑进行了耦合，形成了JSX

JSX的特点

- 常规的HTML代码都可以与JSX兼容
- 可以在JSX中嵌入表达式

```tsx
const name = 'james'
const element = <h1>hello, {name}</h1>

ReactDOM.render(
	element,
  document.getElementById(root)
)
```

- 而JSX标签里也能够包含很多子元素
- JSX命名约定，使用camelCase（小驼峰）方式定义属性

```tsx
// class就变成了className，而tabindex则变成tabIndex
// jsx的自定义属性，以data- 开头
const element = 
  <div className="element-style" tabIndex="0" data-customized={'自定义属性'}></div>
```

- JSX表示对象：会被编译为React.createElement()对象

如何在JSX中防止注入攻击？

```tsx
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

React DOM 在渲染所有输入内容之前，默认会进行[转义](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS（cross-site-scripting, 跨站脚本）](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击。

#### 如何在React中配置css样式

如何架构项目中的样式文件

- 文件位置：css文件与components文件放在同一个目录下
- 命名规范：.module.css

**CSS module（模组化）**<br />CSS in JS的好与坏：[https://zhuanlan.zhihu.com/p/103522819](https://zhuanlan.zhihu.com/p/103522819)

- 每个jsx或者tsx文件就被视为一个独立存在的原件
- 原件所包含的所有内容也同样都应该是独立存在的
- 直接引入整个css文件：import './index.css'  （简单易用，但有可能造成css全局污染）
- JS 模块化引入组件：（配置麻烦，从组件化角度更加贴合react组件独立的原则）

```tsx
import styles  from './index.css'
<div className={styles.app}></div>
```

TS的定义声明 （ .d.ts )

- 只包含类型声明，不包含逻辑
- 不会被编译，也不会被webpack打包

```typescript
declare module "*.css" {
  const css: {[key: string] : string}
  export default css
}
```

如果想对css代码进行智能提示的功能，然后在tsconfig.json进行配置

```tsx
// 安装 typescript-plugin-css-modules
cnpm i typescript-plugin-css-modules --save-dev

//在plugins里进行配置
"plugins": [{ "name": "typescript-plugin-css-modules" }]
```

为什么要区分普通依赖和dev依赖？<br />devDependencies依赖表示仅参与项目开发，不参与项目打包

```json
"devDependencies": {
  "typescript-plugin-css-modules": "^3.4.0"
}
```

#### 加载媒体资源与字体文件

在assets文件下创建对应的图片，icon，字体等相关的文件夹。

```tsx
// 图片使用
import logo from './assets/images/logo.svg'
```

```css
// 字体使用需要在全局css引入字体文件
@font-face {
  font-family: 'Slidefu';
  src:local('Slidefu'), url(./assets/fonts/Slidefu-Regular-2.ttf) 
}
// 然后再使用的css文件中加入样式即可
h1{
  font-family:'Slidefu';
  font-size: 72px;
}
```

#### 创建class类组件

```tsx
import React  from "react";
import styles from './ShoppingCart.module.css'

interface Props{}
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
          this.setState({ //使用setState管理组件内的状态
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
```

#### State VS Props

State和Props的区别

- props 是组件对外的接口，而state是组件对内的接口
- props用于组件间数据传递，而state用于组件内部的数据传递

state正确的打开方式

- state是私有的，可以认为state是组件的“私有属性"
- 用setState() 修改State，以对象赋值的方式更新组件的方式
- State的更新是异步的，调用setState后，state不会立刻改变，是异步操作
- 不要依赖当前的State，计算下个State

Props正确的打开方式

- props就是传入函数的参数，是从传入组件内部的的数据。更准确地说，是从父组件传递向子组件的数据。
- props是Immutable（只读属性）；对象一旦创建就不可改变，只能通过销毁，重建来改变数据，然后通过判断内存地址的是否一致，来确认对象是否有经过修改。

#### React Event 事件处理

```tsx
<button className={styles.button} onClick={this.handleClick}>购物车 2 (件)</button>

// 事件不加箭头函数的话，就会报this的错误，所以得加上箭头函数
handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  this.setState({isOpen: !this.state.isOpen})
}

// e.target 描述的事件发生的元素
// e.currentTarget 描述的是事件处理绑定的元素
handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  	console.log(e.target)
    console.log(e.currentTarget)
   //点击span元素下拉菜单正常，点击icon就无效
    if((e.target as HTMLElement).nodeName === 'SPAN'){
      this.setState({ isOpen: !this.state.isOpen })
    }
}
```

#### 获取网络API数据

免费API地址：[http://jsonplaceholder.typicode.com/users](http://jsonplaceholder.typicode.com/users)<br />对 any的理解

- 资源来源于网络请求，返回的数据类型不受控制
- 前端强行定义API数据类型，违反前后端分离的原则
- 不能为了使用Type而放弃JavaScript的灵活性

```tsx
// 在componentDidMount请求接口获取数据，然后赋值给robotGallery
componentDidMount()   {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then( response=> response.json() )
    .then( (data) => this.setState( { robotGallery: data }) )
}
```

#### setState的异步开发

setState() 是异步的还是同步的？ <br />**异步更新，同步执行**

- setState() 本身并非异步，但对state的处理机制给人一种异步的假象。state处理一般发生在生命周期变化的时候。

```tsx
//第一个参数接收对象类型，使用对象来更新state
//第二个参数组建state的异步操作处理
this.setState({count: this.state.count + 1}, ()=>{
 		console.log(this.state.count);
})
```

#### 探索React组件的生命周期

- Mounting：创建虚拟DOM，渲染UI
  - 构建函数，用于处于组件初始化 state
  - componentDidMount()
- Updating：更新虚拟DOM，重新渲染UI
  - ~~componentWillReceiveProps(){}；在组件接收到一个新的prop（更新后）时被调用，已被废置~~
  - shouldComponentUpdate(nextProps, nextState){}；判断props和state变化来控制组件是否被更新
  - componentDidUpdate(){}； 组件更新后调用
- Unmounting：删除虚拟DOM，重新渲染UI
  - componentWillUnmount(){}；组件销毁后调用  可以当作析构函数 destructor 来使用

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1261852/1669098923793-c0a603f4-94fa-45ea-8973-1544419d4b04.png#averageHue=%23f6f7f6&clientId=u5672ca88-a24e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=475&id=u3b5f40d8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=475&originWidth=846&originalType=binary&ratio=1&rotation=0&showTitle=false&size=207175&status=done&style=none&taskId=uf75032f1-ff2b-4fa7-b53b-3b52f480330&title=&width=846)

#### React17版本变化

React v17并不是过渡版本，而是承上启下的战略版本。

- 事件委托机制改变
- 向原生浏览器靠拢
- 删除事件池
- useEffect 清理操作改为异步操作
- JSX不可返回 undefined
- 删除部分私有 API

### React Hooks

中文文档：[https://zh-hans.reactjs.org/docs/hooks-reference.html](https://zh-hans.reactjs.org/docs/hooks-reference.html)

#### 什么是钩子（hooks）

- 消息处理的一种方法，用来监视指定程序
- 函数组件中需要处理副作用可以用钩子把外部代码"钩"进来
- 常用钩子: useState, useEffect , useContext , useReducer
- hooks—律使用use前缀命名: useXxx

Hooks的本质

- 一类特殊的函数，为你的函数型式组件( functional component )注入特殊的功能

React为什么要创造Hooks这个概念?

- 有些类组件冗长而且复杂，难以复用
- 结局方案∶无状态组件 与 HOC(高阶组件），但还是存在诸多问题
- Hooks的目的就是为了给函数式组件加上状态

Hooks横空出世

- Hooks的目的就是为了给函数式组件加上状态
- 生命周期函数会同时处理多项任务∶发起ajax、跟踪数据状态、绑定事件监听
- 函数式组件则轻量化很多，使用Hooks钩子来钩入组件状态

Hooks代表了React架构的一次重大变革

- 我们不再需要类组件了
- 不会再有this、不会再有binding、甚至有可能取代redux
- 简化了代码、减少了模版，降低了学习难度

useState()：状态钩子<br />`const [count, setCount] = useState(0);`

- React自带的一个hook函数，声明组件状态
- 参数可以设置state的初始值( initial state )
- 返回值是一个只有两个元素的数组∶[状态，状态更新函数]

useEffect()：副作用钩子

```tsx
useEffect(() => {
  document.title = 点击${count}次`
})
```

- 可以取代生命周期函数componentDidMount , componentDidUpdate 和 componentWillUnmount
- 给函数式组件添加副作用( side effect )

useContext()：跨组件的数据传递<br />useReducer()：用来管理全局状态<br />useCallback()：处理回调的副作用<br />useRef()：可以返回一个引用的对象，这个引用对象在生命周期中保持不变<br />useLayoutEffect()：也用于处理副作用，他会在所有的dom元素变更之后同步调用，读取dom数据并同步渲染<br />useDebugValue：可以React开发者工具中显示自定义的hook标签

#### 使用useState管理组件state

```tsx
const App: React.FC = (props) => {
  const [ count, setCount ] = useState<number>(0)
  return(
  	 	<button onClick={()=>{ 
        setCount(count+1) //setCount就是异步的
      }}>Click</button>
  )
}
```

#### 副作用 Side-effect

- 与药物的副作用类似:减肥药(拉肚子)，头孢(过敏)，泰诺(头痛)
- 纯函数( pure function )
  - 给一个函数同样的参数，那么这个函数永远返回同样的
  - 函数式编程理念
  - React组件输入相同的参数(props)，渲染UI应该永远一样
- 副作用与纯函数相反，指一个函数处理了与返回值无关的事情

副作用是件坏事吗？

- 当然不是,很多代码必须得借助副作用才能实现：如: AJAX,修改dom,甚至是console log
- React: state状态的改变,生命周期,构建函数,
- 副作用会给系统添加不可控因素,但是不要害怕

#### 使用useEffect异步获取数据

比如通过api获取数据，处理事件订阅。

```tsx
const [ robotGallery, setRobotGallery ] = useState<any>([]);

//传入一个匿名函数，每次ui渲染，状态改变 useEffect都会执行
useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then((data) => setRobotGallery(data) )
},[]) 

<div className={styles.robotList}>
  {robotGallery.map((r) => (//在这里就可使用robotGallery
    <Robot id={r.id} email={r.email} name={r.name} />
  ))}
</div>
```

#### useEffect使用指南

- 在useEffect函数中去掉了它的个参数以后，
- 避免这种循环，我们在第二个参数加上一个空数组

```tsx
useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then((data) => setRobotGallery(data) )
},[]) //如果缺少第二个参数，就会一直请求接口
```

如何在useEffect中使用async/await

```tsx
useEffect(()=>{
  //把副作用的逻辑代码放在一个新的异步的匿名函数
  const fetchData = async () =>{
    const responses =  await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await responses.json()
    setRobotGallery(data)
  }
  fetchData()
},[])
```

如何处理Loading

```tsx
const [loading, setLoading] = useState<boolean>(false)
useEffect(() => {
const fetchData = async () => {
  setLoading(true) //先展示loading
    const responses = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    )
    const data = await responses.json()
    setRobotGallery(data)
  } 
  //拿到数据后loading为false
  setLoading(false) 
}
fetchData()
}, [])
// 使用三元表达式来显示loading
{!loading ? (
  <div className={styles.robotList}>
    {robotGallery.map((r) => (
      <Robot id={r.id} email={r.email} name={r.name} />
    ))}
  </div>
) : (
  <h2>loading 加载中</h2>
)}
```

如何处理异常

```tsx
const [error, setError] = useState<string>('')

useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      const responses = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      )
      const data = await responses.json()
      setRobotGallery(data)
    } catch (e: any) { //通过catch来捕获报错信息
      setError(e.message)
    }
    setLoading(false)
  }
  fetchData()
}, [])

// 同理也是使用三元表达式来展示报错信息
{!error || (error !== '' && <div>网站出错：{error}</div>)}
```

#### Context 与 useContext 全局数据传递 

React上下文： Context允许组件之间共享某个数据

```tsx
// 父组件 index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const defaultContextValue = {
  username: 'alex',
}

//使用 createContext创建上下文关系对象，给定一个默认对象 defaultContextValue，然后再导出它
export const appContext = React.createContext(defaultContextValue)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    {/* 将 defaultContextValue 注入到 appContext.Provider 属性里 */}
    <appContext.Provider value={defaultContextValue}>
      <App />
    </appContext.Provider>
  </React.StrictMode>
) 

reportWebVitals()
```

```tsx
// 子组件
import { appContext } from '../index'

const Robot: React.FC<RobotProps> = ({ id, name, email }) => {
  // 使用 useContext 来访问上下文关系对象
  const value = useContext(appContext)
  return (
    <div className={styles.cardContainer}>
      <img src={`https://www.robohash.org/${id}`} alt="" />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.username}</p> 
    </div>
  )
}
```

#### 组件化Content Provider 全局数据传递

```tsx
// 需要指定类型，它的类型就是setState的类型
export const appSetStateContext = React.createContext<
  React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
>(undefined)

//这个就是个高阶函数HOC,它的功能就是把所有子组件包裹起来，并从全局的角度提供数据的支持
export const AppStateProvider: React.FC<Props> = (props) => {
  const [state, setState] = useState(defaultContextValue)
  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
        {props.children}
      </appSetStateContext.Provider>
    </appContext.Provider>
  )
}
```

#### withAddToCart()  高阶组件HOC

官网：[https://zh-hans.reactjs.org/docs/higher-order-components.html](https://zh-hans.reactjs.org/docs/higher-order-components.html)

- 高阶组件是react中非常重要的概念
- react-redux , react-router
- 不明觉厉，但其实十分简单

HOC的公式<br />`const hoc= higherOrde(wrappedComponent);`

- 高阶组件（HOC)就是--个返间了组件的函数
- 通过组件嵌套的方法给子组件添加更多的功能
- 接收一个组件作为参数并返回一个经过改造的新组件

为什么要使用高阶组件？

- 抽取重复代码，实现组件复用
- 条件渲染，控制组件的渲染逻髫（渲染劫持)
- 捕获/劫持被处理组件的生命周期

命名规范<br />`withXXX() -> withAddToCart()`

```tsx
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

//使用props传递组件的数据
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
```

#### useAddToCart()  自定义Hook函数

自定义HOOK：[https://zh-hans.reactjs.org/docs/hooks-custom.html](https://zh-hans.reactjs.org/docs/hooks-custom.html)<br />withAddToCart() vs useAddToCart()

- 两个操作都是函数
- 作用也是一样的，就是处连添加购物车
- 不一样的是:一个是with开头（高阶函数），而另一个则是用use开头（钩子函数）

自定义hooks要点

- Hook是函数
- 命名以“use”开头
- 内部可调用其他Hook函数
- 并非React的特性

高阶组件和hook函数两者，更推荐hook，使用hook以后，代码会更加清洗简洁，其次 hook是个纯函数，所以它不会给组件带来更多更复杂的生命周期，方便后期维护。

```tsx
import React, { useContext } from 'react'
import styles from './Robot.module.css'
import { appContext } from '../AppState'
import { useAddToCart } from './addToCart'

interface RobotProps {
  id: number
  name: string
  email: string
}

//使用props传递组件的数据
const RobotDiscount: React.FC<RobotProps> = ({ id, name, email }) => {
  // 使用useContext来访问上下文关系对象
  const value = useContext(appContext) 
  // 钩子函数
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
```

### 实战项目 项目搭建与首页开发

#### 网站开发设计指南

正确的项目启动思路

1. 总结业务需求 
2. 建立业务模型
3. 确定业务流程
4. 确定页面关系与数量

#### 系统设计与项目初始化

软件开发流程

- 需求分析
  - 《业务需求文档》（BRD：Business Requeirement Document）
- 系统设计
  - 界面设计：《UI设计规范》
  - 需求设计：《需求设计规范》（SRS：Software Requeirement Specific）
- 开发
- 测试
- 上线

#### Header，Footer

```tsx
import React from 'react'
import logo from './logo.svg'
import styles from './App.module.css'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

const { Header, Footer } = Layout

function App() {
  return (
    <div className={styles.App}>
      <Layout>
        <div className={styles['app-header']}>
          {/* top-header */}
          <div className={styles['top-header']}>
            <div className={styles.inner}>
              <Typography.Text>让旅游更幸福</Typography.Text>
              <Dropdown.Button
                style={{ marginLeft: 15, display: 'inline' }}
                overlay={
                  <Menu>
                    <Menu.Item>中文</Menu.Item>
                    <Menu.Item>English</Menu.Item>
                  </Menu>
                }
                icon={<GlobalOutlined />}
              >
                语言
              </Dropdown.Button>
              <Button.Group className={styles['button-group']}>
                <Button>注册</Button>
                <Button>登陆</Button>
              </Button.Group>
            </div>
          </div>
          <Header className={styles['main-header']}>
            <img src={logo} alt="logo" className={styles['App-logo']} />
            <Typography.Title level={3} className={styles.title}>
              React旅游网
            </Typography.Title>
            <Input.Search
              placeholder={'请输入旅游目的地、主题、或关键字'}
              className={styles['search-input']}
            />
          </Header>
          <Menu mode={'horizontal'} className={styles['main-menu']}>
            <Menu.Item key={1}>旅游首页</Menu.Item>
            <Menu.Item key={2}>周末游</Menu.Item>
            <Menu.Item key={3}>跟团游</Menu.Item>
            <Menu.Item key="4"> 自由行 </Menu.Item>
            <Menu.Item key="5"> 私家团 </Menu.Item>
            <Menu.Item key="6"> 邮轮 </Menu.Item>
            <Menu.Item key="7"> 酒店+景点 </Menu.Item>
            <Menu.Item key="8"> 当地玩乐 </Menu.Item>
            <Menu.Item key="9"> 主题游 </Menu.Item>
            <Menu.Item key="10"> 定制游 </Menu.Item>
            <Menu.Item key="11"> 游学 </Menu.Item>
            <Menu.Item key="12"> 签证 </Menu.Item>
            <Menu.Item key="13"> 企业游 </Menu.Item>
            <Menu.Item key="14"> 高端游 </Menu.Item>
            <Menu.Item key="15"> 爱玩户外 </Menu.Item>
            <Menu.Item key="16"> 保险 </Menu.Item>
          </Menu>
        </div>
        <Footer>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            版权所有 @ React 旅游网
          </Typography.Title>
        </Footer>
      </Layout>
    </div>
  )
}

export default App
```

#### 组件化思想实践

```tsx
// 在components文件下的header文件夹新建tsx文件
export const Header: React.FC = () => {
    return ( ... ) 
}
// 然后再在header文件夹下新建index.ts
export * from './Header'
// 最后再在componets文件夹下新建index.ts,将对应的组件文件夹导出
export * from './header'
export * from './footer'
```

这样，整个组件库 components 成为一个整体，把整个组价库拆分出来，以独立项目依赖的形式，提供别人使用

```tsx
// 最终在App.tsx引入组件并使用它
import { Header, Footer } from './components'

function App(){
	return (
  	<div>
      <Header />
      <Footer />
    </div>
  )
}
```

#### 走马灯与侧边栏多重菜单

```tsx
import React from "react";
import styles from "./SideMenu.module.css";
import { sideMenuList } from "./mockup";
import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";

export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles["side-menu"]}>
      {sideMenuList.map((m, index) => (
        <Menu.SubMenu
          key={`side-menu-${index}`}
          title={
            <span>
              <GifOutlined />
              {m.title}
            </span>
          }
        >
          {m.subMenu.map((sm, smindex) => (
            <Menu.SubMenu
              key={`sub-menu-${smindex}`}
              title={
                <span>
                  <GifOutlined />
                  {sm.title}
                </span>
              }
            >
              {sm.subMenu.map((sms, smsindex) => (
                <Menu.Item key={`sub-sub-menu-${smsindex}`}>
                  <span>
                    <GifOutlined />
                    {sms}
                  </span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
};
```

### 路由系统 react-router-dom v5

#### 路由与SPA

路由是什么？<br />浏览器向前端服务器请求页面资源，也就是UI，向后端服务器请求数据资源。如果像使用Vue, React的话，前端服务器会提供一个SPA文件，会把所有的Html,Css,Javascript一次性发送到用户的浏览器中，然后再由SPA劫持浏览器的路由从而控制页面的切换；而后端服务器不会提供任何路由支持，他只会访问数据库取得数据传递到浏览器<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1261852/1669684974649-1add70e6-ee97-447c-bfa6-73a249bdbda8.png#averageHue=%23e8c19a&clientId=ua2cde4c5-eeb7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=432&id=uac93f3d3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=432&originWidth=757&originalType=binary&ratio=1&rotation=0&showTitle=false&size=116630&status=done&style=none&taskId=u590784bc-8f7f-4634-9cc5-c97c19aa803&title=&width=757)<br />**SPA（单页网站应用）**

- ** **JS、CSS、HTML打包为一个超级大的文件，一次性丢给浏览器
- JS劫持浏览器路由，生成路由来动态渲染页面dom元素
- 符合前后端分离的趋势，服务器不负责UI输出，而专注于数据支持
- 同时支持桌面App、手机App、网站App

React网站使用的路由系统都是虚拟的

- 与后端服务器没有半毛钱关系，与实际文件也没有一一对应的关系
- 主页，http://localhost:3000
- 搜索页面：http://localhost:3000/search

React路由框架

- 综合性路由框架：react-router；最主流、也是完整的React路由解决方案
- 浏览器路由框架：react-keeper
- 手机app框架（react-native）：react-navigation

#### 配置react-router

- react-router-dom 用于浏览器，处理Web App的路由
- react-router-native 用于React Native，处理手机app的路由
- react-router-redux 提供了路由中间件，处理redux的集成
- react-router-config 用来静态配置路由

react-router-dom

- 会自动安装react-router核心框架
- <Link />组件可以渲染出</>标签
- <BrowserRouter /> 组件利用H5 API实现路由切换
- <HashRouter/>组件则利用原生JS中的window.location.hash来实现路由切换

安装 react-router，react-router-dom和 @types/react-router-dom

```tsx
cnpm i react-router -s
cnpm i react-router-dom -s
cnpm install --save @types/react-router-dom
```

React-Router(V6版本)：[https://blog.csdn.net/qq_45859670/article/details/126043419](https://blog.csdn.net/qq_45859670/article/details/126043419)

```tsx
// 在App.tsx 引入路由
import React from 'react'
import styles from './App.module.css'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { HomePage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
```

#### 基础路由系统

网站路由系统的要求

- 路由导航与原生浏览器操作行为一致
- 路由的路径解析原理与原生浏览器一致，可以自动识别url路径
- 路径的切换以页面为单位，不要页面堆叠

```tsx
import React from 'react'
import styles from './App.module.css'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { HomePage, NotFound } from './pages'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*兜底，如果上面的都匹配不到，就会渲染NotFound组件*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
```

#### 页面导航

如何在URL中添加参数

- 第一种是最常见的使用“?”来引导参数
  - [http://localhost/path?name1=vaitie1&name2=value2](http://localhost/path?name1=vaitie1&name2=value2)
- 第二种，分段路由Segments 
  - RESTful的思维方式，参数作为URL片段的一部分，使用斜杠“/比如: [http://localhost:3000/products/131415999](http://localhost:3000/products/131415999)  <br />                    域名         资源名称   参数:资源id

```tsx
// 在App.tsx这样定义
<BrowserRouter>
  <div className={styles.App}>
    <Routes>
      {/*通过分段路由*/}
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  </div>
</BrowserRouter>
// 详情页面
import React from 'react'
import { useParams } from 'react-router-dom'

export const DetailPage: React.FC = () => {
  const params = useParams()
  console.log('🤩 ~ params', params) // 这就就能拿到跳转的参数
  return <h1>路游路线详情页面, 路线ID: {params.id}</h1>
}
```

#### withRouter 与 useRouter

[react-router-dom v6 版本使用内容详解](https://blog.csdn.net/weixin_44461275/article/details/122968904?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-2-122968904-blog-127513310.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-2-122968904-blog-127513310.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=3)

```tsx
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom'

export const Header: React.FC = () => {
  // 导航操作，可以取得history的数据
  const navigate = useNavigate()
  // 当前路径的信息，可以获得location的数据
  const location = useLocation()
  // 获取动态路由的值
  const params = useParams()
  // 可以获得url匹配的数据
  const match = useSearchParams()

	// 使用方式
 	<Button onClick={() => navigate('register')}>注册</Button>
}
```

#### Link 与动态导航

- 第一点的好处就是可以节省我们的大量的代码，同时避免手动对导航栈进行处理
- 第二点就是它其实是个a标签，可以右键在新页面打开这个页面，提高用户体验

<Link /> 原理：就是一个a 标签加上history.push的结构

```tsx
import { Link } from 'react-router-dom'

import React from 'react'
import { Image, Typography } from 'antd'
import { Link } from 'react-router-dom'

interface PropsType {
  id: string | number
  size: 'large' | 'small'
  imageSrc: string
  price: number | string
  title: string
}

export const ProductImage: React.FC<PropsType> = ({
  id,
  size,
  imageSrc,
  price,
  title,
}) => {
  return (
    {/* 使用Link的 to 方法 */}
    <Link to={`detail/${id}`}> 
      {size === 'large' ? (
        <Image src={imageSrc} height={285} width={490} />
      ) : (
        <Image src={imageSrc} height={120} width={240} />
      )}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger">¥ {price} 起</Typography.Text>
      </div>
    </Link>
  )
}
```

### Redux入门 实战项目架构设计

#### 是什么是redux

设计模式

- MVC，MVVM，MV*
- 针对React项目，我们有Redux
- Angular：ng-redux   Observable(RxJS)
- Vue：vuejs-redux （Vuex）

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1261852/1669712633396-6890926f-f735-4b54-a396-35447d2b7e79.png#averageHue=%23ece9e8&clientId=u6924b93f-dd83-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=387&id=ufb1998bc&margin=%5Bobject%20Object%5D&name=image.png&originHeight=387&originWidth=785&originalType=binary&ratio=1&rotation=0&showTitle=false&size=123202&status=done&style=none&taskId=u6c76ca3e-c370-4383-b5c7-d756c407b29&title=&width=785)<br />**redux统一保存数据，在隔离了数据与UI的同时，负责处理数据的绑定。**<br />什么时候需要使用Redux ? 

- 组件需要共享数据（或者叫做状态state )的时候
- 某个状态需要在任何地方都可以被随时访问的时候
- 某个组件需要改变另一个组件的状态的时候
- 语言切换、黑暗模式切换、用户登录全局数据共享...

**使用redux最终的目的就是让状态state变化可控可预测**<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1261852/1669712991985-09348ebc-e981-4b2b-8372-6d7a79428727.png#averageHue=%23fdfdfb&clientId=u6924b93f-dd83-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=465&id=ucb30349a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=465&originWidth=840&originalType=binary&ratio=1&rotation=0&showTitle=false&size=168553&status=done&style=none&taskId=u73ffb991-db19-4657-8be2-b0d96608fc5&title=&width=840)<br />Store：保存的就是全局数据，有且只有一个Store，可以看做带有推送功能的数据仓库<br />Reducer：就是帮助Store处理数据的方法，可以初始化数据，修改数据也可以删除数据<br />Actions：就是数据更新的指令，他会告诉	Reducer如何处理数据<br />Redux工作流程：

1. 首先创建数据仓库 Store ；
2. Reducer 会同时初始化数据state
3. ReactComponent会订阅Store，Store的数据就会被推送过来，然后渲染UI
4. 如果组件需要修改数据，那么他会发送一个 Action；这个过程就叫dispatch
5. Action会以事件驱动的方式被store所截获，而store会把自己当前的数据以及指令传递给Reducer，由Reducer去更新数据，而当Reducer更新完成以后，就会向store输出return一个新的state
6. store取得新的数据以后，会送订阅了自己的React组件推送这个新的数据，重新渲染UI

#### 创建state - createStore

```tsx
 cnpm i redux   //安装redux
```

```tsx
// 创建了项目的数据中心 store， 只负责保存数据 不负责处理数据
import { createStore } from 'redux'
import languageReducer from './languageReducer'

const store = createStore(languageReducer)

export default store
```

```tsx
// 创建处理语言的reducer；语言的配置信息在这里通过action的交互进行处理
// 整个reducer就是以旧换新的过程
interface LanguageState{
  language: 'en'|'zh',
  languageList:{name: string, code: string}[]
}

// 初始化state
const defaultState: LanguageState = {
  language:'zh',
  languageList:[
    {name:'中文',code:'zh'},
    {name:'English',code:'en'}
  ]
}

//利用参数传入的state，经过数据变化生成新的数据；action则是指挥reducer做出数据变换的指令
export default (state = defaultState, action) => {
  return state
}
```

#### 访问state - 获取store数据

```tsx
import store from '../../redux/store'
// 通过 getState() 来获取store数据
const storeState = store.getState()
const state = {
  language: storeState.language,
  languageList: storeState.languageList,
}

<Dropdown.Button
  style={{ marginLeft: 15, display: 'inline' }}
  overlay={
    <Menu> 
    	{/*这样就可以遍历显示store的数据*/}
      {state.languageList.map((l) => {
        return <Menu.Item key={l.code}>{l.name}</Menu.Item>
      })}
    </Menu>
  }
  icon={<GlobalOutlined />}
>
  {state.language === 'zh' ? '中文' : 'English'}
</Dropdown.Button>
```

#### 更新state -  Action与Reducer处理

redux官网：[https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers)

```tsx
// 点击切换语言系统事件
const menuClickHandler = (e) => {
  // 消息分发
  const action = {
    type: 'change_language',
    payload: e.key,
  }
  store.dispatch(action)
}
```

```tsx
// 处理语言的reducer
export default (state = defaultState, action) => {
  if(action.type === 'change_language'){
    // 必须得创建一个新的对象；更新 language，更新的属于来源于 action.payload
    const newState = {...state, language: action.payload};
    return newState
  }
  return state
}
```

#### 订阅state - store的连接与订阅

```tsx
  const menuClickHandler = (e) => {
    if (e.key === 'new') {
      // 处理新语言添加action
      const action = {
        type: 'add_language',
        payload: { code: 'new_language', name: '新语言' },
      }
      store.dispatch(action)
    } else {
      // 消息分发
      const action = {
        type: 'change_language',
        payload: e.key,
      }
      store.dispatch(action)
    }
  }
```

```tsx
export default (state = defaultState, action) => {
  switch (action.type) {
    case "change_language":
      return { ...state, language: action.payload };
    case "add_language":
      return {
        ...state,
        languageList: [...state.languageList, action.payload],
      };
    default:
      return state;
  }
};
```

#### i18n - 完成网站语言切换

I18n来源一个英文单词：Internationalization （18个字符）<br />能根据不同的语言及地区显示相应的界面<br />原理：

- 语言包作为静态资源单独保存: xml , json
- 每种语言对应一个文件
- 切换语言设置时，语言文件也会随之切换

I18n工具：

- i18next：目前最主流的框架
- react-i18next：i18next的React插件  [https://react.i18next.com/](https://react.i18next.com/)

` cnpm install react-i18next i18next --save `

```tsx
// 首先在index.tsx引入
import './i18n/config'
```

```tsx
import React from 'react'
import styles from './Footer.module.css'
import { Layout, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Layout.Footer className={styles.footer}>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        {/*这样使用它*/}
        {t('footer.detail')}
      </Typography.Title>
    </Layout.Footer>
  )
}
```

```tsx
// 最后再处理语言的reducer使用它
import i18n from "i18next";

export interface LanguageState {
  language: "en" | "zh";
  languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" },
  ],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "change_language":
      i18n.changeLanguage(action.payload) // 这样处理是不标准的，有副作用
      return { ...state, language: action.payload };
    case "add_language":
      return {
        ...state,
        languageList: [...state.languageList, action.payload],
      };
    default:
      return state;
  }
};
```

#### redux重构 - action的拆分与统一

将与语言相关的代码都放在language文件夹中

```tsx
export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: "zh" | "en";
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: { name: string; code: string };
}

// 混合类型就意味着在程序运行的时候，类型可以动态的发生改变
export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreator = (
  languageCode: "zh" | "en"
): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode,
  };
};

export const addLanguageActionCreator = (
  name: string,
  code: string
): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { name, code },
  };
};
```

```tsx
import i18n from "i18next";
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from './languageActions'

export interface LanguageState {
  language: "en" | "zh";
  languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" },
  ],
};

export default (state = defaultState, action: LanguageActionTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload) // 这样处理是不标准的，有副作用
      return { ...state, language: action.payload };
    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [...state.languageList, action.payload],
      };
    default:
      return state;
  }
};
```

```tsx
import {
  changeLanguageActionCreator,
  addLanguageActionCreator,
} from '../../redux/language/languageActions'

const menuClickHandler = (e) => {
  if (e.key === 'new') {
    // 处理新语言添加action
    const action = addLanguageActionCreator('新语言', 'new_lang')
    store.dispatch(action)
  } else {
    // 消息分发
    const action = changeLanguageActionCreator(e.key)
    store.dispatch(action)
  }
}
```

#### redux封装 - 在函数式组件中使用react-redux

官网：[https://react-redux.js.org/introduction/getting-started](https://react-redux.js.org/introduction/getting-started)<br />安装react-redux<br />`cnpm install react-redux@7.2 `<br />`cnpm i @types/react-redux@7.1.15 --save-dev `

### 异步AJAX与redux中间件

#### RESTful

之前的开发方式：JSP、Silverlight、ASP .NET WebForm<br />RESTful的基本特点

- 无状态
- 面向“资源”，只有名词没有动词 api/v1/touristRoutes
- 使用HTTP的动词，也就是相同的url可以不同的HTTP请求来完成针对这个资源的响应操作
  - GET 表示查看  HTTP GET  api/v1/touristRoutes
  - POST 表示创建  HTTP POST  api/v1/touristRoutes
  - PUT 表示更新  HTTP PUT  api/v1/touristRoutes/{id}
  - PATCH 表示部分更新  HTTP PATCH  api/v1/touristRoutes/{id}
  - DELETE 表示删除 HTTP DELETE  api/v1/touristRoutes/{id}
- HATOAS超媒体即应用状态引擎

### 用户登录

#### Status Code 的重要性

HTTP状态码

- 用户可以知道服务器端是正常处理了请求，还是出现了什么错误
- 三位数字的状态码和一个含符串格式状态消息组成
- 数字码便于程序进行处理，而消息字符串更方便程序员(人）理解

HTTP状态码被分为五大类

| 1xx  | Informational | 信息性 状态码；表示接收的请求正在处理         |                                                              |
| ---- | ------------- | --------------------------------------------- | ------------------------------------------------------------ |
| 2xx  | Success       | 成功 状态码；表示请求正常处理完毕             | 201：表示创建一个东西成功返回的状态码；<br />204：表示当后端处理成功后不需要你输出任何数据 |
| 3xx  | Redirection   | 重定向 状态码；表示需要客户端需要进行附加操作 | 301和302：  表示永久转移<br />304：表示临时转移              |
| 4xx  | Client Error  | 客户端错误 状态码；表示服务器无法处理请求     | 400：表示错误的请求<br />401：表示用户未登录 Unauthorized <br />403：表示用户登录了但没有访问权限 Forbidden<br />404：表示请求不存在 |
| 5xx  | Server Error  | 服务器错误 状态码；表示服务器处理请求出错     | 500：发送请求是合法的，服务器自身出了问题                    |

#### JWT原理剖析

JWT是干什么用的？<br />JSON Web Token；JWT的作用是 用户授权（Authorization），而不是用户的身份认证（Authentication） 

- 用户认证指的是使用用户名、密码来验证当前用户的身份
  - 就是用户登陆
  - 错误状态码:401 Unauthorized (未授权)
- 用户授权指当前用户有足够的权限访问特定的资源
  - 错误状态码:403 forbidden(禁止访问)

传统的Session登录；也就有状态登录

- 用户登录后，服务器会保存登陆的session信息
- Session ID会通过cookie传递给前端
- http请求会附带cookie

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1261852/1669945513044-22ca7a99-fc1f-4cef-8029-347249004897.png#averageHue=%23f4ecf0&clientId=u8ae1166d-1d1e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=400&id=u6a70b68a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=400&originWidth=826&originalType=binary&ratio=1&rotation=0&showTitle=false&size=123007&status=done&style=none&taskId=u5865d6ab-0af6-4a73-a2ba-d2ce4ba1ea4&title=&width=826)<br />JWT彻底改变了用户授权与认证的过程；也就是无状态登录

- 替换cookie
- JWT信息只需要保存在客户端
- 无状态登录

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1261852/1669945710375-bdd06bd9-871d-403d-9bb4-c9c1d0f13deb.png#averageHue=%23f5edf1&clientId=u8ae1166d-1d1e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=431&id=u21f74202&margin=%5Bobject%20Object%5D&name=image.png&originHeight=431&originWidth=819&originalType=binary&ratio=1&rotation=0&showTitle=false&size=102543&status=done&style=none&taskId=u7865ecdc-232a-4fbf-bdab-fa1340418ea&title=&width=819)<br />Session vs JWT

- Session需要保存在服务器上，而Session ID则保存在前端cookie中
- JWT信息只需要保存在客户端
- 无状态登陆优势∶分布式部署

#### JWT与单点登录实例解释

JWT官网；[https://jwt.io/](https://jwt.io/)<br />JWT的原理：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1261852/1669946108022-a237636d-a6e7-4a07-8a49-1076fcb0ee23.png#averageHue=%23fdfbfb&clientId=u8ae1166d-1d1e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=656&id=u45fa7ce3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=656&originWidth=1342&originalType=binary&ratio=1&rotation=0&showTitle=false&size=75824&status=done&style=none&taskId=u10cef29b-f0ae-4f72-96fe-88a3cc18000&title=&width=1342)<br />红色部分：JWT的头部HEADER  ，具体描述了你JWT当前使用的编码算法；比如说我们使用的是 HS256；<br />这个部分将用于最后一个部分的数字签名<br />紫色部分：表示JWT的PAYLOAD，保存的就是具体的用户信息，比如说用户的id，name ；这个部分字段是可以自定义的；一般会加上`"exp": 10000` 表示在token创建好以后过多少秒才会过期；过期整个token作废；<br />蓝色部分：表示JWT的数字签名 (SIGNATURE)；就是JWT的激光防伪标志；服务器通过这个数字签名判断你所发的token是否有效，是否被篡改过，一旦数字签名失败，整个JWT就作废了。数字签名使用的是非对称加密算法RSA，有且只能使用服务器的私钥才能解密，所以只要私钥不丢失基本绝对安全。<br />常用的单点登录（SSO）系统

- 企业级的付费框架ForgeRock，微软的Micriosoft AM
- 开源框架 OpenAM，OpenIDM，OpenDJ

JWT的优点

- 无状态，简单、方便，完美支持分布式部署
- 非对称加密，Token安全性高

JWT的缺点

- 无状态，token一经发布则无法取消
- 明文传递，Token安全性低 （使用https可以解决）

#### redux-persist：登录持久化

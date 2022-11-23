// 创建全局state和上下文关系组件
import React, { useState } from 'react'

interface Props {
  children?: React.ReactNode
}

interface AppStateValue {
  username: String
  shoppingCart: { items: { id: Number; name: string }[] }
}

const defaultContextValue: AppStateValue = {
  username: 'alex',
  shoppingCart: { items: [] },
}

//使用 createContext创建上下文关系对象，给定一个默认对象 defaultContextValue
export const appContext = React.createContext(defaultContextValue)
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

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// import 'antd/dist/reset.css'
import './i18n/config'
import axios from 'axios'

axios.defaults.headers['x-icode'] = 'FB80558A73FA658E'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

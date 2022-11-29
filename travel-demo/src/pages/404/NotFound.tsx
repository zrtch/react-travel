import React from 'react'
import { Empty } from 'antd'
import styles from './NotFound.module.css'

export class NotFound extends React.Component {
  render() {
    return (
      <div className={styles.NotFound}>
        <Empty
          description={
            <div>
              <h2>404!</h2>
              <span>
                <a href="/">返回首页</a>
              </span>
            </div>
          }
        />
      </div>
    )
  }
}

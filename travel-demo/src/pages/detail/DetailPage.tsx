import React from 'react'
import { useParams } from 'react-router-dom'

export const DetailPage: React.FC = () => {
  const params = useParams()
  console.log('🤩 ~ params', params)
  return <h1>111</h1>
}

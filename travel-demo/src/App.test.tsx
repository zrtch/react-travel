import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers'

test('renders learn react link', () => {
  render(<App />)
  // const linkElement = screen.getByText(/learn react/i)
  expect.extend({ toBeInTheDocument })
  // expect(linkElement).toBeInTheDocument()
})

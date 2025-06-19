import { render, screen } from '@testing-library/react'
import App from './App'

test('renders login heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /rapid7 login/i })).toBeInTheDocument()
})

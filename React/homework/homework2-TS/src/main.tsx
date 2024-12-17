import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ShoppingList from './components/Shopping.list.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShoppingList />
  </StrictMode>,
)

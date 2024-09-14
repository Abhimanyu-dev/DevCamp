import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StockProvider } from './provider/stockProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StockProvider>
      <App />
    </StockProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BattingOrder from './BattingOrder.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BattingOrder />
  </StrictMode>,
)

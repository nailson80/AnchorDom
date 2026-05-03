import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ConstraintSpacerExample from './ConstraintSpacerExample'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConstraintSpacerExample />
  </StrictMode>,
)
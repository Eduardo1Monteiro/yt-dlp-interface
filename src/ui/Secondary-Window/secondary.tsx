import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Secondary from './OptionsWindow'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Secondary />
  </StrictMode>,
)

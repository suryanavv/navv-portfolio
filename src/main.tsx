import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import '@fontsource-variable/geist'
import './index.css'
import App from './App.tsx'

// Vercel Analytics only exists on the deployed site; locally its script would 404.
if (!/^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)) inject()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

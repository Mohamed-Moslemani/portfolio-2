import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// A service worker left behind by another project on this origin can hijack
// navigation and serve that site instead. Drop any that is registered here.
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => reg.unregister())
  })
  if ('caches' in window) {
    caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)))
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

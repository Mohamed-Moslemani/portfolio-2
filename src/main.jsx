import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
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

const container = document.getElementById('root')
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

/* The build pre-renders each route into the HTML. When that markup is
   present we hydrate it, so the text a crawler sees is the same text
   the visitor sees, with no re-paint. `npm run dev` serves an empty
   root, so it takes the createRoot path. */
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}

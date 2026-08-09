import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BackToTop from './components/BackToTop'
import BackgroundScene from './components/BackgroundScene'
import Footer from './components/Footer'
import LoadingAnimation from './components/LoadingAnimation'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

/* The art routes and the 404 are split out, the homepage should not
   pay for pages most visitors never open. */
const ArtPage = lazy(() => import('./pages/ArtPage'))
const ArtworkPage = lazy(() => import('./pages/ArtworkPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

/* ---------------------------------------------------------------
   App: the shell every route sits inside: intro stroke, navbar,
   routed main, footer.
   --------------------------------------------------------------- */

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <BackgroundScene />

      {loading && <LoadingAnimation onDone={() => setLoading(false)} />}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="app-main">
        <Suspense
          fallback={
            <div className="route-fallback t-mono-sm" role="status">
              Loading
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/art" element={<ArtPage />} />
            <Route path="/art/:slug" element={<ArtworkPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </BrowserRouter>
  )
}

import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import BackToTop from './components/BackToTop'
import BackgroundScene from './components/BackgroundScene'
import Footer from './components/Footer'
import LoadingAnimation from './components/LoadingAnimation'
import Navbar from './components/Navbar'
import ArtPage from './pages/ArtPage'
import ArtworkPage from './pages/ArtworkPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

/* ---------------------------------------------------------------
   AppShell: everything inside the router.

   Kept separate from App so the build's pre-render step can render
   the same tree with a StaticRouter.

   The art routes used to be React.lazy chunks. They are imported
   directly now: together they were about 6 kB, which is not worth a
   Suspense fallback flashing over pre-rendered content on every
   first paint.
   --------------------------------------------------------------- */

export default function AppShell() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <BackgroundScene />

      {loading && <LoadingAnimation onDone={() => setLoading(false)} />}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/art" element={<ArtPage />} />
          <Route path="/art/:slug" element={<ArtworkPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}

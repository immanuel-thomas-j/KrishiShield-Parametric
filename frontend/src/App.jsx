import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 text-slate-850 flex flex-col justify-between font-sans">
        <div className="no-print">
          <Navbar />
        </div>
        <div className="flex-grow pt-16"> {/* Offset for navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback to Home if page not found */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <div className="no-print">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

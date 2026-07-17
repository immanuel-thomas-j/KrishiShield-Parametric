import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Menu, X, ChevronRight } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Shield className="h-4.5 w-4.5 text-emerald-600" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">
            KrishiShield <span className="text-emerald-600">Parametric</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                pathname === link.to
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white transition shadow-lg shadow-emerald-500/20">
            Launch Portal <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-600 hover:text-slate-900">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-1 shadow-lg">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                pathname === link.to ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'}`}>
              {link.label}
            </Link>
          ))}
          <Link to="/dashboard" onClick={() => setOpen(false)}
            className="block mt-3 px-4 py-2.5 rounded-lg bg-emerald-600 text-sm font-bold text-white text-center">
            Launch Portal
          </Link>
        </div>
      )}
    </nav>
  )
}

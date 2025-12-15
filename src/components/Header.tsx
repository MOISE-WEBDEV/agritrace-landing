'use client'

import { useState } from 'react'

interface HeaderProps {
  onSignup: () => void
  onLogin: () => void
}

export default function Header({ onSignup, onLogin }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌾</span>
            <span className="text-xl font-bold text-agri-green">Agritrace</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#fonctionnalites" className="text-gray-600 hover:text-agri-green transition-colors">
              Fonctionnalités
            </a>
            <a href="#services" className="text-gray-600 hover:text-agri-green transition-colors">
              Services
            </a>
            <a href="#tarifs" className="text-gray-600 hover:text-agri-green transition-colors">
              Tarifs
            </a>
            <a href="#temoignages" className="text-gray-600 hover:text-agri-green transition-colors">
              Témoignages
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onLogin}
              className="text-agri-green hover:text-agri-green-dark font-medium transition-colors"
            >
              Se connecter
            </button>
            <button
              onClick={onSignup}
              className="bg-agri-green hover:bg-agri-green-dark text-white px-5 py-2 rounded-full font-medium transition-all hover:shadow-lg"
            >
              Créer un compte
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <a href="#fonctionnalites" className="text-gray-600 hover:text-agri-green">
                Fonctionnalités
              </a>
              <a href="#services" className="text-gray-600 hover:text-agri-green">
                Services
              </a>
              <a href="#tarifs" className="text-gray-600 hover:text-agri-green">
                Tarifs
              </a>
              <a href="#temoignages" className="text-gray-600 hover:text-agri-green">
                Témoignages
              </a>
              <hr />
              <button
                onClick={onLogin}
                className="text-agri-green font-medium text-left"
              >
                Se connecter
              </button>
              <button
                onClick={onSignup}
                className="bg-agri-green text-white px-5 py-2 rounded-full font-medium w-full"
              >
                Créer un compte
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

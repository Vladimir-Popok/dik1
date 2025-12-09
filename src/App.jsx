import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Pyramid from './components/Pyramid'
import QualityIndicators from './components/QualityIndicators'

function Navigation() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-700">
              Жизненный цикл ИМС
            </Link>
          </div>
          <div className="flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              Пирамида
            </Link>
            <Link
              to="/quality"
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/quality')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              Показатели качества
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<Pyramid />} />
          <Route path="/quality" element={<QualityIndicators />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


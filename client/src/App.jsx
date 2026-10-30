

import { useEffect, useState } from 'react'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'

const getCurrentPage = () => window.location.hash === '#about' ? 'about' : 'home'

const App = () => {
  const [currentPage, setCurrentPage] = useState(getCurrentPage)

  useEffect(() => {
    const handleHashChange = () => setCurrentPage(getCurrentPage())

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return currentPage === 'about' ? <About /> : <Home />
}

export default App
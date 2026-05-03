import { useState } from 'react'
import Home from './pages/Home'
import ContentOptimizer from './pages/ContentOptimizer'
import ContentAnalyzer from './pages/ContentAnalyzer'

export default function App() {
  const [page, setPage] = useState('home')

  // Simple hash-based routing for static site
  const hash = window.location.hash.slice(1)
  
  if (hash === 'content-optimizer') return <ContentOptimizer />
  if (hash === 'content-analyzer') return <ContentAnalyzer />
  
  return <Home />
}

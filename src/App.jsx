import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuGrid from './components/MenuGrid'
import ResultsPanel from './components/ResultsPanel'
import OfflineBanner from './components/OfflineBanner'

export default function App() {
  const [activeEndpoint, setActiveEndpoint] = useState(null)
  const [language, setLanguage] = useState('es')

  const handleSelect = (id) => {
    setActiveEndpoint((prev) => (prev === id ? null : id))
  }

  return (
    <>
      <OfflineBanner />
      <Header language={language} onLanguageChange={setLanguage} />
      <main>
        <Hero />
        <MenuGrid activeId={activeEndpoint} onSelect={handleSelect} />
        {activeEndpoint && (
          <ResultsPanel endpointId={activeEndpoint} language={language} />
        )}
      </main>
    </>
  )
}

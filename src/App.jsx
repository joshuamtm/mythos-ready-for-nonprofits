import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import TierPicker from './components/TierPicker.jsx'
import Intro from './components/Intro.jsx'
import RiskRegister from './components/RiskRegister.jsx'
import PriorityActions from './components/PriorityActions.jsx'
import SelfAssessment from './components/SelfAssessment.jsx'
import BoardBriefing from './components/BoardBriefing.jsx'

export default function App() {
  const [tab, setTab] = useState('intro')
  const [tier, setTier] = useState('medium')
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('mythos-ready:self-assessment')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header tab={tab} setTab={setTab} />
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm no-print">
        <div className="max-w-container mx-auto px-6 py-3">
          <TierPicker tier={tier} setTier={setTier} compact />
        </div>
      </div>
      <main className="flex-grow max-w-container mx-auto px-6 py-8 w-full">
        {tab === 'intro' && <Intro tier={tier} setTab={setTab} />}
        {tab === 'risks' && <RiskRegister tier={tier} />}
        {tab === 'actions' && <PriorityActions tier={tier} />}
        {tab === 'assess' && <SelfAssessment tier={tier} answers={answers} setAnswers={setAnswers} setTab={setTab} />}
        {tab === 'briefing' && <BoardBriefing tier={tier} setTier={setTier} answers={answers} />}
      </main>
      <Footer />
    </div>
  )
}

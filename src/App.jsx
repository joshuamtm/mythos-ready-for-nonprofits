import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import TierPicker from './components/TierPicker.jsx'
import Intro from './components/Intro.jsx'
import RiskRegister from './components/RiskRegister.jsx'
import PriorityActions from './components/PriorityActions.jsx'
import SelfAssessment from './components/SelfAssessment.jsx'
import BoardBriefing from './components/BoardBriefing.jsx'
import Frameworks from './components/Frameworks.jsx'

export default function App() {
  const [tab, setTab] = useState('intro')
  const [tier, setTier] = useState('medium')
  const [answers, setAnswers] = useState({})

  return (
    <div className="min-h-screen flex flex-col">
      <Header tab={tab} setTab={setTab} />
      <main className="flex-grow max-w-container mx-auto px-6 py-8 w-full">
        {tab !== 'intro' && tab !== 'frameworks' && tab !== 'briefing' && (
          <TierPicker tier={tier} setTier={setTier} compact />
        )}
        {tab === 'intro' && <Intro tier={tier} setTab={setTab} />}
        {tab === 'risks' && <RiskRegister tier={tier} />}
        {tab === 'actions' && <PriorityActions tier={tier} />}
        {tab === 'assess' && <SelfAssessment tier={tier} answers={answers} setAnswers={setAnswers} setTab={setTab} />}
        {tab === 'briefing' && <BoardBriefing tier={tier} setTier={setTier} answers={answers} />}
        {tab === 'frameworks' && <Frameworks />}
      </main>
      <Footer />
    </div>
  )
}

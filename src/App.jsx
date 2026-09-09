import Navbar from './components/Navbar'
import TripTimeline from './components/TripTimeline'
import DisruptionSimulator from './components/DisruptionSimulator'
import ItineraryBuilder from './components/ItineraryBuilder'
import EventDetail from './components/EventDetail'
import RecoveryModal from './components/RecoveryModal'
import { AnimatePresence } from 'framer-motion'
import { TripProvider, useTrip } from './context/TripContext'

function Workspace() {
  const { view, setView, itinerary, disruption, showRecoveryModal } = useTrip()
  return <div className="app-shell">
    <Navbar />
    <main>
      {view === 'builder' && <ItineraryBuilder />}
      {view === 'detail' && <EventDetail />}
      {view === 'timeline' && <>
        <section className="hero"><p className="eyebrow">RESILIENT TRAVEL STATE ENGINE</p><h1>A route that tells you<br /><em>what breaks next.</em></h1><p className="hero-copy">Create your own itinerary, test a real-world delay, and see the exact point where a safe connection becomes impossible.</p><div className="trip-chip"><span className="pulse" /> {itinerary.length} stops in session <span>·</span> buffers monitored</div><button className="hero-create" onClick={() => setView('builder')}>Create a new itinerary <span>→</span></button></section>
        {disruption && <div className="blast-banner">Blast radius active — affected connections are marked in red. <button onClick={() => setView('builder')}>Adjust route</button></div>}
        <TripTimeline /><DisruptionSimulator />
      </>}
    </main><AnimatePresence>{showRecoveryModal && <RecoveryModal />}</AnimatePresence>
  </div>
}

export default function App() { return <TripProvider><Workspace /></TripProvider> }

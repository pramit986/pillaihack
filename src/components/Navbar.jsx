import { CirclePlus, Map } from 'lucide-react'
import { useTrip } from '../context/TripContext'

export default function Navbar() {
  const { setView, view } = useTrip()
  return <nav className="navbar">
    <button className="brand" onClick={() => setView('timeline')}><span className="brand-mark">C</span><span>Chrono<span>Route</span></span></button>
    <div className="nav-actions">
      <button className={`nav-tab ${view === 'timeline' ? 'selected' : ''}`} onClick={() => setView('timeline')}><Map size={15} /> Timeline</button>
      <button className={`nav-tab ${view === 'builder' ? 'selected' : ''}`} onClick={() => setView('builder')}><CirclePlus size={15} /> Create</button>
      <span className="live-badge"><i /> Session saved</span>
    </div>
  </nav>
}

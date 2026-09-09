import { useState } from 'react'
import { RotateCcw, Siren } from 'lucide-react'
import { useTrip } from '../context/TripContext'

export default function DisruptionSimulator() {
  const { itinerary, disruption, simulateDisruption, clearDisruption } = useTrip()
  const [selectedId, setSelectedId] = useState(itinerary[0]?.id)
  const [delay, setDelay] = useState(90)
  return <aside className="simulator">
    <div className="simulator-title"><span><Siren size={15} /> Test mode</span><small>Chaos & recovery engine</small></div>
    <label className="test-label">Event<select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>{itinerary.map((event) => <option key={event.id} value={event.id}>{event.title || event.category}</option>)}</select></label>
    <label className="test-label">Delay <span className="delay-number">+{delay} minutes</span><input type="range" min="15" max="240" step="15" value={delay} onChange={(e) => setDelay(Number(e.target.value))} /></label>
    <div className="delay-actions">
      <button className="delay-primary" onClick={() => simulateDisruption(selectedId, delay)}>Simulate disruption</button>
      {disruption && <button onClick={clearDisruption} aria-label="Clear test"><RotateCcw size={15} /></button>}
    </div>
  </aside>
}

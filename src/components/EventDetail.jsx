import { ChevronLeft, Clock3, MapPin, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTrip } from '../context/TripContext'

const date = (value) => new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value))

export default function EventDetail() {
  const { itinerary, selectedEventId, setView, disruption } = useTrip()
  const event = itinerary.find((item) => item.id === selectedEventId)
  if (!event) return null
  const isDelayed = disruption?.eventId === event.id
  return <motion.section className="workspace detail-view" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
    <button className="back-link" onClick={() => setView('timeline')}><ChevronLeft size={17} /> Back to route</button>
    <div className="detail-card"><p className="eyebrow">{event.category} · STOP DETAIL</p><h1>{event.title}</h1><div className={`detail-status ${isDelayed ? 'danger' : ''}`}>{isDelayed ? `Delay simulation active · +${disruption.delayMinutes} minutes` : 'Protected by route constraints'}</div><div className="detail-grid"><div><MapPin size={19} /><small>Location</small><p>{event.location}</p></div><div><Clock3 size={19} /><small>Starts</small><p>{date(event.startTime)}</p></div><div><Clock3 size={19} /><small>Ends</small><p>{date(event.endTime)}</p></div><div><ShieldCheck size={19} /><small>Minimum transit buffer</small><p>{event.buffer} minutes</p></div></div></div>
  </motion.section>
}

import { useState } from 'react'
import { ArrowDown, ArrowUp, ChevronLeft, CirclePlus, GripVertical, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTrip } from '../context/TripContext'

const categories = ['Flight', 'Train', 'Hotel', 'Activity']
const blankEvent = (category = 'Flight') => ({ id: crypto.randomUUID(), category, title: '', location: '', startTime: '', endTime: '', buffer: 30 })

export default function ItineraryBuilder() {
  const { itinerary, finalizeItinerary, setView } = useTrip()
  const [events, setEvents] = useState(itinerary)
  const [category, setCategory] = useState('Flight')
  const [error, setError] = useState('')

  // Updates only the targeted draft event so unfinished work remains safely in session.
  const updateEvent = (id, field, value) => setEvents((current) => current.map((event) => event.id === id ? { ...event, [field]: value } : event))
  const addEvent = () => setEvents((current) => [...current, blankEvent(category)])
  const removeEvent = (id) => setEvents((current) => current.filter((event) => event.id !== id))

  // Moves a stop within the array; all existing field values move with its event object.
  const moveEvent = (index, direction) => setEvents((current) => {
    const target = index + direction
    if (target < 0 || target >= current.length) return current
    const next = [...current]
    ;[next[index], next[target]] = [next[target], next[index]]
    return next
  })
  const finalize = () => {
    if (events.length < 2 || events.some((event) => !event.title || !event.location || !event.startTime || !event.endTime)) {
      setError('Add at least two complete events before finalizing your route.')
      return
    }
    finalizeItinerary(events)
  }

  return <section className="workspace builder-view">
    <div className="workspace-top"><button className="back-link" onClick={() => setView('timeline')}><ChevronLeft size={17} /> Back to timeline</button><span>CREATE MODE · SESSION DRAFT</span></div>
    <header className="editor-heading"><p>Route composer</p><h1>Build a journey with <em>room to breathe.</em></h1><span>Each buffer becomes a constraint the recovery engine can protect.</span></header>
    <div className="builder-layout">
      <aside className="builder-sidebar"><p className="panel-label">Add a stop</p><div className="category-tabs">{categories.map((item) => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><button className="add-event" onClick={addEvent}><CirclePlus size={17} /> Add {category}</button><div className="builder-note"><b>How it works</b><span>ChronoRoute checks whether an event ends with enough transit time before the next begins.</span></div></aside>
      <div className="event-editor">
        <div className="editor-label"><span>Your route</span><small>{events.length} stops</small></div>
        <AnimatePresence initial={false}>{events.map((event, index) => <motion.article layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="event-form" key={event.id}>
          <div className="event-order"><GripVertical size={16} /><b>{String(index + 1).padStart(2, '0')}</b></div>
          <div className="form-main"><div className="form-heading"><select value={event.category} onChange={(e) => updateEvent(event.id, 'category', e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><div><button aria-label="Move event up" onClick={() => moveEvent(index, -1)} disabled={index === 0}><ArrowUp size={15} /></button><button aria-label="Move event down" onClick={() => moveEvent(index, 1)} disabled={index === events.length - 1}><ArrowDown size={15} /></button><button aria-label="Delete event" className="delete" onClick={() => removeEvent(event.id)}><Trash2 size={14} /></button></div></div>
            <div className="form-grid"><label>Title<input value={event.title} onChange={(e) => updateEvent(event.id, 'title', e.target.value)} placeholder="e.g. AI-102 · Delhi to Jaipur" /></label><label>Location<input value={event.location} onChange={(e) => updateEvent(event.id, 'location', e.target.value)} placeholder="Where does this happen?" /></label><label>Start time<input type="datetime-local" value={event.startTime} onChange={(e) => updateEvent(event.id, 'startTime', e.target.value)} /></label><label>End time<input type="datetime-local" value={event.endTime} onChange={(e) => updateEvent(event.id, 'endTime', e.target.value)} /></label><label className="buffer-field">Minimum transit buffer<input type="number" min="0" value={event.buffer} onChange={(e) => updateEvent(event.id, 'buffer', Number(e.target.value))} /><span>minutes required before next stop</span></label></div>
          </div>
        </motion.article>)}</AnimatePresence>
        {error && <p className="form-error">{error}</p>}<button className="finalize-button" onClick={finalize}>Finalize itinerary <span>→</span></button>
      </div>
    </div>
  </section>
}

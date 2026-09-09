import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { BedDouble, ChevronRight, CircleAlert, MapPin, Plane, Ticket, TrainFront } from 'lucide-react'
import { useTrip } from '../context/TripContext'

const icons = { Flight: Plane, Train: TrainFront, Hotel: BedDouble, Activity: Ticket }
const formatted = (value) => new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value))

function calculateRoute(events, disruption, recoveryState) {
  if (!disruption) return events.map((event) => ({ ...event, state: 'healthy' }))
  const disruptionIndex = events.findIndex((event) => event.id === disruption.eventId)
  const delayedEnd = new Date(new Date(events[disruptionIndex].endTime).getTime() + disruption.delayMinutes * 60000)
  let blastActive = false
  const disruptedRoute = events.map((event, index) => {
    if (index < disruptionIndex) return { ...event, state: 'healthy' }
    if (index === disruptionIndex) return { ...event, state: 'delayed', calculatedEnd: delayedEnd.toISOString() }
    const previous = events[index - 1]
    const previousEnd = index - 1 === disruptionIndex ? delayedEnd : new Date(previous.endTime)
    const deadline = new Date(previousEnd.getTime() + previous.buffer * 60000)
    if (new Date(event.startTime) < deadline) blastActive = true
    return { ...event, state: blastActive ? 'broken' : 'healthy' }
  })

  if (recoveryState === 'none') return disruptedRoute
  // Replaces the first broken transfer and restores later stops once a recovery decision is made.
  const recoveryIndex = disruptedRoute.findIndex((event) => event.state === 'broken')
  return disruptedRoute.map((event, index) => {
    if (index === recoveryIndex) return {
      ...event,
      title: recoveryState === 'speed' ? 'Direct Cab Reroute' : 'Next Available Bus Shuttle',
      category: recoveryState === 'speed' ? 'Private transit' : 'Bus shuttle',
      location: recoveryState === 'speed' ? 'Airport arrivals pickup' : 'Airport ground transit bay',
      state: 'recovered',
      recoveryLabel: recoveryState === 'speed' ? 'Auto-booked' : 'Rescheduled',
    }
    if (index > recoveryIndex) return { ...event, state: 'healthy' }
    return event
  })
}

export default function TripTimeline() {
  const { itinerary, disruption, recoveryState, setSelectedEventId, setView } = useTrip()
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 70%'] })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 25 })
  const route = useMemo(() => calculateRoute(itinerary, disruption, recoveryState), [itinerary, disruption, recoveryState])
  const openDetail = (id) => { setSelectedEventId(id); setView('detail') }

  return <section className="timeline-wrap route-timeline" ref={timelineRef} aria-label="Interactive itinerary timeline">
    <div className="timeline-heading"><span>Connected route</span><span>{disruption ? 'Blast radius calculated' : `${route.length} stops in sequence`}</span></div>
    <svg className="timeline-svg" aria-hidden="true" preserveAspectRatio="none"><line className="timeline-rail" x1="1" y1="0" x2="1" y2="100%" /><motion.line className="timeline-progress" x1="1" y1="0" x2="1" y2="100%" style={{ pathLength: lineProgress }} /></svg>
    <div className="timeline-nodes"><AnimatePresence mode="popLayout">{route.map((event, index) => { const Icon = icons[event.category] || Plane; const end = event.calculatedEnd || event.endTime; return <motion.button layout className={`route-node ${event.state}`} key={`${event.id}-${event.state}-${event.recoveryLabel || ''}`} onClick={() => openDetail(event.id)} initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ type: 'spring', stiffness: 105, damping: 18, delay: index * .06 }}>
      <span className="route-dot" /><span className="node-icon"><Icon size={20} /></span><span className="route-copy"><span className="node-top"><small>{event.category}</small><b>{event.state === 'healthy' ? 'On schedule' : event.state === 'delayed' ? `Delayed +${disruption.delayMinutes}m` : event.state === 'recovered' ? event.recoveryLabel : 'Broken connection'}</b></span><strong>{event.title}</strong><span className="route-location"><MapPin size={12} /> {event.location}</span><span className="route-time">{formatted(event.startTime)} — {formatted(end)}</span>{event.state === 'broken' && <span className="blast-message"><CircleAlert size={13} /> Transit buffer violated upstream</span>}</span><ChevronRight className="node-arrow" size={18} /></motion.button> })}</AnimatePresence></div>
  </section>
}

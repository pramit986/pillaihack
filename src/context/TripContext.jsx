import { createContext, useContext, useMemo, useRef, useState } from 'react'
import { starterItinerary } from '../data/mockTripData'

const TripContext = createContext(null)

export function TripProvider({ children }) {
  const [itinerary, setItinerary] = useState(starterItinerary)
  const [view, setView] = useState('timeline')
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [disruption, setDisruption] = useState(null)
  const [showRecoveryModal, setShowRecoveryModal] = useState(false)
  const [recoveryState, setRecoveryState] = useState('none')
  const recoveryTimer = useRef(null)

  // Saves the builder's ordered event list and opens the connected timeline view.
  const finalizeItinerary = (events) => {
    setItinerary(events)
    setDisruption(null)
    setView('timeline')
  }

  // Creates the visible blast radius first, then waits 1.5 seconds before asking for a recovery priority.
  const simulateDisruption = (eventId, delayMinutes) => {
    window.clearTimeout(recoveryTimer.current)
    setRecoveryState('none')
    setShowRecoveryModal(false)
    setDisruption({ eventId, delayMinutes })
    recoveryTimer.current = window.setTimeout(() => setShowRecoveryModal(true), 1500)
  }

  // Persists the selected strategy so the timeline can replace the broken transfer without altering original data.
  const chooseRecovery = (priority) => {
    setRecoveryState(priority)
    setShowRecoveryModal(false)
  }

  const clearDisruption = () => {
    window.clearTimeout(recoveryTimer.current)
    setDisruption(null)
    setRecoveryState('none')
    setShowRecoveryModal(false)
  }

  const value = useMemo(() => ({
    itinerary, setItinerary, view, setView, selectedEventId, setSelectedEventId,
    disruption, simulateDisruption, clearDisruption, showRecoveryModal, setShowRecoveryModal,
    recoveryState, chooseRecovery, finalizeItinerary,
  }), [itinerary, view, selectedEventId, disruption, showRecoveryModal, recoveryState])

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

export function useTrip() {
  const context = useContext(TripContext)
  if (!context) throw new Error('useTrip must be used inside TripProvider')
  return context
}

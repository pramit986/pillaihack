// Centralized demo data: adjust locations, timings, prices and recovery routes here.
export const initialItinerary = [
  {
    id: 'flight', type: 'Flight', code: 'AI-102', title: 'Delhi → Jaipur',
    time: 'Arrival 14:30', location: 'Jaipur International Airport', status: 'OK',
    detail: 'Seat 12A · Terminal 3', icon: 'plane',
  },
  {
    id: 'train', type: 'Rail transfer', code: 'Airport Express', title: 'Airport → Civil Lines',
    time: 'Departs 15:45', location: 'Airport Metro Station', status: 'OK',
    detail: '60 min connection buffer', icon: 'train',
  },
  {
    id: 'hotel', type: 'Stay', code: 'Boutique Heritage Hotel', title: 'Haveli Dharampura',
    time: 'Check-in before 19:00', location: 'Old City, Jaipur', status: 'OK',
    detail: 'Reservation confirmed · 2 nights', icon: 'hotel',
  },
  {
    id: 'show', type: 'Experience', code: 'Evening Cultural Show', title: 'Amber Palace performance',
    time: 'Starts 20:00', location: 'Amber Fort', status: 'OK',
    detail: 'Non-refundable · 2 guests', icon: 'ticket',
  },
]

export const disruptionStates = {
  45: [
    { id: 'flight', status: 'DELAYED', time: 'Arrival 15:15', delay: '+45m' },
    { id: 'train', status: 'AT RISK', detail: 'Only 30 min buffer remaining' },
    { id: 'hotel', status: 'OK' }, { id: 'show', status: 'OK' },
  ],
  120: [
    { id: 'flight', status: 'DELAYED', time: 'Arrival 16:30', delay: '+120m' },
    { id: 'train', status: 'FAILED', detail: 'Missed connection · buffer violated' },
    { id: 'hotel', status: 'AT RISK', detail: 'Late check-in likely' },
    { id: 'show', status: 'AT RISK', detail: 'Arrival window endangered' },
  ],
}

export const recoveryPaths = {
  speed: {
    summary: 'Additional Cost: $35  |  Time Saved: 2.5 hrs',
    toast: 'Webhook fired: Sent flight delay certificate to Hotel Manager.',
    updates: [
      { id: 'flight', status: 'DELAYED', time: 'Arrival 16:30', delay: '+120m' },
      { id: 'train', type: 'On-demand transit', code: 'Direct Cab Express', title: 'Airport → Old City', time: 'Leaves 16:50 · Arrives 18:15', location: 'Airport arrivals pickup', status: 'RESCHEDULED', detail: 'Fastest route secured', icon: 'cab' },
      { id: 'hotel', status: 'RESCHEDULED', detail: 'Check-in window protected' },
      { id: 'show', status: 'RESCHEDULED', detail: 'Original 20:00 reservation saved' },
    ],
  },
  cost: {
    summary: 'Additional Cost: $0  |  Full refund claimed for missed train',
    toast: 'Auto-filed airline passenger compensation claim.',
    updates: [
      { id: 'flight', status: 'DELAYED', time: 'Arrival 16:30', delay: '+120m' },
      { id: 'train', type: 'Rail transfer', code: 'Rail voucher rebooked', title: 'Airport → Civil Lines', time: 'Leaves 17:30', location: 'Airport Metro Station', status: 'RESCHEDULED', detail: 'No-cost replacement ticket', icon: 'train' },
      { id: 'hotel', status: 'RESCHEDULED', detail: 'Late arrival note sent to host' },
      { id: 'show', status: 'RESCHEDULED', time: 'Tomorrow · 10:00 AM', detail: 'Auto-rescheduled at no charge' },
    ],
  },
}

// Starter content for Create Mode. These values can be edited independently of UI code.
export const starterItinerary = [
  { id: 'event-flight', category: 'Flight', title: 'AI-102 · Delhi to Jaipur', location: 'Indira Gandhi International Airport', startTime: '2026-09-09T12:05', endTime: '2026-09-09T14:30', buffer: 60 },
  { id: 'event-train', category: 'Train', title: 'Airport Express Train', location: 'Jaipur Airport Metro', startTime: '2026-09-09T15:45', endTime: '2026-09-09T16:25', buffer: 30 },
  { id: 'event-hotel', category: 'Hotel', title: 'Boutique Heritage Hotel', location: 'Old City, Jaipur', startTime: '2026-09-09T17:15', endTime: '2026-09-09T19:00', buffer: 45 },
  { id: 'event-activity', category: 'Activity', title: 'Evening Cultural Show', location: 'Amber Fort', startTime: '2026-09-09T20:00', endTime: '2026-09-09T22:00', buffer: 0 },
]

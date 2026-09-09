import { BedDouble, CircleDot, Plane, Ticket, TrainFront, CarFront } from 'lucide-react'
import { motion } from 'framer-motion'

const icons = { plane: Plane, train: TrainFront, hotel: BedDouble, ticket: Ticket, cab: CarFront }
const statusLabels = { OK: 'On track', 'AT RISK': 'At risk', FAILED: 'Missed connection', DELAYED: 'Delayed', RESCHEDULED: 'Updated' }

export default function TimelineNode({ node, index }) {
  const Icon = icons[node.icon] || CircleDot
  return <motion.article
    layout
    initial={{ opacity: 0, x: 42, y: 12 }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className={`timeline-card status-${node.status.toLowerCase().replace(' ', '-')}`}
  >
    <div className="node-icon"><Icon size={22} strokeWidth={1.7} /></div>
    <div className="card-content">
      <div className="card-topline"><span>{node.type}</span><span className="status-badge">{statusLabels[node.status] || node.status}{node.delay && ` · ${node.delay}`}</span></div>
      <h2>{node.code}</h2>
      <p className="node-title">{node.title}</p>
      <div className="card-meta"><strong>{node.time}</strong><span>{node.location}</span></div>
      <p className="card-detail">{node.detail}</p>
    </div>
  </motion.article>
}

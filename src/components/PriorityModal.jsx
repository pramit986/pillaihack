import { motion } from 'framer-motion'
import { Banknote, Zap } from 'lucide-react'

export default function PriorityModal({ onChoose }) {
  return <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.section className="priority-modal" role="dialog" aria-modal="true" aria-labelledby="interrupted-title" initial={{ opacity: 0, y: 25, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15 }}>
      <div className="alert-orb">!</div>
      <p className="eyebrow">INTERCEPTOR REQUIRED</p>
      <h2 id="interrupted-title">Journey Interrupted:<br />Downstream Blast Radius Detected</h2>
      <p className="modal-copy">Your delayed flight causes you to miss the 15:45 Express Train and endangers your 20:00 show. How do you want ChronoRoute to resolve this?</p>
      <div className="priority-options">
        <button className="priority-button speed" onClick={() => onChoose('speed')}><span className="option-icon"><Zap size={25} fill="currentColor" /></span><b>Optimize for Speed</b><small>Keep original reservations intact by booking faster on-demand transit.</small><i>Recommended arrival: 18:15</i></button>
        <button className="priority-button cost" onClick={() => onChoose('cost')}><span className="option-icon"><Banknote size={25} /></span><b>Optimize for Cost</b><small>Zero out-of-pocket expenses. Claim delay compensation and reschedule.</small><i>Additional cost: $0</i></button>
      </div>
    </motion.section>
  </motion.div>
}

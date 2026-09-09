import { ArrowLeft, Banknote, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTrip } from '../context/TripContext'

export default function RecoveryModal() {
  const { chooseRecovery, setShowRecoveryModal } = useTrip()
  return <motion.div className="recovery-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.section className="recovery-modal" role="dialog" aria-modal="true" aria-labelledby="recovery-title" initial={{ y: 22, opacity: 0, scale: .98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 18, opacity: 0 }} transition={{ type: 'spring', stiffness: 280, damping: 23 }}>
      <button className="modal-back" onClick={() => setShowRecoveryModal(false)}><ArrowLeft size={15} /> Back to route</button>
      <p className="eyebrow">RECOVERY INTERCEPTOR</p>
      <h2 id="recovery-title">⚠️ Journey Interrupted:<br />Action Required</h2>
      <p>Your delayed flight causes you to miss the 15:45 Express Train. How do you want ChronoRoute to resolve this?</p>
      <div className="recovery-options">
        <button className="recovery-option speed" onClick={() => chooseRecovery('speed')}><Zap size={22} fill="currentColor" /><span><b>Optimize for Speed</b><small>Rebook private transit to save hotel &amp; event schedule.</small></span><em>+₹1,200</em></button>
        <button className="recovery-option cost" onClick={() => chooseRecovery('cost')}><Banknote size={22} /><span><b>Optimize for Cost</b><small>Claim free rail voucher and delay event.</small></span><em>+₹0</em></button>
      </div>
    </motion.section>
  </motion.div>
}

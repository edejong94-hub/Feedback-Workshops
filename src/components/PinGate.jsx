import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './PinGate.module.css'

const UNLOCK_KEY = 'qrAdminUnlocked'
const EXPECTED_PIN = import.meta.env.VITE_QR_ADMIN_PIN || 'founded2026'

const PinGate = ({ children }) => {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(UNLOCK_KEY) === '1'
  )
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pin === EXPECTED_PIN) {
      sessionStorage.setItem(UNLOCK_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setPin('')
    }
  }

  if (unlocked) return children

  return (
    <div className={styles.container}>
      <motion.form
        className={styles.card}
        onSubmit={handleSubmit}
        animate={error ? { x: [0, -8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        onAnimationComplete={() => setError(false)}
      >
        <span className={styles.logo}>Founded</span>
        <h1 className={styles.title}>Admin Access</h1>
        <p className={styles.subtitle}>Enter the PIN to open the QR generator</p>
        <input
          type="password"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value)
            setError(false)
          }}
          placeholder="PIN"
          className={styles.input}
          autoFocus
        />
        {error && <p className={styles.error}>Incorrect PIN, try again.</p>}
        <button type="submit" className={styles.submitButton}>
          Unlock
        </button>
      </motion.form>
    </div>
  )
}

export default PinGate

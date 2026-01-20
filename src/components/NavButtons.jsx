import React from 'react'
import { motion } from 'framer-motion'
import styles from './NavButtons.module.css'

const NavButtons = ({ onBack, onNext, showBack = true, nextLabel = "Next", nextDisabled = false }) => {
  return (
    <div className={styles.container}>
      {showBack && (
        <button className={styles.backButton} onClick={onBack}>
          ← Back
        </button>
      )}
      
      <motion.button
        className={styles.nextButton}
        onClick={onNext}
        disabled={nextDisabled}
        whileHover={!nextDisabled ? { scale: 1.02 } : {}}
        whileTap={!nextDisabled ? { scale: 0.98 } : {}}
      >
        {nextLabel}
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.button>
    </div>
  )
}

export default NavButtons

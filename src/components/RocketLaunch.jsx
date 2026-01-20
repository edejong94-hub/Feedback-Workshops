import React from 'react'
import { motion } from 'framer-motion'
import styles from './RocketLaunch.module.css'
import ProgressBar from './ProgressBar'

const RocketLaunch = ({ value, onChange, onSubmit, onBack, isSubmitting, error, currentStep, totalSteps }) => {
  return (
    <div className={styles.container}>
      <ProgressBar current={currentStep} total={totalSteps} />
      
      <motion.h2 
        className={styles.question}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Would you recommend this workshop to a fellow founder?
      </motion.h2>
      
      <div className={styles.choices}>
        <motion.button
          className={`${styles.choiceButton} ${value === true ? styles.selected : ''}`}
          onClick={() => onChange(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.choiceEmoji}>🚀</span>
          <span className={styles.choiceText}>Absolutely!</span>
          <span className={styles.choiceSubtext}>Launch it to everyone</span>
        </motion.button>
        
        <motion.button
          className={`${styles.choiceButton} ${value === false ? styles.selected : ''}`}
          onClick={() => onChange(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.choiceEmoji}>🤔</span>
          <span className={styles.choiceText}>Not quite</span>
          <span className={styles.choiceSubtext}>Needs some work</span>
        </motion.button>
      </div>
      
      {error && (
        <motion.p 
          className={styles.error}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
      
      <div className={styles.navButtons}>
        <button className={styles.backButton} onClick={onBack}>
          ← Back
        </button>
        
        <motion.button
          className={styles.submitButton}
          onClick={onSubmit}
          disabled={value === null || isSubmitting}
          whileHover={value !== null && !isSubmitting ? { scale: 1.02 } : {}}
          whileTap={value !== null && !isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <span className={styles.loadingText}>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ display: 'inline-block' }}
              >
                🚀
              </motion.span>
              {' '}Launching...
            </span>
          ) : (
            <>
              Launch Feedback
              <span className={styles.rocketIcon}>🚀</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}

export default RocketLaunch

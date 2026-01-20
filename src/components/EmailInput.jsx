import React from 'react'
import { motion } from 'framer-motion'
import styles from './EmailInput.module.css'
import ProgressBar from './ProgressBar'
import NavButtons from './NavButtons'

const EmailInput = ({ value, onChange, onNext, onBack, currentStep, totalSteps }) => {
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className={styles.container}>
      <ProgressBar current={currentStep} total={totalSteps} />

      <motion.div
        className={styles.icon}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        📧
      </motion.div>

      <motion.h2
        className={styles.question}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        What's your email?
      </motion.h2>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        So we can follow up with you
      </motion.p>

      <div className={styles.inputContainer}>
        <input
          type="email"
          value={value}
          onChange={handleChange}
          className={styles.input}
          placeholder="you@example.com"
          autoFocus
        />
        {value && !isValidEmail(value) && (
          <motion.span
            className={styles.hint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Please enter a valid email
          </motion.span>
        )}
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        showBack={true}
        nextLabel="Continue"
        nextDisabled={!isValidEmail(value)}
      />
    </div>
  )
}

export default EmailInput

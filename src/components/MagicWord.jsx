import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './MagicWord.module.css'
import ProgressBar from './ProgressBar'
import NavButtons from './NavButtons'

const placeholders = [
  "Inspiring...",
  "Game-changing...",
  "Eye-opening...",
  "Energizing...",
  "Mind-blowing..."
]

const MagicWord = ({ value, onChange, onNext, onBack, currentStep, totalSteps }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [charCount, setCharCount] = useState(value.length)
  const maxChars = 50

  useEffect(() => {
    if (!value) {
      const interval = setInterval(() => {
        setPlaceholderIndex(prev => (prev + 1) % placeholders.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [value])

  const handleChange = (e) => {
    const newValue = e.target.value.slice(0, maxChars)
    onChange(newValue)
    setCharCount(newValue.length)
  }

  return (
    <div className={styles.container}>
      <ProgressBar current={currentStep} total={totalSteps} />
      
      <motion.div 
        className={styles.sparkle}
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✨
      </motion.div>
      
      <motion.h2 
        className={styles.question}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        In one word or phrase, how would you describe this workshop?
      </motion.h2>
      
      <div className={styles.inputContainer}>
        <AnimatePresence mode="wait">
          {!value && (
            <motion.span 
              key={placeholderIndex}
              className={styles.animatedPlaceholder}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.4, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {placeholders[placeholderIndex]}
            </motion.span>
          )}
        </AnimatePresence>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className={styles.input}
          autoFocus
        />
        <span className={styles.charCount}>{charCount}/{maxChars}</span>
      </div>
      
      <NavButtons 
        onBack={onBack} 
        onNext={onNext} 
        showBack={true}
        nextLabel="Almost done!"
        nextDisabled={!value.trim()}
      />
    </div>
  )
}

export default MagicWord

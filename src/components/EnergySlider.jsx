import React from 'react'
import { motion } from 'framer-motion'
import styles from './EnergySlider.module.css'
import ProgressBar from './ProgressBar'
import NavButtons from './NavButtons'

const emojis = [
  { emoji: '😴', label: 'Sleepy' },
  { emoji: '😐', label: 'Meh' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😊', label: 'Great' },
  { emoji: '🤩', label: 'Mind-blown!' }
]

const getEmojiIndex = (value) => {
  if (value < 20) return 0
  if (value < 40) return 1
  if (value < 60) return 2
  if (value < 80) return 3
  return 4
}

const EnergySlider = ({ value, onChange, onNext, onBack, currentStep, totalSteps }) => {
  const emojiIndex = getEmojiIndex(value)
  const currentEmoji = emojis[emojiIndex]

  return (
    <div className={styles.container}>
      <ProgressBar current={currentStep} total={totalSteps} />
      
      <motion.h2 
        className={styles.question}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        How energized do you feel after this workshop?
      </motion.h2>
      
      <motion.div 
        className={styles.emojiContainer}
        key={emojiIndex}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <span className={styles.emoji}>{currentEmoji.emoji}</span>
        <span className={styles.emojiLabel}>{currentEmoji.label}</span>
      </motion.div>
      
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={styles.slider}
          style={{
            background: `linear-gradient(to right, var(--founded-lime) 0%, var(--founded-lime) ${value}%, var(--founded-gray-light) ${value}%, var(--founded-gray-light) 100%)`
          }}
        />
        <div className={styles.sliderLabels}>
          <span>💤</span>
          <span>🔥</span>
        </div>
      </div>
      
      <NavButtons 
        onBack={onBack} 
        onNext={onNext} 
        showBack={true}
        nextLabel="Next"
      />
    </div>
  )
}

export default EnergySlider

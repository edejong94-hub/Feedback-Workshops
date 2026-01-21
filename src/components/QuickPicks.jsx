import React from 'react'
import { motion } from 'framer-motion'
import styles from './QuickPicks.module.css'
import ProgressBar from './ProgressBar'
import NavButtons from './NavButtons'

const options = [
  { id: 'content', emoji: '📚', label: 'Great content' },
  { id: 'speaker', emoji: '🎤', label: 'Amazing speaker' },
  { id: 'interactive', emoji: '🤝', label: 'Interactive & hands-on' },
  { id: 'practical', emoji: '🛠️', label: 'Practical tips' },
  { id: 'networking', emoji: '🌐', label: 'Networking opportunities' },
  { id: 'inspiration', emoji: '💡', label: 'Got inspired' },
  { id: 'newskills', emoji: '🚀', label: 'Learned new skills' },
  { id: 'fun', emoji: '🎉', label: 'It was fun!' }
]

const QuickPicks = ({ selected, onChange, onNext, onBack, currentStep, totalSteps }) => {
  const toggleOption = (label) => {
    if (selected.includes(label)) {
      onChange(selected.filter(item => item !== label))
    } else {
      onChange([...selected, label])
    }
  }

  return (
    <div className={styles.container}>
      <ProgressBar current={currentStep} total={totalSteps} />
      
      <motion.h2 
        className={styles.question}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        What were the highlights? 
        <span className={styles.hint}>(Pick as many as you like)</span>
      </motion.h2>
      
      <div className={styles.optionsGrid}>
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            className={`${styles.option} ${selected.includes(option.label) ? styles.selected : ''}`}
            onClick={() => toggleOption(option.label)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={styles.optionEmoji}>{option.emoji}</span>
            <span className={styles.optionLabel}>{option.label}</span>
            {selected.includes(option.label) && (
              <motion.span
                className={styles.checkmark}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
      
      <NavButtons 
        onBack={onBack} 
        onNext={onNext} 
        showBack={true}
        nextLabel="Next"
        nextDisabled={selected.length === 0}
      />
    </div>
  )
}

export default QuickPicks

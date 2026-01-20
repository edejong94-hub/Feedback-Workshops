import React from 'react'
import { motion } from 'framer-motion'
import styles from './ProgressBar.module.css'

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100

  return (
    <div className={styles.container}>
      <div className={styles.barBackground}>
        <motion.div 
          className={styles.barFill}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <span className={styles.label}>{current} of {total}</span>
    </div>
  )
}

export default ProgressBar

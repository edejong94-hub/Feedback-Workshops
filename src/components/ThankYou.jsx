import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import styles from './ThankYou.module.css'

const ThankYou = ({ feedback }) => {
  useEffect(() => {
    // Second round of confetti
    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#c8ff00', '#ffffff', '#a8d900']
      })
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.successIcon}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        🎉
      </motion.div>
      
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        You're a star!
      </motion.h1>
      
      <motion.p 
        className={styles.message}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Thanks for sharing your feedback. Your input helps us make our workshops even better for fellow founders!
      </motion.p>
      
      <motion.div 
        className={styles.summary}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className={styles.summaryTitle}>Your magic word:</p>
        <p className={styles.magicWord}>"{feedback.magicWord}"</p>
      </motion.div>
      
      <motion.div 
        className={styles.cta}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className={styles.ctaText}>Stay connected with Founded</p>
        <a 
          href="https://www.founded.in/en" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          Explore More Events →
        </a>
      </motion.div>
      
      <motion.div 
        className={styles.foundedLogo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className={styles.founded}>Founded</span>
        <span className={styles.tagline}>Fuelling ambitions</span>
      </motion.div>
    </div>
  )
}

export default ThankYou

import React from 'react'
import { motion } from 'framer-motion'
import styles from './RocketIntro.module.css'

const RocketIntro = ({ workshopName, onStart }) => {
  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.rocket}
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🚀
      </motion.div>
      
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Hey Founder!
      </motion.h1>
      
      <motion.p 
        className={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Thanks for joining <span className={styles.highlight}>{workshopName}</span>
      </motion.p>
      
      <motion.p 
        className={styles.description}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Help us fuel the next workshop with your quick feedback.<br/>
        <span className={styles.timeHint}>⚡ Takes less than 90 seconds</span>
      </motion.p>
      
      <motion.button
        className={styles.startButton}
        onClick={onStart}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Let's Go! 
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.button>
      
      <motion.div 
        className={styles.foundedLogo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className={styles.poweredBy}>powered by</span>
        <span className={styles.founded}>Founded</span>
      </motion.div>
    </div>
  )
}

export default RocketIntro

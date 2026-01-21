import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './LiveReactions.module.css'

const reactions = [
  { type: 'emoji', content: '🔥', label: 'On fire!' },
  { type: 'emoji', content: '🚀', label: 'Launching!' },
  { type: 'emoji', content: '💡', label: 'Inspired!' },
  { type: 'emoji', content: '🎯', label: 'Spot on!' },
  { type: 'emoji', content: '⚡', label: 'Energized!' },
  { type: 'emoji', content: '🙌', label: 'Love it!' },
  { type: 'emoji', content: '✨', label: 'Magic!' },
  { type: 'emoji', content: '💪', label: 'Powerful!' },
  { type: 'text', content: 'Amazing speaker!' },
  { type: 'text', content: 'Great content!' },
  { type: 'text', content: 'So practical!' },
  { type: 'text', content: 'Mind-blowing!' },
  { type: 'text', content: 'Game-changer!' },
  { type: 'text', content: 'Loved it!' },
  { type: 'energy', content: '87%', emoji: '⚡' },
  { type: 'energy', content: '92%', emoji: '🔥' },
  { type: 'energy', content: '78%', emoji: '💪' },
  { type: 'energy', content: '95%', emoji: '🚀' },
]

const names = ['Sarah', 'Mike', 'Emma', 'Alex', 'Lisa', 'Tom', 'Nina', 'Jack', 'Mia', 'Ben']

const LiveReactions = () => {
  const [bubbles, setBubbles] = useState([])

  const addBubble = useCallback(() => {
    const reaction = reactions[Math.floor(Math.random() * reactions.length)]
    const name = names[Math.floor(Math.random() * names.length)]
    const side = Math.random() > 0.5 ? 'left' : 'right'

    const newBubble = {
      id: Date.now() + Math.random(),
      ...reaction,
      name,
      side,
      x: side === 'left' ? Math.random() * 80 + 10 : Math.random() * 80 + 10,
    }

    setBubbles(prev => [...prev.slice(-8), newBubble])

    // Remove bubble after animation
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id))
    }, 4000)
  }, [])

  useEffect(() => {
    // Initial delay before first reaction
    const initialDelay = setTimeout(() => {
      addBubble()
    }, 2000)

    // Random interval for new reactions
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to show reaction
        addBubble()
      }
    }, 2500 + Math.random() * 2000)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [addBubble])

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className={`${styles.bubble} ${styles[bubble.side]} ${styles[bubble.type]}`}
            style={{
              [bubble.side]: `${bubble.x}px`,
            }}
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.5,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [100, 0, -50, -150],
              scale: [0.5, 1, 1, 0.8],
            }}
            transition={{
              duration: 4,
              ease: "easeOut",
              times: [0, 0.2, 0.7, 1]
            }}
          >
            {bubble.type === 'emoji' && (
              <>
                <span className={styles.emoji}>{bubble.content}</span>
                <span className={styles.label}>{bubble.label}</span>
              </>
            )}
            {bubble.type === 'text' && (
              <>
                <span className={styles.name}>{bubble.name}</span>
                <span className={styles.text}>"{bubble.content}"</span>
              </>
            )}
            {bubble.type === 'energy' && (
              <>
                <span className={styles.energyEmoji}>{bubble.emoji}</span>
                <span className={styles.energyValue}>{bubble.content}</span>
                <span className={styles.energyLabel}>energy</span>
              </>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default LiveReactions

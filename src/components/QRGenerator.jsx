import React, { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import styles from './QRGenerator.module.css'

const WORKSHOP_PRESETS = [
  { id: 's101', name: 'Startup 101', emoji: '🌱' },
  { id: 'sf', name: 'Startup Framework', emoji: '🏗️' },
  { id: 'p102', name: 'Pitching 102', emoji: '🎤' },
  { id: 'fund', name: 'Startup Funding', emoji: '💰' },
  { id: 'sbig', name: 'Small BIG', emoji: '⚡' },
  { id: 'custom', name: 'Custom Workshop', emoji: '✏️' },
]

const QRGenerator = () => {
  const [selectedPreset, setSelectedPreset] = useState(null)
  const [customName, setCustomName] = useState('')
  const [baseUrl, setBaseUrl] = useState(
    window.location.origin || 'https://your-feedback-site.netlify.app'
  )
  const qrRef = useRef(null)

  const getWorkshopName = () => {
    if (!selectedPreset) return ''
    if (selectedPreset.id === 'custom') return customName
    return selectedPreset.name
  }

  const getFeedbackUrl = () => {
    const workshopName = getWorkshopName()
    if (!workshopName) return ''
    return `${baseUrl}/?workshop=${encodeURIComponent(workshopName)}`
  }

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = 1000
      canvas.height = 1120

      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(100, 100, 800, 800)

      ctx.drawImage(img, 120, 120, 760, 760)

      ctx.fillStyle = '#c8ff00'
      ctx.font = 'bold 48px Space Grotesk, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(getWorkshopName(), 500, 1000)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 28px Space Grotesk, sans-serif'
      ctx.fillText('Scan to share your feedback • Founded', 500, 1080)

      const link = document.createElement('a')
      link.download = `qr-${getWorkshopName().toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(getFeedbackUrl())
  }

  const feedbackUrl = getFeedbackUrl()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.logo}>Founded</span>
        <h1 className={styles.title}>QR Code Generator</h1>
        <p className={styles.subtitle}>Generate feedback QR codes for your workshops</p>
      </div>

      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles.section}>
            <label className={styles.label}>Select Workshop</label>
            <div className={styles.presetGrid}>
              {WORKSHOP_PRESETS.map((preset) => (
                <motion.button
                  key={preset.id}
                  className={`${styles.presetButton} ${selectedPreset?.id === preset.id ? styles.selected : ''}`}
                  onClick={() => setSelectedPreset(preset)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={styles.presetEmoji}>{preset.emoji}</span>
                  <span className={styles.presetName}>{preset.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {selectedPreset?.id === 'custom' && (
            <div className={styles.section}>
              <label className={styles.label}>Workshop Name</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter workshop name..."
                className={styles.input}
              />
            </div>
          )}

          <div className={styles.section}>
            <label className={styles.label}>Base URL</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://your-site.netlify.app"
              className={styles.input}
            />
            <p className={styles.hint}>Update this to your live Netlify URL</p>
          </div>
        </div>

        <div className={styles.preview}>
          {feedbackUrl ? (
            <>
              <div className={styles.qrContainer} ref={qrRef}>
                <QRCodeSVG
                  value={feedbackUrl}
                  size={280}
                  level="H"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#0a0a0a"
                />
              </div>

              <div className={styles.workshopInfo}>
                <span className={styles.workshopEmoji}>{selectedPreset?.emoji}</span>
                <span className={styles.workshopName}>{getWorkshopName()}</span>
                <span className={styles.workshopDate}>Date auto-fills on scan</span>
              </div>

              <div className={styles.urlBox}>
                <code className={styles.url}>{feedbackUrl}</code>
                <button onClick={copyUrl} className={styles.copyButton}>
                  📋 Copy
                </button>
              </div>

              <motion.button
                className={styles.downloadButton}
                onClick={downloadQR}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ⬇️ Download QR Code (PNG)
              </motion.button>

              <p className={styles.instructions}>
                Add this QR code to the <strong>last slide</strong> of your workshop deck!
              </p>
            </>
          ) : (
            <div className={styles.placeholder}>
              <span className={styles.placeholderIcon}>📱</span>
              <p>Select a workshop to generate QR code</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <a href="/" className={styles.footerLink}>← Back to feedback form</a>
      </div>
    </div>
  )
}

export default QRGenerator

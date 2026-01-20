import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import RocketIntro from './components/RocketIntro'
import EmailInput from './components/EmailInput'
import EnergySlider from './components/EnergySlider'
import QuickPicks from './components/QuickPicks'
import MagicWord from './components/MagicWord'
import RocketLaunch from './components/RocketLaunch'
import ThankYou from './components/ThankYou'

// Get URL parameters for HubSpot integration
const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search)
  return {
    email: params.get('email') || '',
    contactId: params.get('contactId') || '',
    workshopName: params.get('workshop') || 'Workshop',
    workshopDate: params.get('date') || new Date().toISOString().split('T')[0]
  }
}

function App() {
  const [step, setStep] = useState(0)
  const [urlParams] = useState(getUrlParams)
  const [feedback, setFeedback] = useState({
    email: urlParams.email || '',
    energyLevel: 50,
    highlights: [],
    magicWord: '',
    wouldRecommend: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const totalSteps = 6

  const updateFeedback = (key, value) => {
    setFeedback(prev => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Submit to HubSpot
  const submitToHubSpot = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    const payload = {
      ...feedback,
      ...urlParams,
      submittedAt: new Date().toISOString()
    }

    try {
      // Option 1: If you have a backend endpoint
      // const response = await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // })
      
      // Option 2: Using HubSpot Forms API (requires form ID)
      // You'll need to set up a HubSpot form and use their forms API
      // const hubspotFormId = 'YOUR_FORM_ID'
      // const hubspotPortalId = 'YOUR_PORTAL_ID'
      // const response = await fetch(
      //   `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`,
      //   {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       fields: [
      //         { name: 'email', value: urlParams.email },
      //         { name: 'workshop_energy_level', value: feedback.energyLevel },
      //         { name: 'workshop_highlights', value: feedback.highlights.join(', ') },
      //         { name: 'workshop_magic_word', value: feedback.magicWord },
      //         { name: 'workshop_recommend', value: feedback.wouldRecommend ? 'Yes' : 'No' },
      //         { name: 'workshop_name', value: urlParams.workshopName },
      //         { name: 'workshop_date', value: urlParams.workshopDate }
      //       ]
      //     })
      //   }
      // )

      // For demo: log to console and simulate success
      console.log('📊 Feedback submitted:', payload)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Trigger confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c8ff00', '#ffffff', '#a8d900']
      })
      
      nextStep()
    } catch (error) {
      console.error('Failed to submit feedback:', error)
      setSubmitError('Oops! Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <RocketIntro
            workshopName={urlParams.workshopName}
            onStart={nextStep}
          />
        )
      case 1:
        return (
          <EmailInput
            value={feedback.email}
            onChange={(val) => updateFeedback('email', val)}
            onNext={nextStep}
            onBack={prevStep}
            currentStep={step}
            totalSteps={totalSteps - 1}
          />
        )
      case 2:
        return (
          <EnergySlider
            value={feedback.energyLevel}
            onChange={(val) => updateFeedback('energyLevel', val)}
            onNext={nextStep}
            onBack={prevStep}
            currentStep={step}
            totalSteps={totalSteps - 1}
          />
        )
      case 3:
        return (
          <QuickPicks
            selected={feedback.highlights}
            onChange={(val) => updateFeedback('highlights', val)}
            onNext={nextStep}
            onBack={prevStep}
            currentStep={step}
            totalSteps={totalSteps - 1}
          />
        )
      case 4:
        return (
          <MagicWord
            value={feedback.magicWord}
            onChange={(val) => updateFeedback('magicWord', val)}
            onNext={nextStep}
            onBack={prevStep}
            currentStep={step}
            totalSteps={totalSteps - 1}
          />
        )
      case 5:
        return (
          <RocketLaunch
            value={feedback.wouldRecommend}
            onChange={(val) => updateFeedback('wouldRecommend', val)}
            onSubmit={submitToHubSpot}
            onBack={prevStep}
            isSubmitting={isSubmitting}
            error={submitError}
            currentStep={step}
            totalSteps={totalSteps - 1}
          />
        )
      case 6:
        return <ThankYou feedback={feedback} />
      default:
        return null
    }
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App

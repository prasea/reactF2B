import React, { useState } from 'react'
import Header from './Header'

import FeedbackList from './FeedbackList'
import FeedbackData from '../data/FeedbackData'
import FeedbackStats from './FeedbackStats'
import FeedbackForm from './FeedbackForm'
import { FeedbackProvider } from '../context/FeedbackContext'
function App() {
  
  return (
    <>
      <Header />
      <div className="container">
        <FeedbackProvider>
          <FeedbackForm/>
          <FeedbackStats />
          <FeedbackList/>
        </FeedbackProvider>
      </div>
    </>
  )
}

export default App
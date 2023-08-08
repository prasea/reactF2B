import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import FeedbackContext from '../context/FeedbackContext';
function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext);
  let totalRating = 0;
  feedback.forEach(item => {
    totalRating = totalRating + parseInt(item.rating)    
  })
  let averageRating = (totalRating/feedback.length);
  averageRating = averageRating.toFixed(1).replace(/[.,]0$/, '')
  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating {isNaN(averageRating) ? 0 : averageRating}</h4>
    </div>
  )
}

export default FeedbackStats
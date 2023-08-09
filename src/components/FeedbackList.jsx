import React from 'react'
import FeedbackItem from './FeedbackItem'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'
function FeedbackList() {
  const {feedback} = useContext(FeedbackContext);
  return (
    <div className="feedback-list">
      {feedback.map(item => (
        <FeedbackItem key={item.id} item={item} />
      ))}
    </div>
  )
} 
FeedbackList.propTypes = {
  feedback : PropTypes.array
}
export default FeedbackList
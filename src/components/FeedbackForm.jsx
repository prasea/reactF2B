import React, { useContext, useEffect } from 'react'
import Card from './shared/Card'
import { useState } from 'react';
import Button from './Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';
function FeedbackForm() {
  const {feedbackAdd, feedbackToEdit, feedbackUpdate} = useContext(FeedbackContext);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState('')
  const handleTextChange = (e) => {
    setText(e.target.value)
    if(text == ''){
      setBtnDisabled(true);
      setValidationMessage(null);
    } else if(text !== null && text.length < 10){
      setBtnDisabled(true);
      setValidationMessage("Review text too short. Must longer than 10 chars");      
    } else{
      setBtnDisabled(false);
      setValidationMessage(null)
    }
  }
 

  //Populating form with feedback to edit 
  useEffect(()=> {
    if(feedbackToEdit.edit === true){
      setText(feedbackToEdit.item.text);
      setRating(feedbackToEdit.item.rating);
      setBtnDisabled(false)
    }
  }, [feedbackToEdit])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.trim().length > 10){
      const newFeedback = {
        text, 
        rating 
      }
      if(feedbackToEdit.edit === true){
        feedbackUpdate(feedbackToEdit.item.id, newFeedback);
      } else {
        feedbackAdd(newFeedback);
      }
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Rate your service with us</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className="input-group">
          <input onChange={handleTextChange} type="text" placeholder='Write a review' value={text} />
          <Button isDisabled={btnDisabled}>Send</Button>
        </div>
        {validationMessage && <div className='message'>{validationMessage}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
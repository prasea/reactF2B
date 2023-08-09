import React, { useContext } from 'react'
import { useState } from 'react'
import Card from './shared/Card';
import {FaTimes, FaEdit} from 'react-icons/fa';
import FeedbackContext from '../context/FeedbackContext';
function FeedbackItem({item, handleDelete}) {
  const [reviewText, setText] = useState('This is inital state of text');
  const [reviewRating, setRating] = useState(9);
  const {handleEdit, feedbackDelete} = useContext(FeedbackContext);
  return (
    <Card reverse={true}>
      <div className="text-display">{item.text}</div>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => feedbackDelete(item.id)}>
        <FaTimes color="purple" />
      </button>
      <button className="edit" onClick={() => handleEdit(item)}>
        <FaEdit color='purple'></FaEdit>
      </button>
    </Card>
  )
}

export default FeedbackItem
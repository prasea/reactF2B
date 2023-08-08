import { createContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
const FeedbackContext = createContext();
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const fetchFeedback = async () => {
    let response = await fetch("http://localhost:5500/feedback");
    let data = await response.json();
    setFeedback(data)
  }
  useEffect(() => {
    fetchFeedback()
  }, [])
  const [feedbackToEdit, setFeedbackToEdit] = useState({
    item: {},
    edit: false
  })
  const handleEdit = (item) => {
    setFeedbackToEdit({
      item,
      edit: true
    })
  }
  const feedbackUpdate = (oldId, newFeedback) => {
    setFeedback(feedback.map(item => (
      item.id === oldId ? { ...item, ...newFeedback } : item
    )))
  }
  const feedbackDelete = (id) => {
    if (window.confirm("Are you sure you want to delete"))
      setFeedback(feedback.filter(item => (
        item.id != id
      )))
  }
  const feedbackAdd = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback])
  }
  return <FeedbackContext.Provider value={{
    feedback,
    feedbackDelete,
    feedbackAdd,
    handleEdit,
    feedbackToEdit,
    feedbackUpdate
  }}>
    {children}
  </FeedbackContext.Provider>
}
export default FeedbackContext;
import { createContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
const FeedbackContext = createContext();
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  //Fetching the feedback from server using useEffect
  const fetchFeedback = async () => {
    let response = await fetch("/feedback?_sort=id&_order=desc");
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
  const feedbackUpdate = async (oldId, newFeedback) => {
    const response = await fetch(`/feedback/${oldId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedback)
    })
    const data = await response.json();
    setFeedback(feedback.map(item => (
      item.id === oldId ? { ...item, ...data } : item
    )))
  }
  const feedbackDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })
      setFeedback(feedback.filter(item => (item.id != id)))
    }
  }
  const feedbackAdd = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })
    const data = await response.json();
    console.log(data);
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
import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const { name, email } = formData;
  const onLogout = () => {
    auth.signOut();
    navigate('/')
  }
  const handleSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update the displayName in Authentication
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // Update the users document in Firestore
        const userRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name
        })
      }
    } catch (err) {
      toast.error('Could not update profile details')
    }

  }
  const handleInputChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="submit" className="logOut" onClick={onLogout}>Logout</button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">
            Personal Details
          </p>
          <p className="changePersonalDetails" onClick={() => {
            { changeDetails && handleSubmit() }
            setChangeDetails(prevState => (!prevState))
          }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className="profileCard">
          <form action="">
            <input type="text" id="name" className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={handleInputChange} />
            <input type="email" id="email" className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} disabled={!changeDetails} value={email} onChange={handleInputChange} />
          </form>
        </div>

        <Link to={'/create-listing'} className='createListing'>
          <img src={homeIcon} alt="home" />
          <p>Sell or Rent your home</p>
          <img src={arrowRight} alt="" />
        </Link>
      </main>
    </div>
  )
}

export default Profile
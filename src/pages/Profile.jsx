import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom';
import { doc, updateDoc, collection, getDoc, query, where, orderBy, deleteDoc, getDocs } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from '../components/ListingItem';
function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  useEffect(() => {
    const fetchLoggedUserListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))

      const querySnap = await getDocs(q);

      const listings = [];

      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings)
      setLoading(false)
    }
    fetchLoggedUserListings();
  }, [auth.currentUser.uid])

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

  const onDelete = async listingId => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(listing => listing.id !== listingId)
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
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

        {!loading && listings?.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingsList">
              {listings.map(listing => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={() => onDelete(listing.id)} />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile
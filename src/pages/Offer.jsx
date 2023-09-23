import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs, query, where, orderBy, limit, startAfter, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

function Offer() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(2))
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const listings = []

        querySnap.forEach(doc => listings.push({
          id: doc.id,
          data: doc.data()
        }))

        setListings(listings)
        setLoading(false)
      } catch (err) {
        toast.error('Could not fetch listings')
      }
    }
    fetchListings();
  }, [])
  const fetchMoreListings = async () => {
    try {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10), startAfter(lastFetchedListing))
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = []

      querySnap.forEach(doc => listings.push({
        id: doc.id,
        data: doc.data()
      }))

      setListings(prevListings => [...prevListings, ...listings])
      setLoading(false)
    } catch (err) {
      toast.error('Could not fetch listings')
    }
  }
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {loading ?
        <Spinner /> :
        listings && listings.length > 0 ?
          <>
            <main>
              <ul className="categoryListings">
                {listings.map(listing => (
                  <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
                ))}
              </ul>
            </main>
            <br /><br />
            {lastFetchedListing && (
              <p className="loadMore" onClick={fetchMoreListings}>Load More</p>
            )}
          </> :
          <p>No Listings at Offer Price</p>}
    </div>
  )
}

export default Offer
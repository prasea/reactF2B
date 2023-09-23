import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        // console.log(docSnap.data())
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [navigate, params.listingId])

  console.log(listing);

  if (loading)
    return <Spinner />
  return (
    <main>
      {/* House Image Slider Goes Here  */}
      <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div className="swiperSlideDiv" style={{ background: `url(${imageUrl}) center no-repeat`, height: 400, backgroundSize: 'cover' }}></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="shareIconDiv" onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setShareLinkCopied(true)
        setTimeout(() => {
          setShareLinkCopied(false)
        }, 2000)
      }}>
        <img src={shareIcon} alt="" />
      </div>
      {shareLinkCopied && <p className='linkCopied'>Link Copied</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} -
          ${listing.offer ? listing.discountedPrice : listing.regularPrice}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>

        {/* How much dicount? */}
        {listing.offer && (
          <p className="discountPrice">
            ${listing.regularPrice - listing.discountedPrice} Discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bedroom`}
          </li>
          <li>
            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `${listing.bathrooms} Bathroom`}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

        <p className="listingLocationTitle">Location</p>
        <div className="leafletContainer">
          <MapContainer style={{ height: '100%', width: '100%' }} center={[listing.geoLocation.lat, listing.geoLocation.lng]} zoom={13} scrollWheelZoom={true} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[listing.geoLocation.lat, listing.geoLocation.lng]}>
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/*Display the Contact Details if the listing is not created by user  */}
        {auth.currentUser?.uid !== listing.userRef && (
          <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButtong'>Contact Owner</Link>
        )}
      </div>
    </main>
  )
}

export default Listing
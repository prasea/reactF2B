import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from "../firebase.config"
import Spinner from "./Spinner"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach(doc => listings.push({ id: doc.id, data: doc.data() }))

      setListings(listings)

      console.log(listings)
      setLoading(false)
    }
    fetchListings()
  }, [])
  if (loading)
    <Spinner />
  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} slidesPerView={1} pagination={{ clickable: true }} >
          {listings.map(({ id, data }) => (
            <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
              <div className="swiperSlideDiv" style={{ background: `url(${data.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover', height: 400 }}>
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${data.discountedPrice ?? data.regularPrice}
                  {data.type === 'rent' && ' / Month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider
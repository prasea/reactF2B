import { Link } from "react-router-dom"
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        {/* Slider Goes Here */}

        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to={'/category/rent'}>
            <img src={rentCategoryImage} className="exploreCategoryImg" alt="" />
            <p className="exploreCategoryName">Places for Rent</p>
          </Link>
          <Link to={'/category/sale'}>
            <img src={sellCategoryImage} className="exploreCategoryImg" alt="" />
            <p className="exploreCategoryName">Places for Sell</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore
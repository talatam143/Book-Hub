import {Link} from 'react-router-dom'

import './index.css'

function NotFound() {
  return (
    <div className="notFoundContainer">
      <img
        src="https://res.cloudinary.com/dh0pptyea/image/upload/v1658871159/not-found_gz04s7.png"
        alt="not found"
        className="notFoundImage"
      />
      <h1 className="NotFoundHeading">Page Not Found</h1>
      <p className="NotFoundPara">
        we are sorry, the page you requested could not be found,Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button className="NotFoundButton" type="button">
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound

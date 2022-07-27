import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

function Books(params) {
  const {details} = params
  return (
    <Link to={`/books/${details.id}`} className="eachBookLink">
      <li className="eachBookListContainer">
        <img
          src={details.coverPic}
          alt={details.title}
          className="eachBookImage"
        />
        <div>
          <p className="eachBookTitle">{details.title}</p>
          <p className="eachBookAuthor">{details.authorName}</p>
          <p className="eachBookRatingHeading">
            Avg Rating <BsFillStarFill className="eachBookRatingIcon" />
            {details.rating}
          </p>
          <p className="eachBookStatusHeading">
            Status :{' '}
            <span className="eachBookStatus">{details.readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default Books

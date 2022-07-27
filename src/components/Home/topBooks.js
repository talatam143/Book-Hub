import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import './topRated.css'

function TopRatedBooks(params) {
  const {booksList} = params

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <ul className="topRatedBooksListContainer">
      <Slider {...settings}>
        {booksList.map(eachBook => {
          const {id, authorName, coverPic, title} = eachBook
          return (
            <Link to={`/books/${id}`} className="topRatedBooksLink" key={id}>
              <li className="eachTopRatedBookItem">
                <img
                  className="eachTopRatedBookImage"
                  src={coverPic}
                  alt="coverPicture"
                />
                <p className="eachTopRatedBookTitle">{title}</p>
                <p className="eachTopRatedBookAuthor">{authorName}</p>
              </li>
            </Link>
          )
        })}
      </Slider>
    </ul>
  )
}

export default TopRatedBooks

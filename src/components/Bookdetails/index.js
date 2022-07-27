import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header/index'
import Footer from '../Footer/index'
import MobileMenu from '../MobileMenu/index'
import FetchError from '../FetchError/index'
import BookHubContext from '../../Context/bookHubContext'

class BookDetails extends Component {
  state = {bookDetails: {}, pageState: 'INITIAL'}

  componentDidMount = () => {
    this.getBook()
  }

  getBook = async () => {
    this.setState({pageState: 'LOADING'})
    const {match} = this.props
    const {params} = match
    const token = Cookies.get('jwt_token')
    const bookId = params.id
    const url = `https://apis.ccbp.in/book-hub/books/${bookId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.book_details)
    } else if (response.status === 400 || response.status === 401) {
      this.setState({pageState: 'FAILED'})
    }
  }

  onSuccess = data => {
    const finalData = {
      id: data.id,
      aboutAuthor: data.about_author,
      aboutBook: data.about_book,
      authorName: data.author_name,
      coverPic: data.cover_pic,
      rating: data.rating,
      readStatus: data.read_status,
      title: data.title,
    }
    this.setState({bookDetails: finalData, pageState: 'SUCCESS'})
  }

  RenderPage = () => {
    const {pageState, bookDetails} = this.state
    switch (pageState) {
      case 'LOADING':
        return (
          <div className="loader-container loaderCenter" testid="loader">
            <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
          </div>
        )
      case 'SUCCESS':
        return (
          <>
            <div className="bookDetailsContainer">
              <div className="bookImageAndTitleContainer">
                <img
                  src={bookDetails.coverPic}
                  alt={bookDetails.title}
                  className="bookDetailsImage"
                />
                <div>
                  <p className="bookDetailsTitle">{bookDetails.title}</p>
                  <p className="bookDetailsAuthorName">
                    {bookDetails.authorName}
                  </p>
                  <p className="bookDetailsRating">
                    Avg Rating{' '}
                    <BsFillStarFill className="bookDetailsRatingIcon" />
                    {bookDetails.rating}
                  </p>
                  <p className="bookDetailsStatusHeading">
                    Status :{' '}
                    <span className="bookDetailsStatus">
                      {bookDetails.readStatus}
                    </span>
                  </p>
                </div>
              </div>
              <hr className="bookDetailsHorizontalLine" />
              <p className="bookDetailsAuthorHeading">About Author</p>
              <p className="bookDetailsAuthor">{bookDetails.aboutAuthor}</p>
              <p className="bookDetailsBookHeading">About Book</p>
              <p className="bookDetailsBook">{bookDetails.aboutBook}</p>
            </div>
            <Footer />
          </>
        )
      case 'FAILED':
        return <FetchError retryFetch={this.getBook} />
      default:
        return null
    }
  }

  render() {
    return (
      <BookHubContext.Consumer>
        {value => {
          const {showMenu} = value
          return (
            <>
              <Header />
              {showMenu ? (
                <MobileMenu />
              ) : (
                <div className="bookDetailsBodyContainer">
                  <this.RenderPage />
                </div>
              )}
            </>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}

export default BookDetails

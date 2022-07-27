import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Footer from '../Footer/index'
import FetchError from '../FetchError/index'
import Header from '../Header/index'
import TopRatedBooks from './topBooks'
import MobileMenu from '../MobileMenu/index'
import BookHubContext from '../../Context/bookHubContext'
import './index.css'

class Home extends Component {
  state = {booksList: [], pageState: 'INITIAL'}

  componentDidMount = () => {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({pageState: 'LOADING'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data)
    } else if (response.status === 400 || response.status === 401) {
      this.setState({pageState: 'FAILED'})
    }
  }

  onSuccess = data => {
    const finalData = data.books.map(book => ({
      id: book.id,
      authorName: book.author_name,
      coverPic: book.cover_pic,
      title: book.title,
    }))
    this.setState({booksList: finalData, pageState: 'SUCCESS'})
  }

  RenderPageState = () => {
    const {pageState, booksList} = this.state
    switch (pageState) {
      case 'LOADING':
        return (
          <div className="loader-container loaderCenter" testid="loader">
            <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
          </div>
        )
      case 'SUCCESS':
        return <TopRatedBooks booksList={booksList} />
      case 'FAILED':
        return <FetchError retryFetch={this.getTopRatedBooks} />
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
                <div className="homeBodyContainer">
                  <div className="homeBodySmallSubContainer">
                    <h1 className="homeContainerHeading">
                      Find Your Next Favorite Books?
                    </h1>
                    <p className="homeContainerParagraph">
                      You are in the right place. Tell us what titles or genres
                      you have enjoyed in the past, and we will give you
                      surprisingly insightful recommendations.
                    </p>
                    <Link to="/shelf">
                      <button type="button" className="homeContainerFindButton">
                        Find Books
                      </button>
                    </Link>
                  </div>
                  <div className="homeTopRatedBooksContainer">
                    <div className="topRatedHeaderContainer">
                      <h1 className="topRatedHeaderHeading">Top Rated Books</h1>
                      <Link to="/shelf">
                        <button type="button" className="topRatedHeaderButton">
                          Find Books
                        </button>
                      </Link>
                    </div>
                    <this.RenderPageState />
                  </div>
                  <Footer />)
                </div>
              )}
            </>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}

export default Home

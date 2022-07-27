import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Footer from '../Footer/index'
import Books from '../Books/index'
import FetchError from '../FetchError/index'
import BookHubContext from '../../Context/bookHubContext'
import Header from '../Header/index'
import MobileMenu from '../MobileMenu'
import './index.css'

class BookShelves extends Component {
  state = {
    bookshelfName: 'ALL',
    categoryName: 'All',
    searchValue: '',
    pageState: 'INITIAL',
    booksList: [],
  }

  componentDidMount = () => {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({pageState: 'LOADING'})
    const {bookshelfName, searchValue} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchValue}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.books)
    } else if (response.status === 400 || response.status === 401) {
      this.setState({pageState: 'FAILED'})
    }
  }

  onSuccess = data => {
    const finalData = data.map(eachBook => ({
      id: eachBook.id,
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
      rating: eachBook.rating,
      readStatus: eachBook.read_status,
      title: eachBook.title,
    }))
    this.setState({booksList: finalData, pageState: 'SUCCESS'})
  }

  changeCategory = id => {
    const {bookshelvesList} = this.props
    const category = bookshelvesList.filter(
      eachCategory => id === eachCategory.id,
    )
    this.setState(
      {
        categoryName: category[0].label,
        bookshelfName: category[0].value,
      },
      this.getBooks,
    )
  }

  handleSearch = e => {
    this.setState({searchValue: e.target.value})
  }

  RenderPage = () => {
    const {pageState, booksList, searchValue} = this.state
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
            {booksList.length > 0 ? (
              <>
                <ul className="bookShelvesUnorderedListContainer">
                  {booksList.map(eachBook => (
                    <Books key={eachBook.id} details={eachBook} />
                  ))}
                </ul>
                <Footer />
              </>
            ) : (
              <div className="bookShelvesNoBooksContainer">
                <img
                  src="https://res.cloudinary.com/dh0pptyea/image/upload/v1658860523/Group_vmpj93.png"
                  alt="no books"
                  className="noBooksImage"
                />
                <p className="noBooksParagraph">
                  Your search for {searchValue} did not find any matches.
                </p>
              </div>
            )}
          </>
        )
      case 'FAILED':
        return <FetchError retryFetch={this.getBooks} />
      default:
        return null
    }
  }

  render() {
    const {bookshelvesList} = this.props
    const {categoryName, searchValue} = this.state
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
                <div className="bookShelvesBodyContainer">
                  <div className="bookShelvesSmallSearchContainer">
                    <input
                      type="search"
                      placeholder="Search"
                      className="bookShelvesSmallSearchInput"
                      value={searchValue}
                      onChange={this.handleSearch}
                    />
                    <button
                      type="button"
                      testid="searchButton"
                      className="bookShelvesSmallSearchButton"
                      onClick={this.getBooks}
                    >
                      <BsSearch />
                    </button>
                  </div>
                  <div className="bookShelvesCategoriesContainer">
                    <h1 className="bookShelvesCategoriesHeading">
                      Bookshelves
                    </h1>
                    <div className="bookShelvesButtonsContainer">
                      {bookshelvesList.map(category => (
                        <button
                          key={category.id}
                          onClick={() => this.changeCategory(category.id)}
                          type="button"
                          className={
                            categoryName === category.label
                              ? 'bookShelvesSelectedCategoriesButton'
                              : 'bookShelvesCategoriesButton'
                          }
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bookShelvesBooksContainer">
                    <div className="bookShelvesHeaderContainer">
                      <h1 className="bookShelvesBooksHeading">
                        {categoryName} Books
                      </h1>
                      <div className="bookShelvesSearchContainer">
                        <input
                          type="search"
                          placeholder="Search"
                          className="bookShelvesSearchInput"
                          value={searchValue}
                          onChange={this.handleSearch}
                        />
                        <button
                          type="button"
                          testid="searchButton"
                          className="bookShelvesSearchButton"
                          onClick={this.getBooks}
                        >
                          <BsSearch />
                        </button>
                      </div>
                    </div>
                    <this.RenderPage />
                  </div>
                </div>
              )}
            </>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}

export default BookShelves

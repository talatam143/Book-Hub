import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillCloseCircle} from 'react-icons/ai'

import BookHubContext from '../../Context/bookHubContext'
import './index.css'

function MobileMenu(props) {
  const {history} = props
  const {pathname} = history.location

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <BookHubContext.Consumer>
      {value => {
        const {handleShowMenu} = value
        return (
          <ul className="mobileMenuContainer">
            <Link
              to="/"
              className={
                pathname === '/' ? 'selectedMenuLinks' : 'mobileMenuLinks'
              }
              onClick={handleShowMenu}
            >
              <li>Home</li>
            </Link>

            <Link
              to="/shelf"
              className={
                pathname === '/shelf' ? 'selectedMenuLinks' : 'mobileMenuLinks'
              }
              onClick={handleShowMenu}
            >
              <li>Bookshelves</li>
            </Link>

            <button
              type="button"
              onClick={() => {
                handleLogout()
                handleShowMenu()
              }}
              className="mobileMenuLogoutButton"
            >
              Logout
            </button>
            <button
              type="button"
              className="mobileMenuCloseButton"
              onClick={handleShowMenu}
            >
              <AiFillCloseCircle />
            </button>
          </ul>
        )
      }}
    </BookHubContext.Consumer>
  )
}

export default withRouter(MobileMenu)

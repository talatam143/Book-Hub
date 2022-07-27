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
            <li>
              <Link
                to="/"
                className={
                  pathname === '/' ? 'selectedMenuLinks' : 'mobileMenuLinks'
                }
                onClick={handleShowMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shelf"
                className={
                  pathname === '/shelf'
                    ? 'selectedMenuLinks'
                    : 'mobileMenuLinks'
                }
                onClick={handleShowMenu}
              >
                Bookshelves
              </Link>
            </li>
            <li>
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
            </li>
            <li>
              <button
                type="button"
                className="mobileMenuCloseButton"
                onClick={handleShowMenu}
              >
                <AiFillCloseCircle />
              </button>
            </li>
          </ul>
        )
      }}
    </BookHubContext.Consumer>
  )
}

export default withRouter(MobileMenu)

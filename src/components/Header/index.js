import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'
import BookHubContext from '../../Context/bookHubContext'

import './index.css'

function Header(props) {
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
          <div className="headerContainer">
            <Link className="headerLogoContainer" to="/">
              <img
                src="https://res.cloudinary.com/dh0pptyea/image/upload/v1658354598/Group_7730_tx8vmr.png"
                alt="website login"
                className="headerLogoImage"
              />
              <p className="headerLogoHeading">ook Hub</p>
            </Link>
            <button
              type="button"
              className="headerHamButton"
              onClick={handleShowMenu}
            >
              <GiHamburgerMenu />
            </button>
            <ul className="headerMenuContainer">
              <li>
                <Link
                  to="/"
                  className={
                    pathname === '/'
                      ? 'headerMenuLinks'
                      : 'headerMenuNormalLink'
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shelf"
                  className={
                    pathname === '/shelf'
                      ? 'headerMenuLinks'
                      : 'headerMenuNormalLink'
                  }
                >
                  Bookshelves
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="headerLogoutButton"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )
}

export default withRouter(Header)

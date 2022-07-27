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
                alt="website logo"
                className="headerLogoImage"
              />
              <p className="headerLogoHeading">ook Hub</p>
            </Link>
            <ul className="smallUnorderedList">
              <button
                type="button"
                className="headerHamButton"
                onClick={handleShowMenu}
              >
                <GiHamburgerMenu />
              </button>
            </ul>
            <ul className="headerMenuContainer">
              <Link
                to="/"
                className={
                  pathname === '/' ? 'headerMenuLinks' : 'headerMenuNormalLink'
                }
              >
                <li>
                  <nav>Home</nav>
                </li>
              </Link>

              <Link
                to="/shelf"
                className={
                  pathname === '/shelf'
                    ? 'headerMenuLinks'
                    : 'headerMenuNormalLink'
                }
              >
                <li>
                  <nav>Bookshelves</nav>
                </li>
              </Link>
              <button
                type="button"
                className="headerLogoutButton"
                onClick={handleLogout}
              >
                Logout
              </button>
            </ul>
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )
}

export default withRouter(Header)

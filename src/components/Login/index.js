import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMessage: ''}

  handleLogin = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data)
    } else if (response.status === 400) {
      this.setState({isError: true, errorMessage: data.error_msg})
    }
  }

  onSuccess = data => {
    const {history} = this.props
    Cookies.set('jwt_token', data.jwt_token, {expires: 1})
    history.replace('/')
  }

  handleUsername = e => {
    this.setState({username: e.target.value})
  }

  handlePassword = e => {
    this.setState({password: e.target.value})
  }

  render() {
    const {username, password, isError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginPageMainContainer">
        <img
          src="https://res.cloudinary.com/dh0pptyea/image/upload/v1658335781/Login_Page_Backgroung_yurq2c.png"
          alt="login website logo"
          className="loginPageLogo"
        />
        <div className="loginPageLoginFormMainContainer">
          <div className="loginPageLoginFormContainer">
            <div className="loginPageLogoContainer">
              <img
                src="https://res.cloudinary.com/dh0pptyea/image/upload/v1658354598/Group_7730_tx8vmr.png"
                alt="website login"
                className="websiteLogo"
              />
              <p className="loginPageWebsiteTitle">ook Hub</p>
            </div>
            <form className="loginPageForm" onSubmit={this.handleLogin}>
              <label htmlFor="usernameId" className="loginFormLabels">
                Username*
              </label>
              <br />
              <input
                type="text"
                placeholder="Username"
                id="usernameId"
                className="loginFormInputs"
                onChange={this.handleUsername}
                value={username}
              />
              <br />
              <label htmlFor="passwordId" className="loginFormLabels">
                Password*
              </label>
              <br />
              <input
                type="password"
                placeholder="Password"
                id="passwordId"
                className="loginFormInputs"
                onChange={this.handlePassword}
                value={password}
              />
              <br />
              {isError && (
                <p className="loginContainerErrorMessage">{errorMessage}</p>
              )}
              <button
                type="submit"
                className={
                  isError ? 'loginPageErrorLoginButton' : 'loginPageLoginButton'
                }
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login

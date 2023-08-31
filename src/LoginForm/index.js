import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  listenUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  listenPassword = event => {
    this.setState({password: event.target.value})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    }
  }

  render() {
    const {username, password} = this.state
    return (
      <div className="bg-container-login">
        <div className="box-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.onClickLogin}>
            <ul>
              <li className="credential-box">
                <label htmlFor="username"> USERNAME </label>
                <input
                  placeholder="Username"
                  type="text"
                  id="username"
                  onChange={this.listenUsername}
                  value={username}
                />
              </li>
              <li className="credential-box">
                <label htmlFor="password"> PASSWORD </label>
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  onChange={this.listenPassword}
                  value={password}
                />
              </li>
              <li>
                <button type="submit"> Login </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm

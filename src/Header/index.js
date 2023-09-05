import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    console.log(props)
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="nav-container">
      <Link to="/">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </li>
      </Link>

      <li className="home-jobs">
        <Link to="/">
          <p className="home"> Home </p>
        </Link>

        <Link to="/jobs" className="home">
          <p className="home"> Jobs </p>
        </Link>
      </li>
      <li>
        <button className="logout" onClick={onClickLogout} type="button">
          Logout
        </button>
      </li>
    </ul>
  )
}
export default Header

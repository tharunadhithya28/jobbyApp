import './index.css'

const Header = () => (
  <nav className="nav-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
      className="logo"
    />
    <div className="home-jobs">
      <p className="home"> Home </p>
      <p> Jobs </p>
    </div>
    <button className="logout"> Logout </button>
  </nav>
)
export default Header

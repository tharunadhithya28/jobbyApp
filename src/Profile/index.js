import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Profile extends Component {
  state = {profileData: '', apiRunning: apiStatus.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiRunning: apiStatus.inprogress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileData: updatedData, apiRunning: apiStatus.success})
    } else {
      this.setState({apiRunning: apiStatus.failure})
    }
  }

  apiLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  listenRetry = () => {
    this.getProfile()
  }

  apiSuccessful = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profile-bg">
        <img src={profileImageUrl} className="profile-image" />
        <h1 className="name-profile"> {name}</h1>
        <p className="bio-profile"> {shortBio} </p>
      </div>
    )
  }

  apiFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1> Oops! Something Went Wrong</h1>
      <p> We cannot seem to find the page your're looking for</p>
      <button onClick={this.listenRetry}> Retry </button>
    </>
  )

  render() {
    const {apiRunning} = this.state
    switch (apiRunning) {
      case apiStatus.success:
        return this.apiSuccessful()
      case apiStatus.failure:
        return this.apiFailure()
      case apiStatus.inprogress:
        return this.apiLoading()
      default:
        return null
    }
  }
}
export default Profile

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {HiLocationMarker} from 'react-icons/hi'
import {MdWork} from 'react-icons/md'
import {AiFillStar, AiOutlineSearch} from 'react-icons/ai'

import './index.css'

class JobItem extends Component {
  apiLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  listenRetry = () => {
    this.getJobItems()
  }

  apiFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1> Oops! Something Went Wrong</h1>
      <p> We cannot seem to find the page you are looking for</p>
      <button onClick={this.listenRetry}> Retry </button>
    </>
  )

  apiSuccessful = () => {
    const {jobList, apiRunning} = this.props
    console.log(apiRunning)
    const {
      id,
      title,
      companyLogoUrl,
      rating,
      location,
      packagePerAnnum,
      jobDescription,
      employmentType,
    } = jobList

    return (
      <>
        <Link to={`/jobs/${id}`}>
          <div className="job-item-container">
            <div className="title-rating">
              <img src={companyLogoUrl} className="job-item-logo" />
              <div>
                <h1> {title} </h1>
                <p>
                  {' '}
                  <AiFillStar /> {rating}{' '}
                </p>
              </div>
            </div>
            <div className="location-salary-box">
              <div className="location-intern">
                <p className="location-job">
                  {' '}
                  <HiLocationMarker />
                  {location}{' '}
                </p>
                <p className="location-job">
                  {' '}
                  <MdWork /> {employmentType}{' '}
                </p>
              </div>
              <div>
                <p> {packagePerAnnum} </p>
              </div>
            </div>{' '}
            <hr />
            <div>
              <h1 className="description-job"> Description </h1>
              <p> {jobDescription}</p>
            </div>
          </div>
        </Link>
      </>
    )
  }

  render() {
    const {apiRunning} = this.props
    switch (apiRunning) {
      case 'SUCCESS':
        return this.apiSuccessful()
      case 'FAILURE':
        return this.apiFailure()
      case 'INPROGRESS':
        return this.apiLoading()
      default:
        return null
    }
  }
}
export default JobItem

import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import {HiLocationMarker} from 'react-icons/hi'
import {MdWork} from 'react-icons/md'
import {AiFillStar, AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class JobDetails extends Component {
  state = {
    jobData: [],
    skills: [],
    life: [],
    similar: [],
    apiRunning: apiStatus.initial,
  }

  componentDidMount() {
    this.getSpecificJobDetails()
  }

  getSpecificJobDetails = async () => {
    this.setState({apiRunning: apiStatus.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
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
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
        title: data.job_details.title,
      }
      const companyLifeData = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const skillsData = data.job_details.skills.map(eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      const similarJobsData = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employmentType,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobData: updatedData,
        life: companyLifeData,
        skills: skillsData,
        similar: similarJobsData,
      })
      this.setState({apiRunning: apiStatus.success})
    } else {
      this.setState({apiRunning: apiStatus.failure})
    }
  }

  apiSuccessful = () => {
    const {jobData, life, skills, similar} = this.state

    const {
      companyLogoUrl,
      title,
      rating,
      employmentType,
      jobDescription,
      packagePerAnnum,
      location,
      companyWebsiteUrl,
    } = jobData

    return (
      <>
        <Header />
        <ul className="job-details-container">
          <li className="job-item-container-job">
            <div>
              <div className="title-rating">
                <img
                  src={companyLogoUrl}
                  className="job-item-logo"
                  alt="job details company logo"
                />
                <li>
                  <h1> {title} </h1>
                  <AiFillStar />
                  <p>{rating}</p>
                </li>
              </div>
              <li className="location-salary-box">
                <div className="location-intern">
                  <HiLocationMarker />
                  <p className="location-job">{location}</p>
                  <MdWork />
                  <p className="location-job">{employmentType}</p>
                </div>
                <div>
                  <p> {packagePerAnnum} </p>
                </div>
              </li>{' '}
              <hr />
              <div>
                <div className="description-visit">
                  <a href={companyWebsiteUrl}> Visit </a>
                  <h1 className="description-job"> Description </h1>
                </div>
                <p> {jobDescription}</p>
              </div>
            </div>
            <div>
              <h1> Skills </h1>
              <ul className="skills-container">
                {skills.map(eachItem => (
                  <li className="skills-list">
                    <img
                      src={eachItem.imageUrl}
                      className="skill-image"
                      alt={eachItem.name}
                    />
                    <p> {eachItem.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <ul>
              <h1> Life at Company </h1>
              <li className="life-container">
                <p> {life.description} </p>
                <img src={life.imageUrl} alt="life at company" />
              </li>
            </ul>
          </li>
          <h1 className="similar-text"> Similar Jobs </h1>
          <li>
            <div>
              <ul className="similar-container">
                {similar.map(eachItem => (
                  <li className="similar-list">
                    <div className="title-rating">
                      <img
                        src={eachItem.companyLogoUrl}
                        className="job-item-logo"
                        alt="similar job company logo"
                      />
                      <div>
                        <h1> {eachItem.title} </h1>
                        <p>
                          {' '}
                          <AiFillStar /> {rating}{' '}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="description-job"> Description </p>
                      <p> {eachItem.jobDescription}</p>
                    </div>
                    <div className="location-salary-box">
                      <div className="location-intern">
                        <p className="location-job">
                          {' '}
                          <HiLocationMarker />
                          {eachItem.location}{' '}
                        </p>
                        <p className="location-job">
                          {' '}
                          <MdWork /> {eachItem.employmentType}{' '}
                        </p>
                      </div>
                    </div>{' '}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </>
    )
  }

  apiInProgress = () => (
    <>
      <Header />
      <div data-testid="loader" className="loader-center">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </>
  )

  listenRetry = () => {
    this.getSpecificJobDetails()
  }

  apiFailure = () => (
    <>
      <Header />
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1> Oops! Something Went Wrong</h1>
      <p> We cannot seem to find the page you are looking for</p>
      <button onClick={this.listenRetry}> Retry </button>
    </>
  )

  render() {
    const {jobData, life, skills, similar, apiRunning} = this.state

    const {
      companyLogoUrl,
      title,
      rating,
      employmentType,
      jobDescription,
      packagePerAnnum,
      location,
      companyWebsiteUrl,
    } = jobData
    switch (apiRunning) {
      case apiStatus.success:
        return this.apiSuccessful()
      case apiStatus.failure:
        return this.apiFailure()
      case apiStatus.inprogress:
        return this.apiInProgress()
      default:
        return null
    }
  }
}
export default JobDetails

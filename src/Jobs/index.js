import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Profile from '../Profile'
import JobItem from '../JobItem'
import Header from '../Header'
import FilterItems from '../FilterItems'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    jobData: [],
    employmentFilter: '',
    salaryFilter: '',
    searchFilter: '',
    apiRunning: apiStatus.initial,
  }

  componentDidMount() {
    console.log('dsfdsfd')
    this.getJobItems()
  }

  filterByEmployment = (employmentFilter, onOrOff) => {
    console.log(employmentFilter)
    console.log(onOrOff)
    if (onOrOff) {
      this.setState({employmentFilter}, this.getJobItems)
    } else {
      this.setState({employmentFilter: ''}, this.getJobItems)
    }
  }

  filterBySalary = salaryFilter => {
    this.setState({salaryFilter}, this.getJobItems)
  }

  listenSearch = event => {
    this.setState({searchFilter: event.target.value})
  }

  listenEnterKey = () => {
    this.getJobItems()
  }

  getJobItems = async () => {
    this.setState({apiRunning: apiStatus.inprogress})
    const {jobData, employmentFilter, salaryFilter, searchFilter} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentFilter}&minimum_package=${salaryFilter}&search=${searchFilter}`
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

      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({jobData: updatedData, apiRunning: apiStatus.success})
    } else {
      this.setState({apiRunning: apiStatus.failure})
    }
  }

  apiSuccessful = () => {}

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {jobData, apiRunning} = this.state

    return (
      <>
        <Header />
        <div className="job-portal">
          <div className="profile-filter">
            <Profile apiRunning={apiRunning} />
            <hr />
            <FilterItems
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              filterByEmployment={this.filterByEmployment}
              filterBySalary={this.filterBySalary}
              key={employmentTypesList.id}
            />
          </div>
          <div>
            <button onClick={this.listenEnterKey} data-testid="searchButton">
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search"
                  onChange={this.listenSearch}
                />
                <AiOutlineSearch className="search-icon" />
              </div>
            </button>
            <ul className="job-items">
              {jobData.map(eachItem => (
                <JobItem
                  jobList={eachItem}
                  key={eachItem.id}
                  apiRunning={apiRunning}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs

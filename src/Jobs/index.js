import {Component} from 'react'
import Cookies from 'js-cookie'
import Profile from '../Profile'
import JobItem from '../JobItem'
import Header from '../Header'

class Jobs extends Component {
  state = {
    jobData: '',
  }

  componentDidMount() {
    console.log('dsfdsfd')
    this.getJobItems()
  }

  getJobItems = async () => {
    const {jobData} = this.state
    const apiUrl = 'https://apis.ccbp.in/jobs'
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
      console.log(data.jobs)
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
      console.log(updatedData)
      this.setState({jobData: updatedData})
    }
  }

  render() {
    const {jobData} = this.state
    return (
      <>
        <Header />
        <Profile />
        {jobData.map(eachItem => (
          <JobItem jobList={eachItem} />
        ))}
      </>
    )
  }
}
export default Jobs

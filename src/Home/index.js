import {Component} from 'react'
import './index.css'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="bg-container">
          <div className="heading-container">
            <h1 className="title-heading">
              {' '}
              Find The Job That <br /> Fits Your Life{' '}
            </h1>
            <p className="description">
              Millions of people are searching for jobs,salary <br />{' '}
              information,company reviews. Find the job that fits your <br />{' '}
              ability and potential
            </p>
            <button className="find-job-button"> Find Jobs </button>
          </div>
        </div>
      </>
    )
  }
}
export default Home

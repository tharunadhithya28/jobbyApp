import {Component} from 'react'

class JobItem extends Component {
  render() {
    const {jobList} = this.props
    const {title} = jobList
    console.log('reached')
    return (
      <div>
        <p> {title}</p>
      </div>
    )
  }
}
export default JobItem

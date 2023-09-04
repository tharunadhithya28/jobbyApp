import {Component} from 'react'
import './index.css'

class FilterItems extends Component {
  render() {
    const {
      employmentTypesList,
      salaryRangesList,
      filterByEmployment,
      filterBySalary,
    } = this.props

    return (
      <ul className="filter-container">
        <ul className="employment-filter-container">
          <h1 className="filter-employment-title">Type of Employment </h1>
          {employmentTypesList.map(eachItem => {
            const listenEmploymentFilter = event => {
              filterByEmployment(
                eachItem.employmentTypeId,
                event.target.checked,
              )
            }
            return (
              <li className="filter-employment">
                <input
                  id="filterEmployment"
                  type="checkbox"
                  onChange={listenEmploymentFilter}
                  value={eachItem.label}
                />
                <label htmlFor="filterEmployment"> {eachItem.label} </label>
              </li>
            )
          })}
        </ul>
        <hr />
        <ul>
          <h1 className="filter-employment-title"> Salary Range </h1>
          {salaryRangesList.map(eachItem => {
            const listenSalaryFilter = () => {
              filterBySalary(eachItem.salaryRangeId)
            }
            return (
              <li className="filter-employment">
                <input
                  id="filterSalary"
                  type="radio"
                  name="salary"
                  onChange={listenSalaryFilter}
                />
                <label htmlFor="filterSalary"> {eachItem.label}</label>
              </li>
            )
          })}
        </ul>
      </ul>
    )
  }
}
export default FilterItems

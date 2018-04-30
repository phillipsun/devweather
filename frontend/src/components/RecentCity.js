import React from 'react'

class RecentCity extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return ( 
      <div class="recent-city-container">
          {
            this.props.recentCitiesSearched.map( e => <h3 className="recent-city">{e}</h3> )
          }
      </div>
    )
  }
}

export default RecentCity
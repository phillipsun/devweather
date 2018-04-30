import React from 'react'

class ForecastDay extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="forecast-container">
        {
          this.props.forecast.map( ( e, i ) => {
            return <div className="forecast-day" key={`forecastday-${i+1}`}>
                      <p>{this.props.forecast[i].date.weekday}</p>
                      <p>{this.props.forecast[i].conditions}</p>
                      <p>High {this.props.forecast[i].high.fahrenheit}</p>
                      <p>Low {this.props.forecast[i].low.fahrenheit}</p>
                      <img src={this.props.forecast[i].icon_url} alt="forecast icon"/>
                  </div>
          })
        }
      </div>
    )
  }
}

export default ForecastDay
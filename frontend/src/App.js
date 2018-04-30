import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import ForecastDay from './components/ForecastDay'
import RecentCity from './components/RecentCity'

class App extends Component {

  constructor() {
    super()

    this.state = {
      currentCity: '',
      state: '',
      forecast: [],
      recentCitiesSearched: [],
      cityEntered: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.getForecast = this.getForecast.bind(this)
  }

  componentDidMount() {
    // GET request to my API
    axios.get('/api/places')
      .then(response => 
        this.setState({
        recentCitiesSearched: response.data
      }))
  }

  handleChange(event) {
    this.setState({
      currentCity: event.target.value
    })
  }

  getForecast() {
    let currentCity = document.getElementById('city-input').value;
    let stateList = document.getElementById('state-selector');
    let currentState = stateList.options[stateList.selectedIndex].value;
    // POST request to my API
    axios.post('/api/places', { currentCity })
      .then(response =>  
        this.setState({
          recentCitiesSearched: response.data
        })
      )
    // GET request to external API
    axios.get(`http://api.wunderground.com/api/62ec4f1d1d3ac974/forecast10day/q/${currentState}/${currentCity}.json`)
      .then(response => 
        this.setState({
          currentCity: currentCity,
          state: currentState,
          forecast: response.data.forecast.simpleforecast.forecastday.slice(0, 5),
          cityEntered: true
        })
      )
  }

  render() {
    const isCityEntered = this.state.cityEntered;
    const citiesSearched = this.state.recentCitiesSearched.length

    return (
      <div className="devweather">
        <h1 className="devweather-headline">&lt;DevWeather/&gt;</h1>
        <input id="city-input" placeholder="Enter City" value={this.state.currentCity} onChange={this.handleChange}/>
        <select name="state" id="state-selector">
          <option value="" selected="selected">Select a State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>

        <button 
          className="get-forecast-button"
          onClick={() => this.getForecast()}>
            Get Weather Forecast
        </button>

        {isCityEntered ? <h2 className="forecast-headline">5 Day Forecast</h2> : null }

        <ForecastDay 
          forecast={this.state.forecast}
        />

        {citiesSearched > 0 ? <h2 className="recent-searches-headline">Recent Searches</h2> : <h2 className="recent-searches-headline">No Recent Searches</h2>}

        <RecentCity 
          recentCitiesSearched={this.state.recentCitiesSearched}
        />

      </div>
    );
  }
}

export default App;

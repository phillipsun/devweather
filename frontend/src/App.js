import React, { Component } from 'react';
import './App.css';
import ForecastDay from './components/ForecastDay'
import SearchedCity from './components/SearchedCity'
import ForecastHeadline from './components/ForecastHeadine'

import axios from 'axios'

class App extends Component {
  constructor() {
    super()

    this.state = {
      city: '',
      state: '',
      forecast: [],
      recentCitiesSearched: [],
      cityEntered: false,
      forecastHeadline: 'Enter City'
    }

    this.getForecast = this.getForecast.bind(this)
  }

  componentDidMount() {
    axios.get('/api/places')
    .then( response => this.setState({
      recentCitiesSearched: response.data
    }))
  }

  getForecast() {
    let currentCity = document.getElementById('city').value;
    let stateList = document.getElementById('state');
    let currentState = stateList.options[stateList.selectedIndex].value;

    axios.post('/api/places', { currentCity })
    .then( response => { 
      console.log(response.data)
      this.setState({
        recentCitiesSearched: response.data
      })

    })
    
    axios.get(`http://api.wunderground.com/api/62ec4f1d1d3ac974/forecast10day/q/${currentState}/${currentCity}.json`)
    .then( response => {
      this.setState({
        city: currentCity,
        state: currentState,
        forecast: response.data.forecast.simpleforecast.forecastday.slice(0, 5),
        cityEntered: true
      })
      console.log(response)
    })

    
  }

  handleChange(event) {
    this.setState({
      city: event.target.value
    })
  }


  render() {
    return (
      <div className="App">
        <h1 className="App-title">&lt;DevWeather/&gt;</h1>
        <input id="city" placeholder="City" value={this.state.city} onChange={this.handleChange.bind(this)}/>
        <select name="state" id="state">
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
        <button onClick={() => this.getForecast()}>Get Weather Forecast</button>


        <ForecastHeadline 
          cityEntered = {this.state.cityEntered}
          forecastHeadline = {this.state.forecastHeadline}
        />
        <ForecastDay 
          forecast={this.state.forecast}
          cityEntered={this.state.cityEntered}
        />

        <h2>Recent Searches</h2>
        <SearchedCity 
          recentCitiesSearched={this.state.recentCitiesSearched}
        />
      </div>
    );
  }
}

export default App;

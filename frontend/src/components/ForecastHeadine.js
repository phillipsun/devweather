import React from 'react'

class ForecastHeadline extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return( 
            (this.props.cityEntered) ? <h2>{this.props.forecaseHeadline}</h2> : <h2>Enter City</h2>    
        )
    }
}

export default ForecastHeadline
import React from 'react'

class SearchedCity extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        
        return( 
            <div class="searched-container">
                {
                    this.props.recentCitiesSearched.map( e => {
                            return <h3 className="searchedCity">{e}</h3>
                        })
                }
            </div>
            
        )

    }
}

export default SearchedCity
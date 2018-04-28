const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path')

var recentlySearchedCities = []

app.use( bodyParser.json() );

app.use( express.static( __dirname + '/../frontend/build' ) );

app.get('/', (req, res) => {
    console.log(path.join(__dirname, '../frontend/build', 'index.html'))
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
})

app.get('/api/places', (req, res) => {
    res.status(200).send(recentlySearchedCities)
})

app.post('/api/places', (req, res) => {
    recentlySearchedCities.push(req.body.currentCity)
    var arrCopy = recentlySearchedCities;
    if(recentlySearchedCities.length > 3) {
        arrCopy.shift();
    }
    recentlySearchedCities = arrCopy;
    console.log(recentlySearchedCities)
    res.status(200).send(recentlySearchedCities)
    
})

app.listen(3000, () => {
    console.log("Running on 3000")
})
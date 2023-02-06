const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define Paths for Express 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../Templetes/views')
const partialsPath = path.join(__dirname, '../Templetes/Partials')

//Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/index', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help!',
        title: 'Help Page',
        name: 'Andrew'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
        return
    }

    console.log(req.query.search)
    res.send({
        products: []
    }) 
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address.'
        })
        return
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({error})
            return
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({error})
                return
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
  
  
    // console.log(req.query.address)
    // res.send({
    //     forecast: 'Its 50 degrees',
    //     location: 'Gurgaon',
    //     address: req.query.address
    // })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Help page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Page not found'

    })
})

app.listen(3000,  () => {
    console.log('Server is up on port 3000.')
})
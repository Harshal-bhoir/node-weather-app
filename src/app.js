const path = require('path')

const hbs = require('hbs')
const express = require('express');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'index',
        name: 'Harshal',
        footer: 'Index footer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        aboutName: 'lorem ipsum',
        title: 'About',
        footer: 'About footer'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'random msg of few words',
        title: 'help',
        name: 'Anonymus',
        footer: 'Help footer'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'must provide valid address'
        })
    }

    geocode(req.query.address, (error, {lat, long, name} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(lat, long, (error, data) => {
            if(error){
                return res.send({ error });
            }

            return res.send({
                forecast: data,
                name,
                address: req.query.address
            })
        });
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harshal',
        errorMsg: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'harshal',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server started');
});
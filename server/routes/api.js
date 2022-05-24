const express = require('express');
const City = require('../models/City');
const router = express.Router()
const axios = require('axios').default;
const API_KEY = 'e598c48002232957e8598e5d2931215b'
const URL = 'http://api.openweathermap.org/data/2.5/weather?q='


router.get('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    const cityData = await axios.get(`${URL}${capitalize(cityName)}&APPID=${API_KEY}`)
    const city = new City({
        name: cityData.data.name,
        temperature: cityData.data.main.temp,
        condition: cityData.data.weather[0].description,
        conditionPic: getImg(cityData.data.weather[0].icon)
    })
    res.send(city)
})

function getImg(iconcode) {
    return "http://openweathermap.org/img/w/" + iconcode + ".png";

}
function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

router.get('/cities', async function (req, res) {
    res.send(await City.find({}))

})

router.post('/city', async function (req, res) {
    const cityData = req.body
    const city = await City.findOne({ name: cityData.name }).exec()
    console.log(city);
    if (!city) {
        new City(cityData).save()
        res.send(cityData)
    }
    else {
        res.send(city)
    }
})

router.delete('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    res.send(await City.find({ name: capitalize(cityName) }).deleteOne())
})


module.exports = router
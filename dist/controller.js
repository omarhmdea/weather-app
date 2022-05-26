const cityModel = new CityDB()
const renderer = new Renderer()


const handleSearch = async function(cityName) {
    const cityData = await cityModel.getCityData(cityName)
    //cityModel.saveCity(cityData) //should to be async
    loadPage()
}


const citySerach = function () {
    let cityName = $("#city-input").val()
    handleSearch(cityName)
}

$('.city-container').on('click','#saveCity', function(){
    let cityName = $("#city-input").val()
    const cityData = cityModel.getCityData(cityName)
    cityModel.saveCity(cityData)
    loadPage()
})

$('.city-container').on('click','#cityRemove', function(){
    let cityName = $("#city-input").val()
    cityModel.removeCity(cityName)
    loadPage()
})

async function loadPage() {
    await cityModel.getDataFromDB()
    renderer.renderData(cityModel.getData())
}
loadPage()
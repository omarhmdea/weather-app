const cityModel = new CityDB()
const renderer = new Renderer()


const handleSearch = async function(cityName) {
    const cityData = await cityModel.getCityData(cityName)
    renderer.renderData(cityModel.getData())
}


const citySerach = function () {
    let cityName = $("#city-input").val()
    handleSearch(cityName)
}

$('.city-container').on('click','#saveCity',async function(){
    let cityName = $(this).siblings('.name').text()
    const cityData = cityModel.getCityByName(cityName)
    await cityModel.saveCity(cityData)

})

$('.city-container').on('click','#cityRemove', function(){
    let cityName = $(this).siblings('.name').text()
    cityModel.removeCity(cityName)
    loadPage()
})

async function loadPage() {
    await cityModel.getDataFromDB()
    renderer.renderData(cityModel.getData())
}
loadPage()
const cityContainer = $('.city-container')
class Renderer {
    constructor(){

    }
    
    renderData(cityData){
        const source = $("#city-template").html()
        const template = Handlebars.compile(source)
        const newHtml = template({city: cityData})
        cityContainer.append(newHtml)
    }
}
class CityDB {
    constructor(){
        this._cityData = []
    }
    async getDataFromDB(){
        const cities = await $.get('cities/')
        this._cityData = cities
        
    }
    async getCityData(cityName){
        const city = await $.get(`city/${cityName}`)
        this._cityData.push(city)
        return city
    }
    async saveCity(cityToSave){
        const city = await $.post(`city/`, cityToSave)
        this._cityData.push(city)
    }
    async removeCity(cityName){
        const deletedNumber = ( await $.delete(`city/${cityName}`) ).deletedCount
        if(deletedNumber != 0){
            for (const index in this._cityData) {
                if(this._cityData[index].name == cityName){
                    this._cityData.splice(index,1)
                    break
                }
            }
        }
    }
    getData(){
        return this._cityData
    }
    

}

const request = require('request')
const forecast = (latitude,longitude,callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=915fa867242738251ad8ee2dee17267f&query='+latitude+','+longitude+'&units=m'

request({url , json:true} , (error,{body}) =>
{
    if(error)
    {
        callback('unable to connect to weather services!' , undefined)
    }else if(body.error)
    {
        callback('unable to find location' , undefined)
    }else
    {
        callback(undefined , body.current.weather_descriptions[0]+". its currently "+body.current.temperature+" degrees out. there is a "+body.current.precip+"% chance of rain and humidity is "+body.current.humidity)
    }
    
    
})
}


module.exports = forecast

// const request = require('request')
// const forecast = (latitude,longitude,callback) =>
// {
//     const url = 'http://api.weatherstack.com/current?access_key=915fa867242738251ad8ee2dee17267f&query='+latitude+','+longitude+'-122.4233&units=m'

// request({url:url , json:true} , (error,response) =>
// {
//     if(error)
//     {
//         callback('unable to connect to weather services!' , undefined)
//     }else if(response.body.error)
//     {
//         callback('unable to find location' , undefined)
//     }else
//     {
//         callback(undefined , response.body.current.weather_descriptions[0]+". its currently "+response.body.current.temperature+" degrees out. there is a "+response.body.current.precip+"% chance of rain")
//     }
    
    
// })
// }


// module.exports = forecast
import { WeatherData } from "./interfaces/WeatherData";
import { getLocationByName } from "./locationFunctions";
import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

const DEFAULT_LOCATION = "Bonn"

export async function fetchWeather(locationName: string): Promise<WeatherData> {
    let location = null;
    
    if(!locationName){
        location = await getLocationByName(DEFAULT_LOCATION)
    }
    else{
        location = await getLocationByName(locationName)
    }

    const cityState = `${location.name}, ${location.state}`
    const currentTime = new Date().getTime() / 1000

    return axios({
        method: 'GET',
        url: `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,alerts&units=metric&lang=en&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
        responseType: 'json'
    })
    .then(res => {
        if (res.status != 200) {
            throw new Error(res.statusText)
        }

        if (!res.data) {
            return {
                location: cityState,
                icon: '❓',
                description: 'Unknown',
                temperature: '?',
                wind: '?',
                high: '?',
                low: '?',
                feelsLike: '?',
            }
        }

        const currentData = res.data.current
        const dailyData = res.data.daily[0]

        const isNight = currentTime >= currentData.sunset || currentTime <= currentData.sunrise

        return {
            location: cityState,
            icon: getWeatherEmoji(currentData.weather[0].id, isNight),
            description: currentData.weather[0].main,
            temperature: Math.round(currentData.temp).toString(),
            wind: Math.round(currentData.wind_speed).toString(),
            high: Math.round(dailyData.temp.max).toString(),
            low: Math.round(dailyData.temp.min).toString(),
            feelsLike: Math.round(currentData.feels_like).toString(),
        }
    }) 
}

/**
 * Given a weather code from Open Weather Map, determine the best emoji to show.
 * 
 * @param {*} code Weather code from Open Weather Map
 * @param {*} isNight Is `true` if it is after sunset and before sunrise
 */
function getWeatherEmoji(code: number, isNight: boolean) {
    if (code >= 200 && code < 300 || code == 960 || code == 961) {
        return "⛈"
    } else if ((code >= 300 && code < 600) || code == 701) {
        return "🌧"
    } else if (code >= 600 && code < 700) {
        return "❄️"
    } else if (code == 711) {
        return "🔥"
    } else if (code == 800) {
        return isNight ? "🌕" : "☀️"
    } else if (code == 801) {
        return isNight ? "☁️" : "🌤"
    } else if (code == 802) {
        return isNight ? "☁️" : "⛅️"
    } else if (code == 803) {
        return isNight ? "☁️" : "🌥"
    } else if (code == 804) {
        return "☁️"
    } else if (code == 900 || code == 962 || code == 781) {
        return "🌪"
    } else if (code >= 700 && code < 800) {
        return "🌫"
    } else if (code == 903) {
        return "🥶"
    } else if (code == 904) {
        return "🥵"
    } else if (code == 905 || code == 957) {
        return "💨"
    } else if (code == 906 || code == 958 || code == 959) {
        return "🧊"
    } else {
        return "❓"
    }
}
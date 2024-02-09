"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeather = void 0;
const locationFunctions_1 = require("./locationFunctions");
const axios_1 = __importDefault(require("axios"));
const DEFAULT_LOCATION = "Bonn";
function fetchWeather(locationName) {
    return __awaiter(this, void 0, void 0, function* () {
        let location = null;
        if (!locationName) {
            location = yield (0, locationFunctions_1.getLocationByName)(DEFAULT_LOCATION);
        }
        else {
            location = yield (0, locationFunctions_1.getLocationByName)(locationName);
        }
        const cityState = `${location.name}, ${location.state}`;
        const currentTime = new Date().getTime() / 1000;
        return (0, axios_1.default)({
            method: 'GET',
            url: `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,alerts&units=metric&lang=en&appid=${process.env.WEATHER_API_KEY}`,
            responseType: 'json'
        })
            .then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText);
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
                };
            }
            const currentData = res.data.current;
            const dailyData = res.data.daily[0];
            const isNight = currentTime >= currentData.sunset || currentTime <= currentData.sunrise;
            return {
                location: cityState,
                icon: getWeatherEmoji(currentData.weather[0].id, isNight),
                description: currentData.weather[0].main,
                temperature: Math.round(currentData.temp).toString(),
                wind: Math.round(currentData.wind_speed).toString(),
                high: Math.round(dailyData.temp.max).toString(),
                low: Math.round(dailyData.temp.min).toString(),
                feelsLike: Math.round(currentData.feels_like).toString(),
            };
        });
    });
}
exports.fetchWeather = fetchWeather;
/**
 * Given a weather code from Open Weather Map, determine the best emoji to show.
 *
 * @param {*} code Weather code from Open Weather Map
 * @param {*} isNight Is `true` if it is after sunset and before sunrise
 */
function getWeatherEmoji(code, isNight) {
    if (code >= 200 && code < 300 || code == 960 || code == 961) {
        return "⛈";
    }
    else if ((code >= 300 && code < 600) || code == 701) {
        return "🌧";
    }
    else if (code >= 600 && code < 700) {
        return "❄️";
    }
    else if (code == 711) {
        return "🔥";
    }
    else if (code == 800) {
        return isNight ? "🌕" : "☀️";
    }
    else if (code == 801) {
        return isNight ? "☁️" : "🌤";
    }
    else if (code == 802) {
        return isNight ? "☁️" : "⛅️";
    }
    else if (code == 803) {
        return isNight ? "☁️" : "🌥";
    }
    else if (code == 804) {
        return "☁️";
    }
    else if (code == 900 || code == 962 || code == 781) {
        return "🌪";
    }
    else if (code >= 700 && code < 800) {
        return "🌫";
    }
    else if (code == 903) {
        return "🥶";
    }
    else if (code == 904) {
        return "🥵";
    }
    else if (code == 905 || code == 957) {
        return "💨";
    }
    else if (code == 906 || code == 958 || code == 959) {
        return "🧊";
    }
    else {
        return "❓";
    }
}

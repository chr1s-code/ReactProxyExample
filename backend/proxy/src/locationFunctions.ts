import axios from "axios";
import { Location } from "./interfaces/Location";
import dotenv from 'dotenv'

dotenv.config()

export async function getLocationByName(locationName: string): Promise<Location> {
    return axios({
            method: 'GET',
            url: 'http://api.openweathermap.org/geo/1.0/direct?q=' + locationName + '&limit=1&appid=' + process.env.OPENWEATHERMAP_API_KEY,
            responseType: 'json'
        })
        .then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText)
            }

            return res.data[0] as Location
        })
}

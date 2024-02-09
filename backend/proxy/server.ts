import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';

// defining the server port
const port: number = 5000;

// initializing installed dependencies
const app = express();
dotenv.config();
app.use(cors());

// listening for port 5000
app.listen(port, () => console.log(`Server is running on ${port}`));

// API request
app.get('/', (req, res) => {
    const options: axios.AxiosRequestConfig = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY as string,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    axios.request(options)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
});

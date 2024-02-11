import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fetchWeather } from './weatherFunctions';

// defining the server port
const port: number = 5000;

const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

// initializing installed dependencies
const app = express();
dotenv.config();
app.use(cors());

// listening for port 5000
app.listen(port, () => console.log(`Server is running on ${port}`));

// API request
app.get('/weather', (req: Request, res: Response) => {
    console.log(`[${new Date().toLocaleString('de-DE')}][${req.method}]: ${req.url} received`)
    fetchWeather(req.query.locationName as string)
        .then(function (response) {
            console.log(`[${new Date().toLocaleString('de-DE')}]: Responding with HTTP 200`);
            console.log(response);
            res.json(response);
        })
        .catch(function (error) {
            if(error.response.status == 400){
                res.status(400)
                res.send("Unknown city name")
            }
            else {
                console.log(error)
            }
        });
});

app.get('/', (req: Request, res: Response) => {
    res.send("Test")
})

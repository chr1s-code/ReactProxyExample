import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fetchWeather } from './weatherFunctions';

// defining the server port
const port: number = 5000;

// initializing installed dependencies
const app = express();
dotenv.config();
app.use(cors());

// listening for port 5000
app.listen(port, () => console.log(`Server is running on ${port}`));

// API request
app.get('/weather', (req: Request, res: Response) => {
    fetchWeather(req.query.locationName as string)
        .then(function (response) {
            res.json(response);
        })
        .catch(function (error) {
            console.error(error);
        });
});

app.get('/', (req: Request, res: Response) => {
    res.send("Test")
})

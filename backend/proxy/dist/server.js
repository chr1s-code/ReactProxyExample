"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const weatherFunctions_1 = require("./weatherFunctions");
// defining the server port
const port = 5000;
// initializing installed dependencies
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
// listening for port 5000
app.listen(port, () => console.log(`Server is running on ${port}`));
// API request
app.get('/weather', (req, res) => {
    (0, weatherFunctions_1.fetchWeather)(req.query.locationName)
        .then(function (response) {
        res.json(response);
    })
        .catch(function (error) {
        console.error(error);
    });
});

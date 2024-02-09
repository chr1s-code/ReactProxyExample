import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField, Button, TextFieldProps, Dialog, Backdrop, List } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function PrettyJson(json: JSON) {
  return (
    <pre>{JSON.stringify(json, null, 2)}</pre>
  );
};

function App() {
  const cityNameField = useRef<TextFieldProps>(null)

  const [weatherData, setWeatherData] = useState(JSON)

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleButtonClick = () => {
    const cityName = cityNameField.current?.value

    if (cityName) {
      console.log("Sending request for: " + cityName)
      handleOpen()
      fetchWeatherData(cityName as string)
    }
    else{
      console.log("Nothing entered")
    }
  }

  const fetchWeatherData = async(cityName: string) => {
      axios({
        method: 'GET',
        url: 'http://localhost:5000/weather?locationName=' + cityName
      })
        .then((res) => {
          handleClose()
          setWeatherData(res.data)
          console.log(weatherData)
        })
        .catch((error) => {
          handleClose()
          alert(error.response.data)
          console.log(error)
        })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br></br>
        <a>Enter a city name to get the current weather information:</a>
        <p>
          <TextField id="cityNameField" label="City name" type="search" inputRef={cityNameField} />
          <Button
            variant='contained'
            size='large'
            onClick={() => {
              handleButtonClick()
            }}
          >
            Search
          </Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </p>
        {PrettyJson(weatherData)}
      </header>
    </div>
  );
}

export default App;

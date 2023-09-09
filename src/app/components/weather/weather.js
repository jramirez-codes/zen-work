import { Button, Grid, Stack, CircularProgress, Switch} from "@mui/material";
import React from "react";
import { weatherMapping } from "./helperFunctions/weatherMapping";
import RefreshIcon from '@mui/icons-material/Refresh';
import { toggleTemperature } from "./helperFunctions/toggleTemperature";
import { useDispatch } from "react-redux";
import { updateAnyWindowDataTypeAndCache } from "@/app/store/settingStore";

async function getWeather(position) {
  var myHeaders = new Headers();
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.latitude}&longitude=${position.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,weathercode`, requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result))

  return data
}

export default function Weather(props) {
  const dispatch = useDispatch()
  const [weatherData, setWeatherData] = React.useState(undefined)

  // Get Weather Data
  function getWeatherData() {
    navigator.geolocation.getCurrentPosition(async function(position) {
      // Make GET Request
      async function getData() {
        return await getWeather(position.coords)
      }
      let data = await getData()
      
      // Configure Data
      let letIsTime = (e) => e === data.current_weather.time
      let timeIndex = data.hourly.time.findIndex(letIsTime)
      let pullTime = new Date().getTime()
      let pullTimeString = new Date().toLocaleString()
      pullTimeString = pullTimeString.substring(10, pullTimeString.length)

      let currWeatherData = {
        temperature_2m: data.hourly.temperature_2m[timeIndex],
        precipitation_probability: data.hourly.precipitation_probability[timeIndex],
        relativehumidity_2m: data.hourly.relativehumidity_2m[timeIndex],
        windspeed_10m: data.hourly.windspeed_10m[timeIndex],
        weatherCode: data.hourly.weathercode[timeIndex],
        units: data.hourly_units,
        pullTimeString: pullTimeString,
        pullTime: pullTime
      }

      // Update States
      dispatch(updateAnyWindowDataTypeAndCache({dataType:'data',idx:props.windowIdx ,data:[currWeatherData]}))
      setWeatherData(currWeatherData)
    });

  }

  // Get Data on Initalization
  React.useEffect(()=>{
    if(props.data.length === 0) {
      getWeatherData()
    }
    else {
      setWeatherData(props.data[0])
    }
  }, [])

  return(
    <>
      {/* Waiting for Data */}
      {weatherData === undefined?(
        <Stack 
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{marginBottom:'1vh'}}
        >
          <CircularProgress thickness={10} size={100}/>
          <h3>Fetching Weather Data</h3>
        </Stack>
      ):(
        <>
          <Grid container spacing={1} style={{marginBottom:'1vh'}}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <Stack 
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{marginBottom:'1vh'}}
              >
                <img src={`./staticAssets/images/weather/${weatherMapping(weatherData.weatherCode)}.svg`} height='100'/>
              </Stack>
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
              <h3 style={{textAlign:'left', margin:0}}>Temperature: {' '+weatherData.temperature_2m+" "+weatherData.units.temperature_2m}</h3>
              <h3 style={{textAlign:'left', margin:0}}>Precipitation:{' '+weatherData.precipitation_probability+" "+weatherData.units.precipitation_probability}</h3>
              <h3 style={{textAlign:'left', margin:0}}>Humidity:{' '+weatherData.relativehumidity_2m+" "+weatherData.units.relativehumidity_2m}</h3>
              <h3 style={{textAlign:'left', margin:0}}>Wind:{' '+weatherData.windspeed_10m+" "+weatherData.units.windspeed_10m}</h3>
            </Grid>
          </Grid>
          {/* Refresh Page */}
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button variant="text" endIcon={<RefreshIcon />} onClick={()=>{getWeatherData()}}>{weatherData.pullTimeString}</Button>
            <Switch onChange={()=>{setWeatherData(e=>toggleTemperature(e))}}/>
          </Stack>
        </>
      )}
    </>
  )
}

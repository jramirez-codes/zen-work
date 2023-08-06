import { Button, Grid } from "@mui/material";
import React from "react";

async function getWeather(position) {
  var myHeaders = new Headers();

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.latitude}&longitude=${position.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`, requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result))
  
  return data
}

export default function Weather(props) {
  const [weatherData, setWeatherData] = React.useState(undefined)
  const [currTime, setCurrTime] = React.useState('')

  // Get Weather Data
  function getWeatherData() {
    navigator.geolocation.getCurrentPosition(async function(position) {
      // // console.log(position.coords)
      async function getData() {
        return await getWeather(position.coords)
      }
      let data = await getData()
      setWeatherData(data)
      let date = new Date(data.current_weather.time)
      setCurrTime(date.toLocaleString())
      // console.log(data)
    });

  }

  React.useEffect(()=>{
    getWeatherData()
  }, [])

  return(
    <div>
      {weatherData === undefined?(
        <h3>Fetching Data</h3>
      ):(
        <>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{marginTop:-20}}
          >
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
              <h3>Time</h3>
            </Grid>
            <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
              <h3 style={{textAlign:'right'}}>{currTime}</h3>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{marginTop:-30}}
          >
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
              <h3>Temperature</h3>
            </Grid>
            <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
              <h3 style={{textAlign:'right'}}>{weatherData.current_weather.temperature+' '}{weatherData.hourly_units.temperature_2m}</h3>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{marginTop:-30}}
          >
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <h3>Windspeed</h3>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <h3 style={{textAlign:'right'}}>{weatherData.current_weather.windspeed}</h3>
            </Grid>
          </Grid>

        </>
      )}
      {/* Refresh Page */}
      <div style={{textAlign:'center'}}>
        <Button variant="outlined" onClick={()=>{getWeatherData()}}>Refresh</Button>
      </div>
    </div>
  )
}
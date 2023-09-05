import { Button, Grid, Stack, CircularProgress} from "@mui/material";
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
  
  console.log(data)

  return data
}

export default function Weather(props) {
  const [weatherData, setWeatherData] = React.useState(undefined)
  const [currTime, setCurrTime] = React.useState('')

  // Get Weather Data
  function getWeatherData() {
    navigator.geolocation.getCurrentPosition(async function(position) {
      async function getData() {
        return await getWeather(position.coords)
      }
      let data = await getData()
      setWeatherData(data)
      setCurrTime(new Date().toLocaleTimeString())
    });

  }

  // Get Data on Initalization
  React.useEffect(()=>{
    getWeatherData()
  }, [])

  return(
    <div>
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
          <Grid container>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Stack 
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{marginBottom:'1vh'}}
              >
                <div style={{width:'100%', height:100, background:'green'}}/>
                <h3 style={{textAlign:'center', margin:0}}>{weatherData.current_weather.temperature}</h3>
              </Stack>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              
            </Grid>
          </Grid>
          {/* Refresh Page */}
          <div style={{textAlign:'center'}}>
            <Button variant="outlined" onClick={()=>{getWeatherData()}}>Refresh</Button>
          </div>
        </>
      )}
    </div>
  )
}

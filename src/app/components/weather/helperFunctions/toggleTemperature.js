export function toggleTemperature(currTemp) {
  let newTemp = JSON.parse(JSON.stringify(currTemp))

  // Detect which type
  if(newTemp.units.temperature_2m[1] === 'C') {
    // Temperature C -> F
    newTemp.temperature_2m = ((newTemp.temperature_2m * (9 / 5)) + 32).toFixed(0);
    newTemp.units.temperature_2m = '°F'

    // Wind km/h => mph
    newTemp.windspeed_10m = (newTemp.windspeed_10m * 0.621371).toFixed(1)
    newTemp.units.windspeed_10m = 'mph'
  }
  else {
    // Temperature F -> C
    newTemp.temperature_2m = ((newTemp.temperature_2m - 32) * 5/9).toFixed(0);
    newTemp.units.temperature_2m = '°C'

    // Wind mph -> km/h
    newTemp.windspeed_10m = (newTemp.windspeed_10m * 1.60934).toFixed(1)
    newTemp.units.windspeed_10m = 'km/h'
  }

  return newTemp
}
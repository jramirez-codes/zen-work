export function weatherMapping(weatherCode) {
  if(weatherCode < 3) {
    return 'clear-day'
  }
  if(weatherCode < 10) {
    return 'haze-day'
  }
  if(weatherCode < 20) {
    return 'fog-day'
  }
  if(weatherCode === 20 || weatherCode === 21) {
    return 'rain-1-day'
  }
  if(weatherCode === 22) {
    return 'snow-day-1'
  }
  if(weatherCode < 28) {
    return 'snow-and-sleet-mix'
  }
  if(weatherCode === 28) {
    return 'fog'
  }
  if(weatherCode === 29) {
    return 'scattered-thunderstorms'
  }
  if(weatherCode < 36) {
    return 'dust'
  }
  if(weatherCode < 40) {
    return 'snowy-3-day'
  }
  if(weatherCode < 50) {
    return 'frost-day'
  }
  if(weatherCode < 60) {
    return 'rainy-1-day'
  }
  if(weatherCode < 70) {
    return 'snowy-2-day'
  }
  if(weatherCode < 80) {
    return 'snowy-3-day'
  }
  if(weatherCode === 80) {
    return 'rainy-1'
  }
  if(weatherCode === 81) {
    return 'rainy-2-day'
  }
  if(weatherCode === 82) {
    return 'rainy-3-day'
  }
  if(weatherCode < 91) {
    return 'snow-and-sleet-mix'
  }
  return 'thunderstorms'
  
}
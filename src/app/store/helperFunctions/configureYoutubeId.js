// https://www.youtube.com/embed/hzZyHpTbNZg?si=EXz86ELCsLEgJ1Io
// https://www.youtube.com/watch?v=hzZyHpTbNZg&t=10s
// https://youtu.be/hzZyHpTbNZg?si=n0_zTVdJG56QS1cK
export function configureYoutubeId(ytUrl) {
  let newUrl

  // Normal Youtube Link: www.youtube.com
  if(ytUrl.includes('youtube.com')) {
    ytUrl = ytUrl.split('/')
    ytUrl = ytUrl[ytUrl.length - 1]
    ytUrl = ytUrl.split('v=')[1].split('&')[0]
    console.log(ytUrl)
    newUrl = `https://www.youtube.com/embed/${ytUrl}`
  }
  // Shared Youtube Link: youtu.be
  else if(ytUrl.includes('youtu.be')) {
    ytUrl = ytUrl.split('/')
    ytUrl = ytUrl[ytUrl.length - 1]
    ytUrl = ytUrl.split('?')[0]
    newUrl = `https://www.youtube.com/embed/${ytUrl}` 
  }
  else {
    newUrl = "https://www.youtube.com/embed/GY8PkikQ8ZE"
  }

  return newUrl
}
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
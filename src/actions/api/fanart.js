import K from '../../constants/ApiKeys'

const DEFAULT_URL = `https://s.imgur.com/images/404/giraffeweyes.png`

export const getPoster = tvdb => {
  const parameters = `api_key={${K.FANART}}`
  const url = `https://webservice.fanart.tv/v3/tv/${tvdb}?${parameters}`
  return fetch(url)
    .then(respond => respond.json())
    .then(payload =>
      ({
        url: payload.tvposter && payload.tvposter.length > 0 ?
          payload.tvposter[0].url : DEFAULT_URL
      })
    )
}

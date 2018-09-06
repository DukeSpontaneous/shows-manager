import {
  API_KEYS as K
} from '../../constants'

export const getPoster = tvdb => {
  const parameters = `api_key={${K.FANART}}`
  const url = `https://webservice.fanart.tv/v3/tv/${tvdb}?${parameters}`
  return fetch(url)
    .then(respond => respond.json())
    .then(payload => payload.tvposter.length > 0 ? payload.tvposter[0].url : ``)
}

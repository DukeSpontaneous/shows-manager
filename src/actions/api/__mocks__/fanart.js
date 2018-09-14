import POSTER_SAMPLE from './samples/poster.json'

export const getPoster = tvdb =>
  Promise.resolve({
    url: POSTER_SAMPLE.tvposter[0].url
  })
import {
  SORTS as S,
  ACTIONS as A
} from './constants'

const myInit = {
  method: 'GET',
  headers: new Headers({
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': 'a7970fc9095e0bca9dc85a9255bc8b9c3d7ac7e120258ab85648ba1a99c89651'
  }),
}

const fetchThenDispatch = (dispatch, url, init) =>
  fetch(url, init)
    .then(response => response.json())
    .then(data => ({ type: A.SWOWS_LOADED, data }))
    .then(dispatch)
    .catch(error => console.error(error))

export const getPage = (sort = S.WATCHED, page = 1, limit = 10) => dispatch => {
  const parameters = `page=${page}&limit=${limit}`
  const url = `https://api.trakt.tv/shows/${sort}/all?${parameters}`
  return fetchThenDispatch(
    dispatch,
    url,
    myInit
  )
}

// Насколько я понимаю...
// 1) обработчик События вызывает Генератор Действий...
// 2) асинхронный Генератор Действий инициирует Обещание, которое возвращает Действие...
// 3) Действие попадает в Преобразователь через .then(dispatch)...
// 4) отрабатывает привязка свойств в `connect()`, где данные из общего `state` перекидываются в `props` компонента?!
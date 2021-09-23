import { showError } from './utils.js'
import { variables } from './variables.js'
import { renderRoute } from './routes.js'

const BASE_URL = 'https://api.tvmaze.com/'

let searchWord = ''
let currentSearchPage = ''
const qweryParamSearch = `?q=${searchWord}&page=${currentSearchPage}`
const SEARCH_ENDPOINT = `search/shows${qweryParamSearch}`

const root = document.getElementById('main')

async function getDataFromServer(baseUrl, endPoint) {
    try {
        const dataFromServer = await fetch(baseUrl + endPoint)
        const response = await dataFromServer.json()
        if (!dataFromServer.ok || response.error) {
            throw new Error(response.error || 'Bad response from server')
        }

        return response

    } catch (error) {
        console.log(error)
        showError(error, root)
    }
}

export async function showContent() {
    const qweryParamPage = `?page=${variables.currentPage}`
    const SHOWS_ENDPOINT = `shows${qweryParamPage}`
    try {
        const response = await getDataFromServer(BASE_URL, SHOWS_ENDPOINT)
        if (response.length === 0) {
            showError('Empty :-(', root)
            return
        }
        variables.commonFilmList = [...response]
        variables.filtredFilmList = [...variables.commonFilmList]
        renderRoute()
        console.log(variables.currentPage)
        console.log(qweryParamPage)
        console.log(SHOWS_ENDPOINT)
        console.log(response)
    } catch (error) {
        showError(error, root)
    }
}

showContent()

export const onFilmLikeBtnPushed = (event) => {
    if (event.target.nodeName === 'A') {
        const filmId = +event.path[2].id
        let newFavoriteFilmList = [...variables.favoriteFilmList]
        const idInArray = variables.favoriteFilmList.findIndex(film => film.id === filmId) // есть ли уже
        if (idInArray !== -1) {
            newFavoriteFilmList.splice(idInArray, 1)
        } else {
            const likedFilm = variables.filmsOnPageNow.find(film => film.id === filmId)
            newFavoriteFilmList = [...variables.favoriteFilmList, likedFilm]
        }
        const newFavoriteFilmListJson = JSON.stringify(newFavoriteFilmList)
        localStorage.setItem('favoriteFilms', newFavoriteFilmListJson)
        variables.favoriteFilmList = newFavoriteFilmList

        if (event.target.className === 'film__like') {
            event.target.setAttribute('class', 'film__liked')
        } else {
            event.target.setAttribute('class', 'film__like')
        }
    }
}
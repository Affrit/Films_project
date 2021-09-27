import { showError } from './utils.js'
import { variables } from './variables.js'
import { renderRoute } from './routes.js'
import { getfiltredFilms } from './pages/search.js'

const BASE_URL = 'https://api.tvmaze.com/'

const root = document.getElementById('root')

async function getDataFromServer(baseUrl, endPoint) {
    const apiUrl = baseUrl + endPoint
    console.log(apiUrl)
    try {
        const dataFromServer = await fetch(apiUrl)
        const response = await dataFromServer.json()
        if (!dataFromServer.ok || response.error) {
            throw new Error(response.error || 'Bad response from server')
        }

        return response

    } catch (error) {
        console.warn(error)
        showError(error, root)
    }
}

export async function showContent() {
    const qweryParamPage = `?page=${variables.currentPage}`
    const SHOWS_ENDPOINT = `shows${qweryParamPage}`
    try {
        const response = await getDataFromServer(BASE_URL, SHOWS_ENDPOINT)
        if (!response || response.length === 0) {
            throw new Error('Bad response from server')
        }
        variables.commonFilmList = [...response]
        variables.filtredFilmList = [...variables.commonFilmList]
        renderRoute()
    } catch (error) {
        console.warn(error)
        showError(error, root)
    }
}

showContent()

export async function showSearchedFilms() {
    const searchWord = variables.filtrationOptions.searchWord
    const SEARCH_ENDPOINT = `search/shows?q=${searchWord}`

    try {
        const response = await getDataFromServer(BASE_URL, SEARCH_ENDPOINT)
        if (!response) {
            throw new Error('Bad response from server')
        } 

        const foundFilms = response.reduce((acc, item) => {
            return [...acc, item.show]
        }, [])
        
        variables.filtredFilmList = [...foundFilms]
        variables.filtredFilmList = getfiltredFilms(variables.filtrationOptions, variables.filtredFilmList)

        renderRoute()
    } catch (error) {
        console.warn(error)
        showError(error, root)
    }
}

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

// =====header===========

const LogOut = document.getElementById('LogOut')

const onLogOut = () => {
    window.location.replace('')
}

LogOut.addEventListener('click', onLogOut)
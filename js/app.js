import { showError } from './utils/utils.js'
import { variables } from './variables.js'
import { render } from './routes.js'
import { getFiltredFilms } from './components/search.js'

const BASE_URL = 'https://api.tvmaze.com/'
const root = document.getElementById('root')

async function getDataFromServer(apiUrl) {
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

export async function showContent(endpoint) {
    const apiUrl = BASE_URL + endpoint
    try {
        const response = await getDataFromServer(apiUrl)
        if (!response) {
            throw new Error('Bad response from server')
        }

        if (response.length > 10) {
            variables.commonFilmList = [...response]
            variables.filtredFilmList = getFiltredFilms(variables.filtrationOptions, variables.commonFilmList)
        } else {
            const foundFilms = response.reduce((acc, item) => {
                return [...acc, item.show]
            }, [])

            variables.filtredFilmList = getFiltredFilms(variables.filtrationOptions, foundFilms)
        }

        render()
    } catch (error) {
        console.warn(error)
        showError(error, root)
    }
}

showContent(`shows?page=${variables.currentPage}`)

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
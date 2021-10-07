import { createElement } from '../utils/utils.js'
import { variables } from '../variables.js'
import { spawnFilms } from '../utils/spawnFilms.js'
import { createFilmModalWindow } from '../modalWindows/filmModalWindow.js'
import { createPagination } from '../components/pagination.js'
import { createHeader } from '../components/header.js'
import { createLoadMore } from '../components/loadMore.js'
import { createCountOfFilms } from "../components/countOfFilms.js"
import { createSearch } from '../components/search.js'

const modal = document.getElementById('modal')

export const onFilmPushed = (event) => {
    if (event.target.nodeName === 'A') return
    if (event.target.id === 'filmsContainer') return

    const oldFilmModal = document.getElementById('filmModal')
    if (oldFilmModal) {
        oldFilmModal.remove()
    }
    
    const filmId = +event.path[1].id || +event.path[0].id 
    const pushedFilm = variables.filmsOnPageNow.find(film => film.id === filmId)
    const filmModal = createFilmModalWindow(pushedFilm)
    filmModal.style.transformOrigin = `${event.x}px ${event.y}px`
    modal.append(filmModal)
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

const createFilms = () => {
    const filmsContainerNode = createElement('div', 'class', 'films')
    filmsContainerNode.setAttribute('id', 'filmsContainer')
    spawnFilms(variables.filtredFilmList, filmsContainerNode, variables.maxCountOnPage)

    filmsContainerNode.addEventListener('click', onFilmLikeBtnPushed)
    filmsContainerNode.addEventListener('click', onFilmPushed)
    
    return filmsContainerNode
}

export const renderFilmsPage = (targetNode) => {
    variables.wasSpawnedOnPage = 0
    variables.filmsOnPageNow = []

    const header = createHeader()
    const search = createSearch()
    const countOfFilms = createCountOfFilms()
    const films = createFilms()
    const loadMore = createLoadMore()

    targetNode.append(header)
    targetNode.append(search)
    targetNode.append(countOfFilms)
    targetNode.append(films)
    targetNode.append(loadMore)

    if (!variables.filtrationOptions.searchWord) { // The pagintion isn't show if serch used
        const pagination = createPagination()
        targetNode.append(pagination)
    }
}
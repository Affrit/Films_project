import { createElement } from "../utils/utils.js"
import { onFilmLikeBtnPushed } from '../app.js'
import { variables } from "../variables.js"
import { spawnFilms } from "../utils/spawnFilms.js"
import { spawnFilmModalWindow } from '../modalWindows/filmModalWindow.js'
import { createPagination } from '../components/pagination.js'
import { createHeader } from "../components/header.js"
import { createLoadMore } from "../components/loadMore.js"
import { createCountOfFilms } from "../components/countOfFilms.js"
import { createSearch } from "../components/search.js"

const onFilmPushed = (event) => {
    if (event.target.nodeName === 'A') return
    if (event.target.id === 'filmsContainer') return

    const oldFilmModal = document.getElementById('filmModal')
    if (oldFilmModal) {
        oldFilmModal.remove()
    }
    
    const filmId = +event.path[1].id || +event.path[0].id 
    const pushedFilm = variables.filmsOnPageNow.find(film => film.id === filmId)
    const filmModal = spawnFilmModalWindow(pushedFilm)
    filmModal.style.transformOrigin = `${event.x}px ${event.y}px`
    root.append(filmModal)
}

const createFilms = () => {
    const filmsContainer = createElement('div', 'class', 'films')
    filmsContainer.setAttribute('id', 'filmsContainer')
    spawnFilms(variables.filtredFilmList, filmsContainer, variables.maxCountOnPage)

    filmsContainer.addEventListener('click', onFilmLikeBtnPushed)
    filmsContainer.addEventListener('click', onFilmPushed)
    
    return filmsContainer
}

export const renderFilmsPage = (targetNode) => {
    variables.wasSpawnedOnPage = 0
    variables.filmsOnPageNow = []

    const header = createHeader()
    const search = createSearch()
    const countOfFilms = createCountOfFilms()
    const films = createFilms()
    const pagination = createPagination()
    const loadMore = createLoadMore()

    targetNode.append(header)
    targetNode.append(search)
    targetNode.append(countOfFilms)
    targetNode.append(films)
    targetNode.append(pagination)
    targetNode.append(loadMore)
}
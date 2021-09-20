import { createElement, clearContainer } from "../utils.js"
import { onFilmLikeBtnPushed } from '../app.js'
import { variables } from "../variables.js"
import { spawnFilms } from "../spawnFilms.js"

const root = document.getElementById('root')

export const renderCountOfFilms = () => {
    const countOfFilms = createElement('div', 'class', 'count-of-films')
    const countOfFilmsValue = createElement('span', 'class', 'count-of-films__value')
    countOfFilmsValue.innerText = `${variables.filtredFilmList.length} films was found`
    countOfFilms.append(countOfFilmsValue)
    root.append(countOfFilms)
}

export const renderFilms = () => {
    clearContainer(root)
    variables.wasSpawnedOnPage = 0
    variables.filmsOnPageNow = []

    renderCountOfFilms()
    const filmsContainer = createElement('div', 'class', 'films')
    filmsContainer.setAttribute('id', 'filmsContainer')
    spawnFilms(variables.filtredFilmList, filmsContainer, variables.maxCountOnPage)
    root.append(filmsContainer)
    renderLoadMore()

    filmsContainer.addEventListener('click', onFilmLikeBtnPushed)
}

const onLoadMore = () => {
    const filmsContainer = document.getElementById('filmsContainer')
    spawnFilms(variables.filtredFilmList, filmsContainer, variables.maxCountOnPage)
}

export const renderLoadMore = () => {
    const btnWrap = createElement('div', 'class', 'btn-wrap')
    const loadMoreBtn = createElement('button', 'class', 'btn')
    loadMoreBtn.innerText = 'Load More'
    btnWrap.append(loadMoreBtn)
    root.append(btnWrap)

    loadMoreBtn.addEventListener('click', onLoadMore)
}

export default renderFilms
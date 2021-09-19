import { createElement } from "../utils.js"
import { onFilmLikeBtnPushed } from '../app.js'
import { variables } from "../variables.js"
import { spawnFilms } from "../spawnFilms.js"

export const renderCountOfFilms = () => {
    const countOfFilms = createElement('div', 'class', 'count-of-films')
    const countOfFilmsValue = createElement('span', 'class', 'count-of-films__value')
    countOfFilmsValue.innerText = `${variables.filtredFilmList.length} films was found`
    countOfFilms.append(countOfFilmsValue)
    main.append(countOfFilms)
}

export const renderFilms = () => {
    variables.wasSpawnedOnPage = 0
    variables.filmsOnPageNow = []

    const filmsContainer = createElement('div', 'class', `films`)
    filmsContainer.setAttribute('id', 'filmsContainer')
    spawnFilms(variables.filtredFilmList, filmsContainer, variables.maxCountOnPage)
    main.append(filmsContainer)

    filmsContainer.addEventListener('click', onFilmLikeBtnPushed)
}

const onLoadMore = () => {
    renderFilms()
}

export const renderLoadMore = () => {
    const btnWrap = createElement('div', 'class', 'btn-wrap')
    const loadMoreBtn = createElement('button', 'class', 'btn')
    loadMoreBtn.innerText = 'Load More'
    btnWrap.append(loadMoreBtn)
    main.append(btnWrap)

    loadMoreBtn.addEventListener('click', onLoadMore)
}

export default renderFilms
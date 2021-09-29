import { createElement, clearContainer } from '../utils/utils.js'
import { variables } from '../variables.js'
import { spawnFilms } from "../utils/spawnFilms.js"

const onLoadMore = () => {
    const filmsContainer = document.getElementById('filmsContainer')
    //clearContainer(filmsContainer)
    spawnFilms(variables.filtredFilmList, filmsContainer, variables.maxCountOnPage)
    console.log('click')
}

export const createLoadMore = () => {
    const btnWrap = createElement('div', 'class', 'btn-wrap')
    const loadMoreBtn = createElement('button', 'class', 'btn')
    loadMoreBtn.innerText = 'Load More'
    btnWrap.append(loadMoreBtn)

    loadMoreBtn.addEventListener('click', onLoadMore)

    return btnWrap
}
import { createElement } from '../utils/utils.js'
import { variables } from '../variables.js'
import { spawnFilms } from '../utils/spawnFilms.js'

const onLoadMore = () => {
    const filmsContainer = document.getElementById('filmsContainer')
    spawnFilms(variables.filtredFilmList, filmsContainer, variables.maxCountOnPage)
}

export const createLoadMore = () => {
    const btnWrapNode = createElement('div', 'class', 'btn-wrap')
    const loadMoreBtnNode = createElement('button', 'class', 'more-btn')
    loadMoreBtnNode.innerText = 'Load More'
    btnWrapNode.append(loadMoreBtnNode)

    loadMoreBtnNode.addEventListener('click', onLoadMore)

    return btnWrapNode
}
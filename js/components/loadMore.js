import { createElement } from '../utils/utils.js'
import { variables } from '../variables.js'
import { spawnFilms } from '../utils/spawnFilms.js'

export const createLoadMore = (filmList) => {
    const btnWrapNode = createElement('div', 'class', 'btn-wrap')
    const loadMoreBtnNode = createElement('button', 'class', 'more-btn')
    btnWrapNode.setAttribute('id', 'showMore')
    loadMoreBtnNode.innerText = 'Load More'
    btnWrapNode.append(loadMoreBtnNode)

    const onLoadMore = () => {
        const filmsContainer = document.getElementById('filmsContainer')
        spawnFilms(filmList, filmsContainer, variables.maxCountOnPage)
    }

    loadMoreBtnNode.addEventListener('click', onLoadMore)

    return btnWrapNode
}
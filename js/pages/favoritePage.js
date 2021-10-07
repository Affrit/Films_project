import { createElement } from '../utils/utils.js'
import { onFilmLikeBtnPushed, onFilmPushed } from './filmsPage.js'
import { variables } from '../variables.js'
import { spawnFilms } from '../utils/spawnFilms.js'
import { createHeader } from '../components/header.js'

const createFavorite = () => {
    const filmsContainerNode = createElement('div', 'class', 'films')
    filmsContainerNode.setAttribute('id', 'filmsContainer')
    spawnFilms(variables.favoriteFilmList, filmsContainerNode, variables.maxCountOnPage)

    filmsContainerNode.addEventListener('click', onFilmLikeBtnPushed)
    filmsContainerNode.addEventListener('click', onFilmPushed)

    return filmsContainerNode
}

export const renderFavoritePage = (targetNode) => {
    variables.wasSpawnedOnPage = 0
    variables.filmsOnPageNow = []

    const header = createHeader()
    const favorite = createFavorite()

    targetNode.append(header)
    targetNode.append(favorite)
}

import { createElement } from "../utils/utils.js"
import { onFilmLikeBtnPushed } from '../app.js'
import { variables } from "../variables.js"
import { spawnFilms } from "../utils/spawnFilms.js"
import { createHeader } from "../components/header.js"

const createFavorite = () => {
    const filmsContainer = createElement('div', 'class', `films`)
    filmsContainer.setAttribute('id', 'filmsContainer')
    spawnFilms(variables.favoriteFilmList, filmsContainer, variables.maxCountOnPage)

    filmsContainer.addEventListener('click', onFilmLikeBtnPushed)

    return filmsContainer
}

export const renderFavoritePage = (targetNode) => {
    variables.wasSpawnedOnPage = 0
    variables.filmsOnPageNow = []

    const header = createHeader()
    const favorite = createFavorite()

    targetNode.append(header)
    targetNode.append(favorite)
}

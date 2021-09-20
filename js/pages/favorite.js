import { createElement } from "../utils.js"
import { onFilmLikeBtnPushed } from '../app.js'
import { variables } from "../variables.js"
import { spawnFilms } from "../spawnFilms.js"

const renderFavorite = () => {
    variables.wasSpawnedOnPage = 0
    variables.filmsOnPageNow = []

    const filmsContainer = createElement('div', 'class', `films`)
    filmsContainer.setAttribute('id', 'filmsContainer')
    spawnFilms(variables.favoriteFilmList, filmsContainer, variables.maxCountOnPage)
    main.append(filmsContainer)

    filmsContainer.addEventListener('click', onFilmLikeBtnPushed)
}

export default renderFavorite
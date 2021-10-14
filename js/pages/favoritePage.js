import { createFilmsBlock } from './filmsPage.js'
import { variables } from '../variables.js'
import { createHeader } from '../components/header.js'
import { createLoadMore } from '../components/loadMore.js'
import { createElement } from '../utils/utils.js'

const dataFromStorage = localStorage.getItem('favoriteFilms')
const favoriteFilmList = JSON.parse(dataFromStorage) || []
variables.favoriteFilmList = favoriteFilmList

export const renderFavoritePage = (targetNode) => {
    const header = createHeader()
    const loadMore = createLoadMore(variables.favoriteFilmList)
    const emtyMessageNode = createElement('p', 'class', 'emty-favorite')

    emtyMessageNode.innerText = 'You have not added any movies to your favorites yet.'

    variables.wasSpawnedOnPage = 0
    variables.filmsOnPageNow = []

    targetNode.append(header)

    if (variables.favoriteFilmList.length === 0) {
        targetNode.append(emtyMessageNode)
    } else {
        targetNode.append(loadMore)
        const favorite = createFilmsBlock(variables.favoriteFilmList)
        loadMore.before(favorite)
    }
}
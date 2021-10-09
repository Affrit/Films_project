import { createFilmsBlock } from './filmsPage.js'
import { variables } from '../variables.js'
import { createHeader } from '../components/header.js'
import { createLoadMore } from '../components/loadMore.js'

export const renderFavoritePage = (targetNode) => {
    variables.wasSpawnedOnPage = 0
    variables.filmsOnPageNow = []

    const header = createHeader()
    const loadMore = createLoadMore(variables.favoriteFilmList)

    targetNode.append(header)
    targetNode.append(loadMore)

    const favorite = createFilmsBlock(variables.favoriteFilmList)
    loadMore.before(favorite)
}
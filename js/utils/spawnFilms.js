import { variables } from '../variables.js'
import { createElement } from './utils.js'

/*
    params: [filmOptions: Object],
    description: this func creates a filmNode which is based on settings from params,
    returnType: Node
*/
const createFilmNode = (filmOptions) => {
    const { filmId, filmName, filmImgUrl } = filmOptions

    const filmNode = createElement('div', 'class', 'film')
    const filmVisualNode = createElement('div', 'class', 'film__visual')
    const filmBodyNode = createElement('div', 'class', 'film__body')
    const filmNameNode = createElement('span', 'class', 'film__name')
    filmNameNode.innerText = filmName
    const imgNode = createElement('img', 'src', `${filmImgUrl}`)
    const filmLikeBtnNode = createElement('a', 'class', 'film__like')

    if (variables.favoriteFilmList.some(film => film.id === filmId)) {
        filmLikeBtnNode.setAttribute('class', 'film__liked')
    }

    filmNode.setAttribute('id', filmId)

    filmVisualNode.append(imgNode)
    filmBodyNode.append(filmNameNode)
    filmBodyNode.append(filmLikeBtnNode)
    filmNode.append(filmVisualNode)
    filmNode.append(filmBodyNode)

    return filmNode
}

/*
    params: [filmList: Array, targetBlock: Node,  maxCount: Number],
    description: this func append to targetBlock some count of filmNode which are based on filmList,
                 and which are created in "createFilmNode" func, the quantity filmNode depends on maxCount. 
                 If there are no more films in the list to be shown by clicking on "showMore" btn,
                 then it is hidden.
    returnType: Void
*/
export const spawnFilms = (filmList, targetBlock, maxCount) => {
    for (let i = 0; i < maxCount; i++) {
        const filmItem = filmList[i + variables.wasSpawnedOnPage] // for show more
        if (!filmItem) break // if user want to display more films than filmList includes

        const filmOptions = {
            filmImgUrl: filmItem.image?.medium || '../img/placehold.png',
            filmName: filmItem.name || 'Name not found',
            filmId: filmItem.id, // id from server
        }

        const filmNode = createFilmNode(filmOptions)
        targetBlock.append(filmNode)

        variables.filmsOnPageNow.push(filmItem)
    }

    variables.wasSpawnedOnPage += maxCount

    const showMoreNode = document.getElementById('showMore')

    if (filmList.length <= maxCount || variables.wasSpawnedOnPage >= filmList.length) {
        showMoreNode.style.display = 'none'
    }
}
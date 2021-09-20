import { variables } from "./variables.js"
import { createElement } from "./utils.js"

export const spawnFilms = (filmList, targetBlock, maxCount = 3) => {
    // if user want to display on page more than filmList includes, user will see rest of filmList
    if (variables.wasSpawnedOnPage + maxCount > filmList.length) {
        maxCount = filmList.length - 1 - variables.wasSpawnedOnPage
    }

    for (let i = 0; i <= maxCount; i++) {
        const filmItem = filmList[i + variables.wasSpawnedOnPage]
        const imgUrl = filmItem.image?.medium || '#'
        const filmName = filmItem.name || 'Name not found'
        const filmId = filmItem.id // id from server

        const filmNode = createElement('div', 'class', `film`)
        const filmVisualNode = createElement('div', 'class', `film__visual`)
        const filmBodyNode = createElement('div', 'class', `film__body`)
        const filmNameNode = createElement('span', 'class', `film__name`)
        filmNameNode.innerText = filmName
        const imgNode = createElement('img', 'src', `${imgUrl}`)
        const filmLikeBtnNode = createElement('a', 'class', `film__like`)
        if (variables.favoriteFilmList.some(film => filmItem.id === film.id)) {
            filmLikeBtnNode.setAttribute('class', 'film__liked')
        }
        filmNode.setAttribute('id', filmId)

        filmVisualNode.append(imgNode)
        filmBodyNode.append(filmNameNode)
        filmBodyNode.append(filmLikeBtnNode)
        filmNode.append(filmVisualNode)
        filmNode.append(filmBodyNode)
        targetBlock.append(filmNode)

        variables.filmsOnPageNow.push(filmItem)
    }

    console.log(variables.filmsOnPageNow)
    variables.wasSpawnedOnPage += maxCount + 1
}
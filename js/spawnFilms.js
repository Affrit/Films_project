import { variables } from "./variables.js"
import { createElement } from "./utils.js"

export const spawnFilms = (filmList, targetBlock, maxCount) => {
    
    for (let i = 0; i < maxCount; i++) {
        const filmItem = filmList[i + variables.wasSpawnedOnPage]
        if (!filmItem) break // if want to display more films than filmList includes
        
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

    variables.wasSpawnedOnPage += maxCount
}
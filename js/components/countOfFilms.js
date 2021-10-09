import { createElement } from '../utils/utils.js'
import { variables } from '../variables.js'

export const createCountOfFilms = () => {
    const countOfFilmsNode = createElement('div', 'class', 'count-of-films')
    const countOfFilmsTextNode = createElement('span', 'class', 'count-of-films__value')

    const searchWord = variables.filtrationOptions.searchWord
    const countOfFilms = variables.filtredFilmList.length

    if (countOfFilms === 0) {
        countOfFilmsTextNode.innerText = `We didn't find results for: ${searchWord}.`
    } else {
        countOfFilmsTextNode.innerText = `We found ${countOfFilms} films for you`
    }

    countOfFilmsNode.append(countOfFilmsTextNode)
    
    return countOfFilmsNode
}
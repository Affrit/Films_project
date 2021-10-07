import { createElement } from '../utils/utils.js'
import { variables } from '../variables.js'

export const createCountOfFilms = () => {
    const countOfFilmsNode = createElement('div', 'class', 'count-of-films')
    const countOfFilmsValueNode = createElement('span', 'class', 'count-of-films__value')
    countOfFilmsValueNode.innerText = `${variables.filtredFilmList.length} films was found`
    countOfFilmsNode.append(countOfFilmsValueNode)
    
    return countOfFilmsNode
}
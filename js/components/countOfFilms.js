import { createElement } from "../utils/utils.js"
import { variables } from "../variables.js"

export const createCountOfFilms = () => {
    const countOfFilms = createElement('div', 'class', 'count-of-films')
    const countOfFilmsValue = createElement('span', 'class', 'count-of-films__value')
    countOfFilmsValue.innerText = `${variables.filtredFilmList.length} films was found`
    countOfFilms.append(countOfFilmsValue)
    
    return countOfFilms
}
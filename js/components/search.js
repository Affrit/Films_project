import { createElement } from "../utils/utils.js"
import { variables } from "../variables.js"
import { showSearchedFilms } from '../app.js'
import { renderRoute } from "../routes.js"

const genreList = ['Drama', 'Horror', 'Thriller', 'Science-Fiction',
    'Action', 'Crime', 'Music', 'Mystery',
    'Supernatural', 'Adventure', 'Family', 'Medical']

const langList = ['English', 'Japanese', 'Spanish', 'French', 'Dutch',
    'German', 'Portuguese', 'Danish', 'Swedish', 'Korean',
    'Welsh', 'Norwegian', 'Italian', 'Russian', 'Thai',
    'Chinese', 'Turkish', 'Hungarian', 'Ukrainian', 'Polish']

const perPage = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 20, 25, 30]

export const getfiltredFilms = (filtrationOptions, filmList) => {
    const { genre, lang } = filtrationOptions
    let filtredFilms = []
    if (!genre && !lang) return filmList
    if (genre) {
        if (filtredFilms.length === 0) {
            filtredFilms = filmList.filter(film => film.genres.some(ganre => ganre === genre))
        } else {
            filtredFilms = filtredFilms.filter(film => film.genres.some(ganre => ganre === genre))
        }
    }
    if (lang) {
        if (filtredFilms.length === 0) {
            filtredFilms = filmList.filter(film => film.language === lang)
        } else {
            filtredFilms = filtredFilms.filter(film => film.language === lang)
        }
    }

    return filtredFilms
}

const onChooseGenre = ({ target }) => {
    variables.filtrationOptions.genre = target.value
}

const onChooseLang = ({ target }) => {
    variables.filtrationOptions.lang = target.value
}

const onSearch = () => {
    const searchInput = document.getElementById('searchInput')
    variables.filtrationOptions.searchWord = searchInput.value

    if (searchInput.value) {
        showSearchedFilms()
    } else { // если инпут пустой то фильтровать загруженные все фильмы
        variables.filtredFilmList = getfiltredFilms(variables.filtrationOptions, variables.commonFilmList)
        renderRoute()
    }
}

const onEnter = (e) => {
    if (e.keyCode === 13) {
        onSearch()
    }
}

const onChangeElemPerPage = ({ target }) => {
    variables.maxCountOnPage = +target.value
    renderRoute()
}

const spawnSelectNode = (optionsList, optionsName) => {
    const selectNode = createElement('select', 'class', 'search__select')
    const defaultOptionNode = createElement('option', 'value', '')
    defaultOptionNode.innerText = optionsName
    selectNode.append(defaultOptionNode)

    for (const option of optionsList) {
        const optionNode = createElement('option', 'value', option)
        optionNode.innerText = option
        selectNode.append(optionNode)
    }

    return selectNode
}

const savedOptions = (selectNode, option) => {
    if (option) {
        const optionNodeWasSelected = createElement('option', 'value', option)
        optionNodeWasSelected.innerText = option
        optionNodeWasSelected.setAttribute('selected', 'true')
        optionNodeWasSelected.setAttribute('hidden', 'true')
        selectNode.append(optionNodeWasSelected)
    }
}

export const createSearch = () => {
    const containerNode = createElement('div', 'class', 'container')
    const searchNode = createElement('div', 'class', 'search')
    const search__innerNode = createElement('div', 'class', 'search__inner')
    const search__inputNode = createElement('input', 'class', 'search__input')
    search__inputNode.setAttribute('id', 'searchInput')
    search__inputNode.setAttribute('placeholder', 'insert film name here')
    search__inputNode.value = variables.filtrationOptions.searchWord
    const search__btnNode = createElement('button', 'class', 'search__btn')
    search__btnNode.innerText = 'Search'
    search__innerNode.append(search__inputNode)
    search__innerNode.append(search__btnNode)

    const selectNode = createElement('div', 'class', 'search__params')
    const searchGenreNode = spawnSelectNode(genreList, 'All genre')
    savedOptions(searchGenreNode, variables.filtrationOptions.genre)

    const searchLangNode = spawnSelectNode(langList, 'All lang')
    savedOptions(searchLangNode, variables.filtrationOptions.lang)

    const elemPerPageNode = spawnSelectNode(perPage, 'Per Page')
    elemPerPageNode.setAttribute('id', 'elemPerPage')
    savedOptions(elemPerPageNode, `Per page ${variables.maxCountOnPage}`)

    selectNode.append(searchGenreNode)
    selectNode.append(searchLangNode)
    selectNode.append(elemPerPageNode)

    searchNode.append(search__innerNode)
    searchNode.append(selectNode)
    containerNode.append(searchNode)

    search__inputNode.addEventListener('keydown', onEnter)
    search__btnNode.addEventListener('click', onSearch)
    searchGenreNode.addEventListener('change', onChooseGenre)
    searchLangNode.addEventListener('change', onChooseLang)
    elemPerPageNode.addEventListener('change', onChangeElemPerPage)

    return containerNode
}
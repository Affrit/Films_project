import { createElement } from "../utils.js"
import { variables } from "../variables.js"
import { renderFilms } from './films.js'

const main = document.getElementById('main')

const getfiltredFilms = (filtrationOptions, filmList) => {
    const { searchWord, genre, lang } = filtrationOptions
    let filtredFilms = []
    if (!searchWord && !genre && !lang) return filmList
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
    if (searchWord) {
        if (filtredFilms.length === 0) {
            filtredFilms = filmList.filter(film => film.name.toLowerCase().includes(searchWord.toLowerCase()))
        } else {
            filtredFilms = filtredFilms.filter(film => film.name.toLowerCase().includes(searchWord.toLowerCase()))
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
    variables.filmsOnPageNow = []
    variables.wasSpawnedOnPage = 0
    variables.filtrationOptions.searchWord = searchInput.value

    variables.filtredFilmList = getfiltredFilms(variables.filtrationOptions, variables.commonFilmList)
    renderFilms()
}

const onEnter = (e) => {
    if (e.keyCode === 13) {
        console.log('onEnter')
        onSearch()
    }
}

export const renderSearch = () => {
    const containerNode = createElement('div', 'class', 'container')
    const searchNode = createElement('div', 'class', 'search')
    const search__innerNode = createElement('div', 'class', 'search__inner')
    const search__inputNode = createElement('input', 'class', 'search__input')
    search__inputNode.setAttribute('id', 'searchInput')
    search__inputNode.setAttribute('placeholder', 'insert film name here')
    search__inputNode.value = variables.filtrationOptions.searchWord
    const search__btnNode = createElement('button', 'class', 'search__btn')
    search__btnNode.innerText = 'SEEEERCH'
    search__innerNode.append(search__inputNode)
    search__innerNode.append(search__btnNode)

    const search__paramsNode = createElement('div', 'class', 'search__params')
    const searchGenreNode = createElement('select', 'class', 'search__select')

    const optionNode1 = createElement('option', 'value', '')
    optionNode1.innerText = 'All genre'
    const optionNode2 = createElement('option', 'value', 'Drama')
    optionNode2.innerText = 'Drama'
    const optionNode3 = createElement('option', 'value', 'Horror')
    optionNode3.innerText = 'Horror'
    const optionNode4 = createElement('option', 'value', 'Thriller')
    optionNode4.innerText = 'Thriller'
    const optionNode5 = createElement('option', 'value', 'Science-Fiction')
    optionNode5.innerText = 'Science-Fiction'
    const optionNode6 = createElement('option', 'value', 'Action')
    optionNode6.innerText = 'Action'
    const optionNode7 = createElement('option', 'value', 'Crime')
    optionNode7.innerText = 'Crime'
    const optionNode8 = createElement('option', 'value', 'Music')
    optionNode8.innerText = 'Music'
    const optionNode9 = createElement('option', 'value', 'Mystery')
    optionNode9.innerText = 'Mystery'
    const optionNode10 = createElement('option', 'value', 'Supernatural')
    optionNode10.innerText = 'Supernatural'
    const optionNode11 = createElement('option', 'value', 'Adventure')
    optionNode11.innerText = 'Adventure'
    const optionNode12 = createElement('option', 'value', 'Family')
    optionNode12.innerText = 'Family'
    const optionNode13 = createElement('option', 'value', 'Medical')
    optionNode13.innerText = 'Medical'

    if (variables.filtrationOptions.genre) {
        const optionNodeWasSelected = createElement('option', 'value', variables.filtrationOptions.genre)
        optionNodeWasSelected.innerText = variables.filtrationOptions.genre
        optionNodeWasSelected.setAttribute('selected', 'true')
        optionNodeWasSelected.setAttribute('hidden', 'true')
        searchGenreNode.append(optionNodeWasSelected)
    }

    searchGenreNode.append(optionNode1)
    searchGenreNode.append(optionNode2)
    searchGenreNode.append(optionNode3)
    searchGenreNode.append(optionNode4)
    searchGenreNode.append(optionNode5)
    searchGenreNode.append(optionNode6)
    searchGenreNode.append(optionNode7)
    searchGenreNode.append(optionNode8)
    searchGenreNode.append(optionNode9)
    searchGenreNode.append(optionNode10)
    searchGenreNode.append(optionNode11)
    searchGenreNode.append(optionNode12)
    searchGenreNode.append(optionNode13)

    const searchLangNode = createElement('select', 'class', 'search__select')

    const optionNode14 = createElement('option', 'value', '')
    optionNode14.innerText = 'All language'
    const optionNode15 = createElement('option', 'value', 'English')
    optionNode15.innerText = 'English'
    const optionNode16 = createElement('option', 'value', 'Japanese')
    optionNode16.innerText = 'Japanese'

    if (variables.filtrationOptions.lang) {
        const optionNodeWasSelected = createElement('option', 'value', variables.filtrationOptions.lang)
        optionNodeWasSelected.innerText = variables.filtrationOptions.lang
        optionNodeWasSelected.setAttribute('selected', 'true')
        optionNodeWasSelected.setAttribute('hidden', 'true')
        searchLangNode.append(optionNodeWasSelected)
    }

    searchLangNode.append(optionNode14)
    searchLangNode.append(optionNode15)
    searchLangNode.append(optionNode16)

    search__paramsNode.append(searchGenreNode)
    search__paramsNode.append(searchLangNode)

    searchNode.append(search__innerNode)
    searchNode.append(search__paramsNode)
    containerNode.append(searchNode)
    main.append(containerNode)

    search__inputNode.addEventListener('keydown', onEnter)
    search__btnNode.addEventListener('click', onSearch)
    searchGenreNode.addEventListener('change', onChooseGenre)
    searchLangNode.addEventListener('change', onChooseLang)

    console.log(searchGenreNode)
}
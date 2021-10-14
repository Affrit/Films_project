import { ELEM_PER_PAGE, GENRE_LIST, LANG_LIST } from '../constants.js'
import { createElement } from '../utils/utils.js'
import { getFiltredFilms } from '../utils/getFiltredFilms.js'
import { variables } from '../variables.js'
import { showContent } from '../app.js'
import { render } from '../routes.js'

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
        showContent(`search/shows?q=${variables.filtrationOptions.searchWord}`)
    } else { // if input is empty, filter films that have already been loaded
        variables.filtredFilmList = getFiltredFilms(variables.filtrationOptions, variables.commonFilmList)
        render()
    }
}

const onEnter = (e) => {
    if (e.keyCode === 13) {
        onSearch()
    }
}

const onChangeElemPerPage = ({ target }) => {
    variables.maxCountOnPage = +target.value
    render()
}

const createSelectNode = (optionsList, optionsName, defValue = '') => {
    const selectNode = createElement('select', 'class', 'search__select')
    const defaultOptionNode = createElement('option', 'value', defValue)
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
    const searchInnerNode = createElement('div', 'class', 'search__inner')
    const searchInputNode = createElement('input', 'class', 'search__input')
    const searchBtnNode = createElement('button', 'class', 'search__btn')
    const selectNode = createElement('div', 'class', 'search__params')
    const searchGenreNode = createSelectNode(GENRE_LIST, 'All genre')
    const searchLangNode = createSelectNode(LANG_LIST, 'All lang')
    const elemPerPageNode = createSelectNode(ELEM_PER_PAGE, 'Per Page', 10)

    savedOptions(searchGenreNode, variables.filtrationOptions.genre)
    savedOptions(searchLangNode, variables.filtrationOptions.lang)
    savedOptions(elemPerPageNode, `Per page ${variables.maxCountOnPage}`)

    searchInputNode.setAttribute('id', 'searchInput')
    searchInputNode.setAttribute('placeholder', 'insert film name here')
    elemPerPageNode.setAttribute('id', 'elemPerPage')
    searchBtnNode.innerText = 'Search'
    searchInputNode.value = variables.filtrationOptions.searchWord

    searchInnerNode.append(searchInputNode)
    searchInnerNode.append(searchBtnNode)
    selectNode.append(searchGenreNode)
    selectNode.append(searchLangNode)
    selectNode.append(elemPerPageNode)
    searchNode.append(searchInnerNode)
    searchNode.append(selectNode)
    containerNode.append(searchNode)

    searchInputNode.addEventListener('keydown', onEnter)
    searchBtnNode.addEventListener('click', onSearch)
    searchGenreNode.addEventListener('change', onChooseGenre)
    searchLangNode.addEventListener('change', onChooseLang)
    elemPerPageNode.addEventListener('change', onChangeElemPerPage)

    return containerNode
}
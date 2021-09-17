const BASE_URL = 'https://api.tvmaze.com/'

const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const genreSelect = document.getElementById('genreSelect')
const langSelect = document.getElementById('langSelect')
const filmsContainer = document.getElementById('filmsContainer')
const countOfFoundFilms = document.getElementById('countOfFoundFilms')
const loadMoreBtn = document.getElementById('loadMoreBtn')

let commonFilmList = []
let filtredFilmList = []
let maxCountOnPage = 14
let wasSpawnedOnPage = 0

const filtrationOptions = {
    searchWord: '',
    genre: '',
    lang: '',
}

const clearContainer = targetBlock => {
    targetBlock.innerHTML = ''
}

const createElement = (elementType, attributeType, attributeValue) => {
    const element = document.createElement(elementType)
    element.setAttribute(attributeType, attributeValue)
    return element
}

const showError = (error, targetBlock) => {
    const errorText = createElement('span', 'class', 'error')
    errorText.innerText = `${error} :-(`
    targetBlock.append(errorText)
    console.log(error)
}

// ======= FILMS ==============================

const spawnCountOfFilms = (filmList) => {
    countOfFoundFilms.innerText = `${filmList.length} films was found`
}

const spawnFilms = (filmList, maxCount) => {
    // if user want to display on page more than filmList includes, user will see rest of filmList
    if (wasSpawnedOnPage + maxCount > filmList.length) {
        maxCount = filmList.length - 1 - wasSpawnedOnPage
    }

    for (let i = 0; i <= maxCount; i++) {
        const filmItem = filmList[i + wasSpawnedOnPage]
        const imgUrl = filmItem.image?.medium || '#'
        const filmName = filmItem.name || 'Name not found'

        const filmNode = createElement('div', 'class', `film`)
        const filmVisualNode = createElement('div', 'class', `film__visual`)
        const filmBodyNode = createElement('div', 'class', `film__body`)
        const filmNameNode = createElement('span', 'class', `film__name`)
        filmNameNode.innerText = filmName
        const imgNode = createElement('img', 'src', `${imgUrl}`)
        const filmLikeBtnNode = createElement('a', 'class', `film__like`)
        filmNode.setAttribute('id', filmItem.id) // id from server

        filmVisualNode.append(imgNode)
        filmBodyNode.append(filmNameNode)
        filmBodyNode.append(filmLikeBtnNode)
        filmNode.append(filmVisualNode)
        filmNode.append(filmBodyNode)
        filmsContainer.append(filmNode)
    }

    wasSpawnedOnPage += maxCount + 1
}

async function getDataFromServer() {
    try {
        const dataFromServer = await fetch(`${BASE_URL}shows`)
        const response = await dataFromServer.json()
        if (!dataFromServer.ok || response.error) {
            throw new Error(response.error || 'Bad response from server')
        }

        return response

    } catch (error) {
        console.log(error)
        showError(error, filmsContainer)
    }
}

async function showContent() {
    try {
        const response = await getDataFromServer()
        if (response.length === 0) {
            showError('Empty :-(', filmsContainer)
            return
        }
        commonFilmList = response
        filtredFilmList = [...commonFilmList]

        console.log(filtredFilmList)
        spawnCountOfFilms(filtredFilmList)
        spawnFilms(filtredFilmList, maxCountOnPage)

    } catch (error) {
        showError(error, filmsContainer)
    }
}

showContent()

// ========= Events ==========================================

// =========== Filter Events ========================

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
    filtrationOptions.genre = target.value
    console.log(target.value)
}

const onChooseLang = ({ target }) => {
    filtrationOptions.lang = target.value
    console.log(target.value)
}

const onSearch = () => {
    clearContainer(filmsContainer)
    wasSpawnedOnPage = 0
    filtrationOptions.searchWord = searchInput.value

    filtredFilmList = getfiltredFilms(filtrationOptions, commonFilmList)
    spawnCountOfFilms(filtredFilmList)
    spawnFilms(filtredFilmList, maxCountOnPage)
    console.log(filtrationOptions)
}

const onEnter = (e) => {
    if (e.keyCode === 13) {
        onSearch()
    }
}

searchInput.addEventListener('keydown', onEnter)
searchBtn.addEventListener('click', onSearch)
genreSelect.addEventListener('change', onChooseGenre)
langSelect.addEventListener('change', onChooseLang)

const onLoadMore = () => {
    spawnFilms(filtredFilmList, maxCountOnPage)
}

loadMoreBtn.addEventListener('click', onLoadMore)
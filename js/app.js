const BASE_URL = 'https://api.tvmaze.com/'

const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const genreSelect = document.getElementById('genreSelect')
const langSelect = document.getElementById('langSelect')
const filmsContainer = document.getElementById('filmsContainer')

let filmList = []
let maxCountOnPage = 11
let wasSpawnedOnPage = 0

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

const spawnFilms = (filmList, maxCount) => {
    // if you want more than server have to you
    if (wasSpawnedOnPage + maxCount > filmList.length) {
        maxCount = filmList.length - 1 - wasSpawnedOnPage
    }

    for (let i = 0; i <= maxCount; i++) {
        const filmItem = filmList[i + wasSpawnedOnPage]
        const imgUrl = filmItem.image?.medium || '#'

        const film = createElement('div', 'class', `film`)
        const filmVisual = createElement('div', 'class', `film__visual`)
        const img = createElement('img', 'src', `${imgUrl}`)
        const filmLikeBtn = createElement('a', 'class', `film__like`)
        film.setAttribute('id', filmItem.id) // id from server

        filmVisual.append(img)
        filmVisual.append(filmLikeBtn)
        film.append(filmVisual)
        filmsContainer.append(film)
    }

    wasSpawnedOnPage += maxCount + 1
}

async function getDataFromServer() {
    try {
        const dataFromServer = await fetch(`${BASE_URL}schedule/full`)
        const response = await dataFromServer.json()
        if (response.error) {
            throw new Error(response.error)
        }

        return response

    } catch (error) {
        showError(error, filmsContainer)
    }
}

async function showContent() {
    try {
        const response = await getDataFromServer()
        filmList = response
        console.log(filmList)
        
        spawnFilms(filmList, maxCountOnPage)
        
    } catch (error) {
        showError(error, filmsContainer)
    }
}

showContent()

const loadMoreBtn = document.getElementById('loadMoreBtn')

const onLoadMore = () => {
    spawnFilms(filmList, maxCountOnPage)
}

loadMoreBtn.addEventListener('click', onLoadMore)
const dataFromStorage = localStorage.getItem('favoriteFilms')
let favoriteFilmList = JSON.parse(dataFromStorage) || [] // favorite list

export const variables = {
    commonFilmList: [],
    filtredFilmList: [],
    filmsOnPageNow: [],
    favoriteFilmList: favoriteFilmList,
    maxCountOnPage: 10,
    wasSpawnedOnPage: 0,
    filtrationOptions: {
        searchWord: '',
        genre: '',
        lang: '',
    }
}
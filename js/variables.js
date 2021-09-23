let favoriteFilmList = JSON.parse(localStorage.getItem('favoriteFilms')) || [] // favorite list

export const variables = {
    commonFilmList: [],
    filtredFilmList: [],
    filmsOnPageNow: [],
    favoriteFilmList: favoriteFilmList,
    currentPage: 0,
    maxCountOnPage: 10,
    wasSpawnedOnPage: 0,
    filtrationOptions: {
        searchWord: '',
        genre: '',
        lang: '',
    }
}
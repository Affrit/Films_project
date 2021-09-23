let favoriteFilmList = JSON.parse(localStorage.getItem('favoriteFilms')) || [] // favorite list

export const variables = {
    commonFilmList: [],
    filtredFilmList: [],
    filmsOnPageNow: [],
    favoriteFilmList: favoriteFilmList,
    maxCountOnPage: 15,
    wasSpawnedOnPage: 0,
    filtrationOptions: {
        searchWord: '',
        genre: '',
        lang: '',
    }
}
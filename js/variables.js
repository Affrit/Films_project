let favoriteFilmList = JSON.parse(localStorage.getItem('favoriteFilms')) // favorite list

export const variables = {
    commonFilmList: [],
    filtredFilmList: [],
    filmsOnPageNow: [],
    favoriteFilmList: favoriteFilmList,
    maxCountOnPage: 14,
    wasSpawnedOnPage: 0,
}
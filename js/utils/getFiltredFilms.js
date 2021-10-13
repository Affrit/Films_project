export const getFiltredFilms = (filtrationOptions, filmList) => {
    const { genre, lang } = filtrationOptions
    if (!lang && !genre) return filmList

    if (lang && genre) {
        return filmList.filter(film => {
            return film.language === lang &&
            film.genres.some(ganre => ganre === genre)
        })
    } else if (lang) {
        return filmList.filter(film => film.language === lang)
    } else if (genre) {
        return filmList.filter(film => film.genres.some(ganre => ganre === genre))
    }
}
/*
    params: [filtrationOptions: Object, filmList: Array],
    description: this func filters the filmList by settings from filtrationOptions,
                 and returns the result of filtration or original filmList 
    returnType: Array
*/
export const getFiltredFilms = (filtrationOptions, filmList) => {
    const { genre, lang } = filtrationOptions
    
    if (lang && genre) {
        return filmList.filter(film => {
            return film.language === lang &&
            film.genres.some(ganre => ganre === genre)
        })
    } else if (lang) {
        return filmList.filter(film => film.language === lang)
    } else if (genre) {
        return filmList.filter(film => film.genres.some(ganre => ganre === genre))
    } else {
        return filmList
    }
}
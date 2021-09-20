import renderFavorite from './pages/favorite.js'
import { renderFilms } from './pages/films.js'
import { renderSearch } from './pages/search.js'
import { clearContainer } from './utils.js'
import { renderAbout } from './pages/about.js'
import { renderContacts } from './pages/contacts.js'
import { renderPage404 } from './pages/page404.js'

const routes = {
    DEFAULT: '',
    FILMS: 'films',
    FAVORITE: 'favorite',
    ABOUT: 'about',
    CONTACTS: 'contacts'
}

const getURL = () => {
    return window.location.hash.slice(1)
}

export const renderRoute = () => {
    const route = getURL()
    clearContainer(main)
    clearContainer(root)
    switch (route) {
        case routes.DEFAULT:
            renderSearch()
            renderFilms()
            break

        case routes.FILMS:
            renderSearch()
            renderFilms()
            break

        case routes.FAVORITE:
            renderFavorite()
            break

        case routes.ABOUT:
            renderAbout()
            break

        case routes.CONTACTS:
            renderContacts()
            break

        default:
            renderPage404()
            break
    }
}

window.addEventListener("hashchange", renderRoute)
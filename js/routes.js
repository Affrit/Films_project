import { clearContainer } from './utils.js'
import renderFavorite from './pages/favorite.js'
import { renderFilms } from './pages/films.js'
import { renderSearch } from './pages/search.js'
import { renderAbout } from './pages/about.js'
import { renderContacts } from './pages/contacts.js'
import { renderPage404 } from './pages/page404.js'
import { renderLogin } from './pages/login.js'
import { renderHeader } from './pages/header.js'

const main = document.getElementById('main')
const root = document.getElementById('root')
const pageWrapper = document.getElementById('page-wrapper')

const routes = {
    DEFAULT: '',
    LOGIN: 'login',
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
    console.log('route')
    switch (route) {
        case routes.DEFAULT:
            renderHeader(pageWrapper)
            renderLogin(main)
            break

        case routes.LOGIN:
            renderHeader(pageWrapper)
            renderLogin(main)
            break

        case routes.FILMS:
            renderSearch(main)
            renderFilms()
            break

        case routes.FAVORITE:
            renderFavorite(main)
            break

        case routes.ABOUT:
            renderAbout(main)
            break

        case routes.CONTACTS:
            renderContacts(main)
            break

        default:
            renderPage404(main)
            break
    }
}

window.addEventListener("hashchange", renderRoute)
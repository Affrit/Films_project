import { ROOT_NODE } from './constants.js'
import { clearContainer } from './utils/utils.js'
import { renderFavoritePage } from './pages/favoritePage.js'
import { renderFilmsPage } from './pages/filmsPage.js'
import { renderAboutPage } from './pages/aboutPage.js'
import { renderContactsPage } from './pages/contactsPage.js'
import { renderPage404 } from './pages/page404.js'
import { renderLoginPage } from './pages/loginPage.js'

const routes = {
    DEFAULT: '',
    LOGIN: 'login',
    FILMS: 'films',
    FAVORITE: 'favorite',
    ABOUT: 'about',
    CONTACTS: 'contacts'
}

// user will be redirect to loginPage, if it didn't log in
const isUserAuth = () => {
    if (localStorage.getItem('currentUser')) return
    window.location.replace('/#login')
}

const getURL = () => {
    return window.location.hash.slice(1)
}

export const render = () => {
    const route = getURL()
    clearContainer(ROOT_NODE)
    
    switch (route) {
        case routes.DEFAULT:
            window.location.replace('/#films')
            break

        case routes.LOGIN:
            renderLoginPage(ROOT_NODE)
            break

        case routes.FILMS:
            isUserAuth()
            renderFilmsPage(ROOT_NODE)
            break

        case routes.FAVORITE:
            isUserAuth()
            renderFavoritePage(ROOT_NODE)
            break

        case routes.ABOUT:
            renderAboutPage(ROOT_NODE)
            break

        case routes.CONTACTS:
            renderContactsPage(ROOT_NODE)
            break

        default:
            renderPage404(ROOT_NODE)
            break
    }
}

window.addEventListener('hashchange', render)
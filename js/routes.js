import { clearContainer } from './utils/utils.js'
import { renderFavoritePage } from './pages/favoritePage.js'
import { renderFilmsPage } from './pages/filmsPage.js'
import { renderAboutPage } from './pages/aboutPage.js'
import { renderContactsPage } from './pages/contactsPage.js'
import { renderPage404 } from './pages/page404.js'
import { renderLoginPage } from './pages/loginPage.js'

const pageWrapper = document.getElementById('root')

const routes = {
    DEFAULT: '',
    LOGIN: 'login',
    FILMS: 'films',
    FAVORITE: 'favorite',
    ABOUT: 'about',
    CONTACTS: 'contacts'
}

// user will be redirect to loginPage, if it didn't logged in
const isUserAuth = () => {
    if (localStorage.getItem('currentUser')) return
    window.location.replace('/#login')
}

const getURL = () => {
    return window.location.hash.slice(1)
}

export const renderRoute = () => {
    const route = getURL()
    clearContainer(pageWrapper)
    
    switch (route) {
        case routes.DEFAULT:
            isUserAuth()
            renderFilmsPage(pageWrapper)
            break

        case routes.LOGIN:
            renderLoginPage(pageWrapper)
            break

        case routes.FILMS:
            isUserAuth()
            renderFilmsPage(pageWrapper)
            break

        case routes.FAVORITE:
            isUserAuth()
            renderFavoritePage(pageWrapper)
            break

        case routes.ABOUT:
            renderAboutPage(pageWrapper)
            break

        case routes.CONTACTS:
            renderContactsPage(pageWrapper)
            break

        default:
            renderPage404(pageWrapper)
            break
    }
}

window.addEventListener('hashchange', renderRoute)
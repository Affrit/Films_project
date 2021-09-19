import renderFavorite from './pages/favorite.js'
import { renderFilms, renderCountOfFilms, renderLoadMore} from './pages/films.js'
import { renderSearch } from './pages/search.js'
import { clearContainer } from './utils.js'
import { renderAbout } from './pages/about.js'
import { renderContacts } from './pages/contacts.js'

const routes = {
    FILMS: 'films',
    FAVORITE: 'favorite',
    ABOUT: 'about',
    CONTACTS: 'contacts'
}

const getURL = () => {
    return window.location.hash.slice(1)
}

const renderRoute = () => {
    const route = getURL()
    switch (route) {
        case routes.FILMS:
            console.log('renderFilms')
            clearContainer(main)
            renderSearch()
            renderCountOfFilms()
            renderFilms()
            renderLoadMore()
            break;

        case routes.FAVORITE:
            console.log('renderFavorite')
            renderFavorite()
            break;

        case routes.ABOUT:
            console.log('renderAbout')
            clearContainer(main)
            renderAbout()
            break;

        case routes.CONTACTS:
            console.log('renderContacts')
            clearContainer(main)
            renderContacts()
            break;

        default:
            console.log('404')
            break;
    }
}

window.addEventListener("hashchange", renderRoute)
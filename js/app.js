import { BASE_URL, DEFAULT_ENDPOINT, ROOT_NODE } from './constants.js'
import { showError } from './utils/utils.js'
import { variables } from './variables.js'
import { render } from './routes.js'
import { getFiltredFilms } from './utils/getFiltredFilms.js'

async function getDataFromServer(apiUrl) {
    try {
        const dataFromServer = await fetch(apiUrl)
        const response = await dataFromServer.json()
        if (!dataFromServer.ok || response.error) {
            throw new Error(response.error || 'Bad response from server')
        }

        return response
    } catch (error) {
        console.warn(error)
        showError(error, ROOT_NODE)
    }
}

export async function showContent(endpoint) {
    const apiUrl = BASE_URL + endpoint
    try {
        const response = await getDataFromServer(apiUrl)
        if (!response) {
            throw new Error('Bad response from server')
        }

        if (response.length > 10) {
            variables.commonFilmList = [...response]
            variables.filtredFilmList = getFiltredFilms(variables.filtrationOptions, variables.commonFilmList)
        } else {
            const foundFilms = response.reduce((acc, item) => {
                return [...acc, item.show]
            }, [])

            variables.filtredFilmList = getFiltredFilms(variables.filtrationOptions, foundFilms)
        }

        render()
    } catch (error) {
        console.warn(error)
        showError(error, ROOT_NODE)
    }
}

showContent(DEFAULT_ENDPOINT) // first load
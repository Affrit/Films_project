import { createElement } from "../utils.js"

export const renderPage404 = () => {
    const message404 = createElement('span', 'class', 'message')
    message404.innerText = 'Error 404 Page is not found'
    main.append(message404)
}
import { createElement } from "../utils/utils.js"
import { createHeader } from "../components/header.js"

const createPage404 = () => {
    const message404 = createElement('span', 'class', 'message')
    message404.innerText = 'Error 404 Page is not found'

    return message404
}

export const renderPage404 = (targetNode) => {
    const header = createHeader()
    const page404 = createPage404()
    targetNode.append(header)
    targetNode.append(page404)
}
import { createElement } from "../utils/utils.js"
import { createHeader } from "../components/header.js"

const createAbout = () => {
    const about = createElement('span', 'class', 'about')
    about.innerText = 'About page will be here'

    return about
}

export const renderAboutPage = (targetNode) => {
    const header = createHeader()
    const about = createAbout()
    targetNode.append(header)
    targetNode.append(about)
}
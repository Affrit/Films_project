import { createElement } from "../utils.js"

export const renderAbout = (targetNode) => {
    const about = createElement('span', 'class', 'about')
    about.innerText = 'About page will be here'
    targetNode.append(about)
}
import { createElement } from '../utils/utils.js'
import { createHeader } from '../components/header.js'

const createAbout = () => {
    const aboutNode = createElement('span', 'class', 'about')
    aboutNode.innerText = 'About page will be here'

    return aboutNode
}

export const renderAboutPage = (targetNode) => {
    const header = createHeader()
    const about = createAbout()
    targetNode.append(header)
    targetNode.append(about)
}
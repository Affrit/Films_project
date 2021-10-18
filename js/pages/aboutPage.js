import { createElement } from '../utils/utils.js'
import { createHeader } from '../components/header.js'

const createAbout = () => {
    const containerNode = createElement('div', 'class', 'container')
    const aboutContainerNode = createElement('div', 'class', 'about')
    const aboutNode = createElement('p', 'class', 'about__info')
    const aboutNode2 = createElement('p', 'class', 'about__info')
    aboutNode.innerText = 'This app was created using "TVMAZE" open API.'
    aboutNode2.innerText = 'You can use pagination and filters to find shows that interest you or use search by shows name. Click to the show and you will see more information abouit it on opened modal window. You can save shows that you like into favorites, and they will be available on favorites page.'

    aboutContainerNode.append(aboutNode)
    aboutContainerNode.append(aboutNode2)
    containerNode.append(aboutContainerNode)

    return containerNode
}

export const renderAboutPage = (targetNode) => {
    const header = createHeader()
    const about = createAbout()
    targetNode.append(header)
    targetNode.append(about)
}
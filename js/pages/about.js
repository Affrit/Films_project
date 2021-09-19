import { createElement } from "../utils.js"

export const renderAbout = () => {
    const about = createElement('span', 'class', 'about')
    about.innerText = 'About page will be here'
    main.append(about)
}
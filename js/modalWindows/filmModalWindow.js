import { createElement } from '../utils/utils.js'

const onCloseBtnClicked = () => {
    const filmModal = document.getElementById('filmModal')
    filmModal.setAttribute('class', 'filmModal-wrap_hide')
    setTimeout(() => filmModal.remove(), 500)
}

const onOutOfWinClicked = ({ target }) => {
    if (target.id === 'filmModal') {
        onCloseBtnClicked()
    }
}

const createDescNode = (item) => {
    const descriptionNode = createElement('div', 'class', 'filmModal__body')
    const descFields = {
        name: item.name,
        genre: item.genres.join(', '),
        lang: item.language,
        age: item.premiered,
        summary: item.summary,
        rating: item.rating.average,
    }

    for (const descField in descFields) {
        const fieldValue = descFields[descField]
        if (fieldValue) {
            const descFieldNode = createElement('span', 'class', `filmModal__${descField}`)
            descFieldNode.innerHTML = descField !== 'name' ? `${descField}: ${fieldValue}` : fieldValue
            descriptionNode.append(descFieldNode)
        }
    }

    return descriptionNode
}

export const createFilmModalWindow = (item) => {
    const imgUrl = item.image.medium || '#'
    const filmModalWrapNode = createElement('div', 'class', 'filmModal-wrap_hide')
    const filmModalNode = createElement('div', 'class', 'filmModal')
    const visualNode = createElement('div', 'class', 'filmModal__visual')
    const visualImgNode = createElement('img', 'class', 'filmModal__img')
    const descriptionNode = createDescNode(item)
    const closeBtnNode = createElement('button', 'class', 'filmModal__closeBtn')

    filmModalWrapNode.setAttribute('id', 'filmModal')
    visualImgNode.setAttribute('src', imgUrl)
    closeBtnNode.setAttribute('id', 'closeBtn')

    visualNode.append(visualImgNode)
    filmModalNode.append(visualNode)
    filmModalNode.append(descriptionNode)
    filmModalNode.append(closeBtnNode)
    filmModalWrapNode.append(filmModalNode)

    closeBtnNode.addEventListener('click', onCloseBtnClicked)
    filmModalWrapNode.addEventListener('click', onOutOfWinClicked)

    setTimeout(() => {
        filmModalWrapNode.setAttribute('class', 'filmModal-wrap_show')
    }, 0)

    return filmModalWrapNode
}
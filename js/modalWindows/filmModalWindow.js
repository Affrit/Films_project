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

export const createFilmModalWindow = (item) => {
    
    const imgUrl = item.image.medium || '#'
    const name = item.name
    const genre = item.genres.join(', ')
    const lang = item.language
    const age = item.premiered
    const summary = item.summary
    const rating = item.rating.average

    const filmModalWrapNode = createElement('div', 'class', 'filmModal-wrap_hide')
    const filmModalNode = createElement('div', 'class', 'filmModal')
    filmModalWrapNode.setAttribute('id', 'filmModal')
    const visualNode = createElement('div', 'class', 'filmModal__visual')
    const visualImgNode = createElement('img', 'class', 'filmModal__img')
    visualImgNode.setAttribute('src', imgUrl)
    visualNode.append(visualImgNode)

    const infoNode = createElement('div', 'class', 'filmModal__body')

    const filmNameNode = createElement('span', 'class', 'filmModal__name')
    filmNameNode.innerText = name
    const filmGenreNode = createElement('span', 'class', 'filmModal__info')
    filmGenreNode.innerText = `genre: ${genre}`
    const filmlangNode = createElement('span', 'class', 'filmModal__info')
    filmlangNode.innerText = `lang: ${lang}`
    const filmAgeNode = createElement('span', 'class', 'filmModal__info')
    filmAgeNode.innerText = `age: ${age}`
    const filmSummaryNode = createElement('div', 'class', 'filmModal__summary')
    filmSummaryNode.innerHTML = summary
    const filmRatingNode = createElement('span', 'class', 'filmModal__info')
    filmRatingNode.innerText = `rating: ${rating}`

    const closeBtnNode = createElement('button', 'class', 'filmModal__closeBtn')
    closeBtnNode.setAttribute('id', 'closeBtn')
    closeBtnNode.addEventListener('click', onCloseBtnClicked)

    infoNode.append(closeBtnNode)
    infoNode.append(filmNameNode)
    infoNode.append(filmGenreNode)
    infoNode.append(filmlangNode)
    infoNode.append(filmAgeNode)
    infoNode.append(filmSummaryNode)
    infoNode.append(filmRatingNode)

    filmModalNode.append(visualNode)
    filmModalNode.append(infoNode)
    filmModalWrapNode.append(filmModalNode)

    filmModalWrapNode.addEventListener('click', onOutOfWinClicked)

    setTimeout(() => {
        filmModalWrapNode.setAttribute('class', 'filmModal-wrap_show')
    })

    return filmModalWrapNode
}
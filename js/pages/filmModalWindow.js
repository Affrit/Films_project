import { createElement } from "../utils.js"

const onCloseBtnClicked = () => {
    const filmModal = document.getElementById('filmModal')
    filmModal.remove()
}

export const spawnFilmModalWindow = (item) => {
    
    const imgUrl = item.image.medium || '#'
    const name = item.name
    const genre = item.genres.join(', ')
    const lang = item.language
    const age = item.premiered
    const summary = item.summary
    const rating = item.rating.average

    const filmModalWrap = createElement('div', 'class', 'filmModal-wrap')
    const filmModal = createElement('div', 'class', 'filmModal')
    filmModalWrap.setAttribute('id', 'filmModal')
    const visual = createElement('div', 'class', 'filmModal__visual')
    const visualImg = createElement('img', 'class', 'filmModal__img')
    visualImg.setAttribute('src', imgUrl)
    visual.append(visualImg)

    const info = createElement('div', 'class', 'filmModal__body')

    const filmName = createElement('span', 'class', 'filmModal__name')
    filmName.innerText = name
    const filmGenre = createElement('span', 'class', 'filmModal__info')
    filmGenre.innerText = `genre: ${genre}`
    const filmlang = createElement('span', 'class', 'filmModal__info')
    filmlang.innerText = `lang: ${lang}`
    const filmAge = createElement('span', 'class', 'filmModal__info')
    filmAge.innerText = `age: ${age}`
    const filmSummary = createElement('div', 'class', 'filmModal__summary')
    filmSummary.innerHTML = summary
    const filmRating = createElement('span', 'class', 'filmModal__info')
    filmRating.innerText = `rating: ${rating}`

    const closeBtn = createElement('button', 'class', 'filmModal__closeBtn')
    closeBtn.setAttribute('id', 'closeBtn')
    closeBtn.addEventListener('click', onCloseBtnClicked)

    info.append(closeBtn)
    info.append(filmName)
    info.append(filmGenre)
    info.append(filmlang)
    info.append(filmAge)
    info.append(filmSummary)
    info.append(filmRating)

    filmModal.append(visual)
    filmModal.append(info)
    filmModalWrap.append(filmModal)

    return filmModalWrap
}
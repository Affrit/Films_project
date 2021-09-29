import { createElement } from "../utils.js"

const refsArray = ['About', 'Films', 'Favorite', 'Contacts']

const createMenu = (refsArr) => {
    const menuWrap = createElement('nav', 'class', 'menu-wrap')
    const menu = createElement('ul', 'class', 'menu')

    for (const ref of refsArr) {
        const menuItem = createElement('li', 'class', 'menu__item')
        const itemRef = createElement('a', 'class', 'menu__btn')
        itemRef.setAttribute('href', `#${ref.toLowerCase()}`)
        itemRef.innerText = ref
        menuItem.append(itemRef)
        menu.append(menuItem)
    }

    menuWrap.append(menu)

    return menuWrap
}

const onLogOut = () => {
    const user = document.getElementById('user')
    user.setAttribute('class', 'user_hide')
    window.location.replace('#login')
}

export const createHeader = () => {
    const header = createElement('header', 'class', 'header')
    header.setAttribute('id', 'header')
    const container = createElement('div', 'class', 'container')
    const menu = createMenu(refsArray)

    const user = createElement('div', 'class', 'user')
    user.setAttribute('id', 'user')
    const userName = createElement('span', 'class', 'user__name')
    userName.setAttribute('id', 'userName')
    const logOut = createElement('button', 'class', 'user__btn')
    logOut.innerText = 'LogOut'

    user.append(userName)
    user.append(logOut)

    container.append(menu)
    container.append(user)
    header.append(container)

    logOut.addEventListener('click', onLogOut)

    return header
}

export const renderHeader = (targetBlock) => {
    const header = createHeader()
    targetBlock.prepend(header)
}
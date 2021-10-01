import { createElement } from "../utils/utils.js"

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
    localStorage.removeItem('currentUser')
    window.location.replace('/#login')
}

const onLogIn = () => {
    window.location.replace('/#login')
}

export const createHeader = () => {
    const header = createElement('header', 'class', 'header')
    header.setAttribute('id', 'header')
    const container = createElement('div', 'class', 'container')
    const menu = createMenu(refsArray)
    container.append(menu)
    const user = createElement('div', 'class', 'user')
    user.setAttribute('id', 'user')

    const userData = localStorage.getItem('currentUser')
    const currentUser = JSON.parse(userData) // or null

    if (currentUser) {
        const userName = createElement('span', 'class', 'user__name')
        userName.setAttribute('id', 'userName')
        const logOut = createElement('button', 'class', 'user__btn')
        logOut.innerText = 'LogOut'
        userName.innerText = currentUser

        user.append(userName)
        user.append(logOut)

        logOut.addEventListener('click', onLogOut)
    } else {
        const logIn = createElement('button', 'class', 'user__btn')
        logIn.innerText = 'LogIn'

        user.append(logIn)

        logIn.addEventListener('click', onLogIn)
    }

    container.append(user)
    header.append(container)

    return header
}

export const renderHeader = (targetBlock) => {
    const header = createHeader()
    targetBlock.prepend(header)
}
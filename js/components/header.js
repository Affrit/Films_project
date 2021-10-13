import { createElement } from '../utils/utils.js'
import { REFS_ARR } from '../constants.js'

const createMenu = () => {
    const menuWrapNode = createElement('nav', 'class', 'menu-wrap')
    const menuNode = createElement('ul', 'class', 'menu')

    for (const ref of REFS_ARR) {
        const menuItemNode = createElement('li', 'class', 'menu__item')
        const itemRefNode = createElement('a', 'class', 'menu__btn')
        itemRefNode.setAttribute('href', `#${ref.toLowerCase()}`)
        itemRefNode.innerText = ref
        menuItemNode.append(itemRefNode)
        menuNode.append(menuItemNode)
    }

    menuWrapNode.append(menuNode)

    return menuWrapNode
}

const createLogo = () => {
    const logoWrapNode = createElement('div', 'class', 'logo-wrap')
    const refNode = createElement('a', 'href', '#')
    const logoImgNode = createElement('img', 'src', '../../img/logo.png')
    refNode.append(logoImgNode)
    logoWrapNode.append(refNode)

    return logoWrapNode
}

const onLogOut = () => {
    localStorage.removeItem('currentUser')
    window.location.replace('/#login')
}

const onLogIn = () => {
    window.location.replace('/#login')
}

const createUserBlock = () => {
    const userNode = createElement('div', 'class', 'user')
    userNode.setAttribute('id', 'user')

    const userData = localStorage.getItem('currentUser')
    const currentUser = JSON.parse(userData) // or null

    if (currentUser) {
        const userNameNode = createElement('span', 'class', 'user__name')
        userNameNode.setAttribute('id', 'userName')
        const logOutNode = createElement('button', 'class', 'user__btn')
        logOutNode.innerText = 'LogOut'
        userNameNode.innerText = currentUser

        userNode.append(userNameNode)
        userNode.append(logOutNode)

        logOutNode.addEventListener('click', onLogOut)
    } else {
        const loginBtnNode = createElement('button', 'class', 'user__btn')
        loginBtnNode.innerText = 'LogIn'

        userNode.append(loginBtnNode)

        loginBtnNode.addEventListener('click', onLogIn)
    }

    return userNode
}

export const createHeader = () => {
    const headerNode = createElement('header', 'class', 'header')
    headerNode.setAttribute('id', 'header')
    const containerNode = createElement('div', 'class', 'container')
    const logoBlock = createLogo()
    const menuBlock = createMenu()
    const userBlock = createUserBlock()
    
    containerNode.append(menuBlock)
    containerNode.append(logoBlock)
    containerNode.append(userBlock)
    headerNode.append(containerNode)

    return headerNode
}
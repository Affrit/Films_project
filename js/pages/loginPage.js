import { createElement } from '../utils/utils.js'
import { createHeader } from '../components/header.js'

export const createLogin = () => {
    const lognWrapNode = createElement('div', 'class', 'login-wrap')
    const formNode = createElement('form', 'class', 'form')
    const fieldsetNode = createElement('fieldset', 'class', 'form__fieldset')
    const formTitleNode = createElement('legend', 'class', 'form__title')
    formTitleNode.innerText = 'Login'
    const formBodyNode = createElement('div', 'class', 'form__body')
    const formLoginWrapNode = createElement('div', 'class', 'form__item')
    const formPasswordWrapNode = createElement('div', 'class', 'form__item')

    const formLoginInputNode = createElement('input', 'class', 'form__input')
    formLoginInputNode.setAttribute('type', 'text')
    formLoginInputNode.setAttribute('placeholder', 'insert your login')
    const formPasswordInputNode = createElement('input', 'class', 'form__input')
    formPasswordInputNode.setAttribute('type', 'password')
    formPasswordInputNode.setAttribute('placeholder', 'insert your password')

    const btnWrapNode = createElement('div', 'class', 'btn-wrap')
    const formBtnNode = createElement('button', 'class', 'form__btn')
    formBtnNode.setAttribute('type', 'submit')
    formBtnNode.innerText = 'Login'

    btnWrapNode.append(formBtnNode)
    formLoginWrapNode.append(formLoginInputNode)
    formPasswordWrapNode.append(formPasswordInputNode)
    formBodyNode.append(formLoginWrapNode)
    formBodyNode.append(formPasswordWrapNode)
    formNode.append(fieldsetNode)
    fieldsetNode.append(formTitleNode)
    fieldsetNode.append(formBodyNode)
    fieldsetNode.append(btnWrapNode)
    lognWrapNode.append(formNode)

    const onSubmitForm = (event) => {
        event.preventDefault()
        if (!formLoginInputNode.value || !formPasswordInputNode.value) return
        const currentUser = JSON.stringify(formLoginInputNode.value)
        localStorage.setItem('currentUser', currentUser)
        window.location.replace('/#films')
    }

    formBtnNode.addEventListener('click', onSubmitForm)

    return lognWrapNode
}

export const renderLoginPage = (targetBlock) => {
    const header = createHeader()
    const loginBlock = createLogin()
    targetBlock.append(header)
    targetBlock.append(loginBlock)
}
import { createElement } from '../utils/utils.js'
import { createHeader } from '../components/header.js'

export const createLogin = () => {
    const lognWrap = createElement('div', 'class', 'login-wrap')
    const form = createElement('form', 'class', 'form')
    const fieldset = createElement('fieldset', 'class', 'form__fieldset')
    const formTitle = createElement('legend', 'class', 'form__title')
    formTitle.innerText = 'Login'
    const formBody = createElement('div', 'class', 'form__body')
    const formLoginWrap = createElement('div', 'class', 'form__item')
    const formPasswordWrap = createElement('div', 'class', 'form__item')

    const formLoginInput = createElement('input', 'class', 'form__input')
    formLoginInput.setAttribute('type', 'text')
    formLoginInput.setAttribute('placeholder', 'insert your login')
    const formPasswordInput = createElement('input', 'class', 'form__input')
    formPasswordInput.setAttribute('type', 'password')
    formPasswordInput.setAttribute('placeholder', 'insert your password')

    const btnWrap = createElement('div', 'class', 'btn-wrap')
    const formBtn = createElement('button', 'class', 'form__btn')
    formBtn.setAttribute('type', 'submit')
    formBtn.innerText = 'Login'

    btnWrap.append(formBtn)
    formLoginWrap.append(formLoginInput)
    formPasswordWrap.append(formPasswordInput)
    formBody.append(formLoginWrap)
    formBody.append(formPasswordWrap)
    form.append(fieldset)
    fieldset.append(formTitle)
    fieldset.append(formBody)
    fieldset.append(btnWrap)
    lognWrap.append(form)

    const onSubmitForm = (event) => {
        event.preventDefault()
        if (!formLoginInput.value || !formPasswordInput.value) return
        const currentUser = JSON.stringify(formLoginInput.value)
        localStorage.setItem('currentUser', currentUser)
        window.location.replace('/#films')
    }

    formBtn.addEventListener('click', onSubmitForm)

    return lognWrap
}

export const renderLoginPage = (targetBlock) => {
    const header = createHeader()
    const loginBlock = createLogin()
    targetBlock.append(header)
    targetBlock.append(loginBlock)
}
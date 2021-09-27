import { createElement } from '../utils.js'

export const createLogin = () => {
    const lognWrap = createElement('div', 'class', 'login-wrap')
    const form = createElement('form', 'class', 'form')
    const fieldset = createElement('fieldset', 'class', 'form__fieldset')
    const formTitle = createElement('legend', 'class', 'form__title')
    formTitle.innerText = 'Login'
    const formBody = createElement('h2', 'class', 'form__body')
    const formLoginWrap = createElement('h2', 'class', 'form__item')
    const formPasswordWrap = createElement('h2', 'class', 'form__item')

    const formLoginInput = createElement('input', 'class', 'form__input')
    formLoginInput.setAttribute('type', 'text')
    formLoginInput.setAttribute('placeholder', 'insert your login')
    const formPasswordInput = createElement('input', 'class', 'form__input')
    formPasswordInput.setAttribute('type', 'text')
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
        window.location.replace('/#films')
        console.log(event)
    }

    formBtn.addEventListener('click', onSubmitForm)

    return lognWrap
}

export const renderLogin = (targetBlock) => {
    const loginBlock = createLogin()
    targetBlock.append(loginBlock)
}
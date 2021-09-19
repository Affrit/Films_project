export const clearContainer = targetBlock => {
    targetBlock.innerHTML = ''
}

export const createElement = (elementType, attributeType, attributeValue) => {
    const element = document.createElement(elementType)
    element.setAttribute(attributeType, attributeValue)
    return element
}

export const showError = (error, targetBlock) => {
    const errorText = createElement('span', 'class', 'error')
    errorText.innerText = `${error} :-(`
    console.log(error)
    targetBlock.append(errorText)
}
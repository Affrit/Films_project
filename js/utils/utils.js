/*
    params: [targetBlock: Node],
    description: this func clears the contents of the targetBlock,
    returnType: Void
*/
export const clearContainer = targetBlock => {
    targetBlock.innerHTML = ''
}

/*
    params: [elementType: String, attributeType: String, attributeValue: String],
    description: this func creates node element with type of element, type of 
                 attribute and value of attribute from params,
    returnType: Node
*/
export const createElement = (elementType, attributeType, attributeValue) => {
    const element = document.createElement(elementType)
    element.setAttribute(attributeType, attributeValue)
    return element
}

/*
    params: [error: Error, targetBlock: Node],
    description: this func shows an error message to user instead of any content,
    returnType: Void
*/
export const showError = (error, targetBlock) => {
    const errorText = createElement('span', 'class', 'error')
    errorText.innerText = `${error} :-(`
    console.warn(error)
    clearContainer(targetBlock)
    targetBlock.append(errorText)
}
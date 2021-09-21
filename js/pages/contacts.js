import { createElement } from "../utils.js"

export const renderContacts = (targetNode) => {
    const contacts = createElement('span', 'class', 'about')
    contacts.innerText = 'Contacts page will be here'
    targetNode.append(contacts)
}
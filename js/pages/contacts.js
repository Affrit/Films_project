import { createElement } from "../utils.js"

export const renderContacts = () => {
    const contacts = createElement('span', 'class', 'about')
    contacts.innerText = 'Contacts page will be here'
    main.append(contacts)
}
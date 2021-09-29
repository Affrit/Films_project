import { createElement } from "../utils/utils.js"
import { createHeader } from "../components/header.js"

const createContacts = () => {
    const contacts = createElement('span', 'class', 'about')
    contacts.innerText = 'Contacts page will be here'

    return contacts
}

export const renderContactsPage = (targetNode) => {
    const header = createHeader()
    const contacts = createContacts()
    targetNode.append(header)
    targetNode.append(contacts)
}
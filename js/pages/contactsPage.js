import { createElement } from '../utils/utils.js'
import { createHeader } from '../components/header.js'

const createContacts = () => {
    const contactsNode = createElement('span', 'class', 'about')
    contactsNode.innerText = 'Contacts page will be here'

    return contactsNode
}

export const renderContactsPage = (targetNode) => {
    const header = createHeader()
    const contacts = createContacts()
    targetNode.append(header)
    targetNode.append(contacts)
}
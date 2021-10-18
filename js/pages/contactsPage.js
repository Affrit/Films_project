import { createElement } from '../utils/utils.js'
import { createHeader } from '../components/header.js'

const createContacts = () => {
    const contactsNode = createElement('div', 'class', 'contacts')
    const autorNode = createElement('span', 'class', 'contacts__autor')
    const mailRefNode = createElement('a', 'href', 'mailto:Affrit393@gmail.com')
    
    mailRefNode.setAttribute('class', 'contacts__ref')
    autorNode.innerText = 'Autor:'
    mailRefNode.innerText = 'Affrit393@gmail.com'

    contactsNode.append(autorNode)
    contactsNode.append(mailRefNode)

    return contactsNode
}

export const renderContactsPage = (targetNode) => {
    const header = createHeader()
    const contacts = createContacts()
    targetNode.append(header)
    targetNode.append(contacts)
}
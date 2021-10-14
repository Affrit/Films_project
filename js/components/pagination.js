import { createElement } from '../utils/utils.js'
import { showContent } from '../app.js'

let currentPage = 0

const onInputPage = ({ target }) => {
    const fromPages = document.getElementById('fromPages')
    const warnMessage = document.getElementById('warnMessage')
    target.setAttribute('class', 'pagination__input_hide')
    fromPages.setAttribute('class', 'pagination__info')

    const pageNum = +target.value - 1
    if (pageNum < 0 || pageNum > 98 || isNaN(pageNum)) {
        target.value = ''
        warnMessage.setAttribute('class', 'pagination__warn')
        return
    }

    currentPage = pageNum
    showContent(`shows?page=${currentPage}`)
}

const onPaginationUsed = ({ target }) => {
    if (target.id === 'fromPages') {
        const inputPage = document.getElementById('inputPage')
        target.setAttribute('class', 'pagination__info_hide')
        inputPage.setAttribute('class', 'pagination__input')
    } 
    
    if (target.id === 'nextPageBtn' && currentPage < 98) {
        currentPage += 1
        showContent(`shows?page=${currentPage}`)
    } 
    
    if (target.id === 'previousPage' && currentPage > 0) {
        currentPage -= 1
        showContent(`shows?page=${currentPage}`)
    } 
}

const createInputPageNum = () => {
    const inputPageNumNode = createElement('input', 'class', 'pagination__input_hide')
    inputPageNumNode.setAttribute('type', 'number')
    inputPageNumNode.setAttribute('id', 'inputPage')

    inputPageNumNode.addEventListener('change', onInputPage)
    inputPageNumNode.addEventListener('blur', onInputPage)

    return inputPageNumNode
}

export const createPagination = () => {
    const paginationBlockNode = createElement('div', 'class', 'pagination')
    const previousPageBtnNode = createElement('button', 'class', 'pagination__btn')
    const nextPageBtnNode = createElement('button', 'class', 'pagination__btn')
    const currentPageNode = createElement('span', 'class', 'pagination__info')
    const countOfPagesNode = createElement('span', 'class', 'pagination__info')
    const fromPagesNode = createElement('span', 'class', 'pagination__info')
    const warnMessageNode = createElement('span', 'class', 'pagination__warn_hide')

    previousPageBtnNode.setAttribute('id', 'previousPage')
    nextPageBtnNode.setAttribute('id', 'nextPageBtn')
    fromPagesNode.setAttribute('id', 'fromPages')
    warnMessageNode.setAttribute('id', 'warnMessage')

    currentPageNode.innerText = currentPage + 1
    countOfPagesNode.innerText = '99'
    fromPagesNode.innerText = 'from'
    warnMessageNode.innerText = 'Sorry, only from 1 to 99 pages are available'

    const inputPageNum = createInputPageNum()

    paginationBlockNode.append(previousPageBtnNode)
    paginationBlockNode.append(currentPageNode)
    paginationBlockNode.append(fromPagesNode)
    paginationBlockNode.append(inputPageNum)
    paginationBlockNode.append(countOfPagesNode)
    paginationBlockNode.append(nextPageBtnNode)
    paginationBlockNode.append(warnMessageNode)

    paginationBlockNode.addEventListener('click', onPaginationUsed)

    return paginationBlockNode
}
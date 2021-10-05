import { createElement } from "../utils/utils.js"
import { variables } from "../variables.js"
import { showContent } from "../app.js"

const onInputPage = ({ target }) => {
    const fromPages = document.getElementById('fromPages')
    target.setAttribute('class', 'pagination__input_hide')
    fromPages.setAttribute('class', 'pagination__info')

    const pageNum = +target.value - 1
    if (pageNum < 0 || pageNum > 98 || isNaN(pageNum)) return

    variables.currentPage = pageNum
    showContent(`shows?page=${variables.currentPage}`)
}

const onPaginationUsed = ({ target }) => {
    if (target.id === 'fromPages') {
        const inputPage = document.getElementById('inputPage')
        target.setAttribute('class', 'pagination__info_hide')
        inputPage.setAttribute('class', 'pagination__input')
        
    } else if (target.id === 'nextPageBtn') {
        if (variables.currentPage >= 98) return
        variables.currentPage += 1
        showContent(`shows?page=${variables.currentPage}`)
        
    } else if (target.id === 'previousPage') {
        if (variables.currentPage <= 0) return
        variables.currentPage -= 1
        showContent(`shows?page=${variables.currentPage}`)
    }
}

const createInputPageNum = () => {
    const inputPageNum = createElement('input', 'class', 'pagination__input_hide')
    inputPageNum.setAttribute('type', 'number')
    inputPageNum.setAttribute('id', 'inputPage')
    
    inputPageNum.addEventListener('change', onInputPage)
    inputPageNum.addEventListener('blur', onInputPage)

    return inputPageNum
}

export const createPagination = () => {
    const paginationBlock = createElement('div', 'class', 'pagination')
    const previousPageBtn = createElement('button', 'class', 'pagination__btn')
    const nextPageBtn = createElement('button', 'class', 'pagination__btn')
    const currentPage = createElement('span', 'class', 'pagination__info')
    const countOfPages = createElement('span', 'class', 'pagination__info')
    const fromPages = createElement('span', 'class', 'pagination__info')

    previousPageBtn.setAttribute('id', 'previousPage')
    nextPageBtn.setAttribute('id', 'nextPageBtn')
    fromPages.setAttribute('id', 'fromPages')


    currentPage.innerText = variables.currentPage + 1
    countOfPages.innerText = '99'
    fromPages.innerText = 'from'

    const inputPageNum = createInputPageNum()

    paginationBlock.append(previousPageBtn)
    paginationBlock.append(currentPage)
    paginationBlock.append(fromPages)
    paginationBlock.append(inputPageNum)
    paginationBlock.append(countOfPages)
    paginationBlock.append(nextPageBtn)


    paginationBlock.addEventListener('click', onPaginationUsed)

    return paginationBlock
}
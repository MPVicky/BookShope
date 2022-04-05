'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var booksContainer = document.querySelector('.books-container')

    var imgsName = books.map(book => book.title.split(' ').join('-'))

    var strHtml = books.map((book, idx) => `
    <tr>
    <td>
    <img onerror="this.src='img/new-book.PNG'" src="img/${imgsName[idx]}.PNG" alt="${book.title}" />
    </td>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${formatCurrency(book.price)}</td>
    <td class="actions">
       <button onclick="onRead('${book.id}')" class="book-${book.id}" data-trans="read">read</button>
    </td>
    <td data-book="${book.id}" class="actions book-${book.id}">
      <button onclick="onUpdateClick(event, this, '${book.id}')" class="book-${book.id}" data-trans="update">update</button>
  </td>
   <td class="actions">
       <button onclick="onDeleteBook('${book.id}')" class="book-${book.id}" data-trans="delete">delete</button>
   </td>
   </tr>
    `)

    booksContainer.innerHTML = strHtml.join('')
}

function onChangeRate(isAddBtn) {
    var elRateTitle = document.querySelector('.modal .rate')
    var elRateCount = document.querySelector('.rating .ratePoints')
    var rate = changeRate(isAddBtn)
    elRateTitle.innerText = rate
    elRateCount.innerText = rate
}


function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    renderBooks()
}

function onAddBook(elValues, ev) {
    ev.preventDefault()
    var title = ev.target[0].value
    var price = ev.target[1].value
    addBook(title, price)
    renderBooks()
    ev.target[0].value = ''
    ev.target[1].value = ''
}

function onUpdateClick(ev, bookId) {

    ev.preventDefault()
    var strHtml = `<form>
    <label class="update-price book-${bookId}">add new price</label>
    <input onchange="onUpdatePrice(true, event, this, '${bookId}')"
     type="number" class="update-price book-${bookId}" name="update-price" min="99" max="250"
    />
    <button onclick="onUpdatePrice(false, event, this,'${bookId}')" class="update-price cancel book-${bookId}">X</button>
    </form>`
    var elPriceUpdates = document.querySelector(`[data-book="${bookId}"]`)
    elPriceUpdates.innerHTML = strHtml
}

function onUpdatePrice(isUpdate, ev, elInput, bookId) {
    ev.preventDefault()
    if (isUpdate) {
        var newPrice = elInput.value
        updateBook(bookId, newPrice)
        renderBooks()
    }
    renderUpdateBtn(bookId)
}

function renderUpdateBtn(bookId) {
    var elPriceUpdates = document.querySelector(`[data-book="${bookId}"]`)
    elPriceUpdates.innerHTML = elPriceUpdates.innerHTML = `<button onclick="onUpdateClick(event, this, '${bookId}')" class="book-${bookId}">update</button>`
}

function onRead(bookId) {
    var book = getBookById(bookId)
    setCurrBook(bookId, true)
    setModal(book, true)
}

function onCloseModal() {
    setModal(null, false)
    setCurrBook(null, false)
}

function setModal(book, isOpen) {
    var elModal = document.querySelector('.modal')
    if (isOpen) {
        elModal.querySelector('.title').innerText = book.title
        elModal.querySelector('.price').innerText = formatCurrency(book.price)
        elModal.querySelector('.rate').innerText = book.rate
        elModal.querySelector('.ratePoints').innerText = book.rate
        elModal.classList.add('open')
    } else {
        elModal.classList.remove('open')
    }
}

function onSetSortBy(isTitle) {
    sortBy(isTitle)
    renderBooks()
}

function onMovePage(isNext) {
    movePage(isNext)
    getBooks()
    renderBooks()
    document.querySelector('.current-page').innerText = getPageNumber()
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    renderBooks()
    doTrans()
}
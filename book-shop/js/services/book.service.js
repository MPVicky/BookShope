'use strict'

const STORAGE_KEY = 'BooksDB';
const PAGE_SIZE = 2;

const gTitles = ['Sapiens', 'Principles', 'Zero-to-One', 'Lemonade', 'Benni Boltimor'];

var gCurrBook = null;
var gBooks;
var gTitleSortDown = false
var gPriceSortDown = false
var gPageIdx = 0

_createBooks();

function getBooks(isGlobal) {
    if (isGlobal) return gBooks
    else {
        const idx = gPageIdx * PAGE_SIZE
        var books = gBooks.slice(idx, idx + PAGE_SIZE)
        return books;
    }
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage()
}


function addBook(title, price) {
    gBooks.unshift(_createBook(title, price))
    _saveBooksToStorage()
}

function sortBy(isTitle) {
    var books = getBooks(true)
    gTitleSortDown = !gTitleSortDown
    gPriceSortDown = !gPriceSortDown

    if (isTitle) {
        books.sort((a, b) => {
            if (gTitleSortDown) {
                if (a.title < b.title) return -1
                else if (a.title > b.title) return 1
            } else {
                if (a.title < b.title) return 1
                else if (a.title > b.title) return -1
            }
            return 0
        })
    } else {
        books.sort((a, b) => {
            return gPriceSortDown ? a.price - b.price : b.price - a.price
        })
    }
    gBooks = books;
}

function changeRate(isAddBtn) {
    var book = gCurrBook
    var rate = gCurrBook.rate
    if (isAddBtn && rate < 10) rate++
    else if (!isAddBtn && rate > 0) rate--
    book.rate = rate
    renderBooks()
    return rate
}

function setCurrBook(bookId, isSet) {
    if (isSet) gCurrBook = getBookById(bookId)
    else gCurrBook = null
}

function movePage(isNext) {
    if (isNext && gPageIdx * PAGE_SIZE + 1 < gBooks.length) gPageIdx++
    else if (!isNext && gPageIdx * PAGE_SIZE - 1 >= 0) gPageIdx--
}

function getPageNumber() {
    return gPageIdx + 1
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        gTitles.forEach(title => books.push(_createBook(title)))
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _createBook(title, price) {
    if (!price) price = getRandomIntInclusive(99, 250);
    return {
        id: makeId(),
        title,
        price,
        rate: 0
    }
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

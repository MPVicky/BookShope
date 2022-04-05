'use strict'

const gTrans = {
    'h1-title': {
        en: 'Book Shop',
        es: 'librería',
        he: 'חנות ספרים'
    },
    create: {
        en: 'Create new book:',
        es: 'Crear un nuevo libro:',
        he: 'הוסף ספר :',
    },
    'book-name': {
        en: 'Book Name',
        es: 'el nombre del libro',
        he: 'שם הספר',
    },
    submit: {
        en: 'Submit',
        es: 'Confirmación',
        he: 'הוסף',
    },
    id: {
        en: 'Id',
        es: 'identificación',
        he: 'מספר מזהה',
    },
    title: {
        en: 'Title',
        es: 'título',
        he: 'כותרת'
    },
    price: {
        en: 'Price',
        es: 'precio',
        he: 'מחיר',
    },
    actions: {
        en: 'Actions',
        es: 'Acciones',
        he: 'פעולות',
    },
    read: {
        en: 'Read',
        es: 'Leer',
        he: 'קרא',
    },
    update: {
        en: 'Update',
        es: 'edición',
        he: 'ערוך',
    },
    delete: {
        en: 'Delete',
        es: 'Borrar',
        he: 'מחק'
    },
    rate: {
        en: 'Rate',
        es: 'Clasificación',
        he: 'דירוג'
    },
    desc: {
        en: 'Description:',
        es: 'Descripción:',
        he: 'תיאור:'
    }
}

var gCurrLang = 'en'


function getTrans(transKey) {
    var key = gTrans[transKey]
    if (!key) return 'UNKNOWN'
    const translate = key[gCurrLang]
    if (!translate) return key['en']
    return translate
}


function doTrans() {
    const els = document.querySelectorAll('[data-trans]')

    els.forEach(el => {
        const transKey = el.dataset.trans
        const txt = getTrans(transKey)
        el.innerText = txt
    })
}


function setLang(lang) {
    gCurrLang = lang
}


function formatCurrency(num) {
    var currCurrency
    if (gCurrLang === 'he') currCurrency = 'ILS'
    else if (gCurrLang === 'es') currCurrency = 'EUR'
    else currCurrency = 'USD'
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: currCurrency }).format(num)
}

function getCurrLang() {
    return gCurrLang
}

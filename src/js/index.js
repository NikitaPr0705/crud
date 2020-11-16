'use strict'


const locStorRadio = document.querySelector('.localstorage-radio');
const indexedDbRadio = document.querySelector('.indexedDB-radio');

const allInputs = document.querySelectorAll('.crud__input');

const list = document.querySelector('.table__nav');

const createButton = document.querySelector('.buttons__create-button');
const updateButton = document.querySelector('.buttons__update-button');
const deleteButton = document.querySelector('.buttons__delete-button');

const lsData = JSON.parse(localStorage.getItem('user-data'));
let indDB = false;


const userDataArray = []; // массив объектов (юзеров в таблице)

function clearFields() { // очистка полей после ввода
    for(let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = '';
    }
};

function putInDock(line, objArray) {
    for(let key in objArray) {
        line.innerHTML += `<div class="row-text row-text--normal-font ${key}-cell">${objArray[key]}</div>`
    }
};


function pushDataToTable(arr) {
    const userData = function() {
        this.id = arr[0].value,
        this.firstname = arr[1].value,
        this.lastname = arr[2].value,
        this.age = arr[3].value,
        this.email = arr[4].value,
        this.phone = arr[5].value
    };
    const user = new userData();
    console.log(user);
    return user;
};


createButton.addEventListener('click', () => {
        if(allInputs[0].value == '' || allInputs[1].value == '' || allInputs[2].value == '' || allInputs[3].value == '' || allInputs[4].value == '' || allInputs[5].value == '') {
        clearFields();
        alert('Some fields are empty');
        return
        }
        const person = pushDataToTable(allInputs);
        userDataArray.push(person);
        console.log(person);
        const rowLine = document.createElement('li');
        rowLine.className = 'table__list';
        putInDock(rowLine, person);
        list.append(rowLine);
        setToLocal();
        clearFields();
        console.log(userDataArray);
});


updateButton.addEventListener('click', () => {
    const user = pushDataToTable(allInputs);
    const rows = document.querySelectorAll('.table__list');

    for(let i = 0; i < userDataArray.length; i++) {
        if(userDataArray[i].id == user.id) {
            for(let key in userDataArray[i]) {
                if(user[key] !== '') {
                    userDataArray[i][key] = user[key];
                }
            }
                    rows[i + 1].innerHTML = '';
                    putInDock(rows[i + 1], userDataArray[i]);
                    setToLocal()
        }
    console.log(userDataArray);
    }
});

deleteButton.addEventListener('click', () => {
    const rows = document.querySelectorAll('.table__list');
    for(let i = 0; i < userDataArray.length; i++) {
        if(userDataArray[i].id == allInputs[0].value) {
            userDataArray.splice(i, 1);
            rows[i + 1].remove();
            console.log(userDataArray);
        }
    }
});


locStorRadio.addEventListener('click', () => {
    indDB = false;
    console.log('Locstor clicked');
  
    // putInDock();
});

function setToLocal() {
    putInDock();
    localStorage.setItem('user-data', JSON.stringify(userDataArray));
    console.log('local data was set');
}

indexedDbRadio.addEventListener('click', () => {
    console.log('INdex clicked');
    indDB = true;
    // putInDock();
})


const expenseName = document.getElementById('name');
const expenseDate = document.getElementById('date');
const expenseAmount = document.getElementById('amount');
const form = document.getElementById('textFields');
const expenseTable = document.getElementById('resultTable');
const tableTitles = document.querySelector('.titleRow');
var longRow;


//функция изменения формата даты (можно улучшить чтобы возвращался тип date)
function formatDate(x) {
    var parts = x.split("-");
    var ddMmYyyy = new String(parts[2]+'.'+parts[1]+'.'+parts[0]);
    return(ddMmYyyy);
}

function addExpense() {
    if (expenseTable.firstElementChild.firstChild != tableTitles.nextElementSibling) {
        longRow.remove();
    }    

    var newRow = expenseTable.insertRow(-1);
    var column1 = newRow.insertCell(0);
    var column2 = newRow.insertCell(1);
    var column3 = newRow.insertCell(2);
    column1.setAttribute('class', 'nameColumn');
    column2.setAttribute('class', 'dateColumn');
    column3.setAttribute('class', 'amountColumn');
    
    column1.innerHTML = expenseName.value;
    column2.innerHTML = new String (formatDate(expenseDate.value));
    column3.innerHTML = expenseAmount.value + ' руб.';
    
    expenseName.value = '';
    expenseDate.value = '';
    expenseAmount.value = '';
    expenseName.focus();

    var del = document.createElement('span');  //создаем кнопку удаления
    del.innerHTML = 'delete'; //заполняем ее значением
    del.setAttribute('class', 'material-symbols-outlined');
    newRow.insertAdjacentElement('beforeend', del)
    
    deleteRow(del);
}

function ready() {
    if (tableTitles.nextElementSibling === null) {
        longRow = expenseTable.insertRow(-1);
        longRow.setAttribute('class', 'longRow');
        var emptyMsg = longRow.insertCell(0);
        emptyMsg.setAttribute('colspan', '3');
        emptyMsg.innerHTML = '<p class="isCentered">В данный момент добавленных расходов нет, введите показатели выше и добавьте их в таблицу</p>';
    }
}

function deleteRow(y) {
    y.addEventListener('click', (event) => {
        y.parentElement.remove();
        event.stopPropagation();
        if (expenseTable.firstElementChild.firstChild != tableTitles.nextElementSibling) {
            ready();
        }
    })
}

function logSubmit(e) {
    e.preventDefault(); 
    addExpense();
}

// подсчет результата
// function calcResult() {
//     const currentDate; 
// }
// expenseTable.addEventListener('change', calcResult);

document.addEventListener("DOMContentLoaded", ready());
form.addEventListener('submit', logSubmit); //ловим событие отправки form
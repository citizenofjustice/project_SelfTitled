const noteInput = document.getElementById('noteInput');
const noteGrid = document.querySelector('.noteGrid');
const form = document.querySelector('.noteText');


//динамическое поле ввода
function elastic(element) {
    element.style.height = '5px';
    element.style.height = (element.scrollHeight)+"px";
    var currentHeight = element.style.height;   
    //отображение скроллбара
    if (currentHeight == '54px') {
        element.style.overflowY = "hidden";
    } else element.style.overflowY = "scroll";
}

//показ полной записки
function showfullNote(y) {
    //получаем и записываем текст
    var textParent = y.parentElement;
    var text = textParent.parentNode;
    var popupNote = text.querySelector('.overflow-ellipsis').innerHTML;

    //создаем подложку для всплывающего окна
    var popupDiv = document.createElement('div');
    popupDiv.setAttribute('class', 'popup');
    document.body.insertAdjacentElement('afterbegin', popupDiv);
    popupDiv.style.height = (document.body.scrollHeight)+'px';
    
    //создаем блок для всплывающего окна и заполняем его полученным текстом
    var popupContent = document.createElement('div');
    popupContent.setAttribute('class', 'popupContent');
    popupDiv.insertAdjacentElement('afterbegin', popupContent);
    popupContent.innerHTML = '<p class="popupText">' + popupNote + '</p>';

}

//обновление заголовков всех записок
function noteTitle() {
    //заносим в массив наследуемые ноды
    var grid = noteGrid.childNodes;
    //считаем количество записок
    var currentLength = noteGrid.childElementCount;
    
    //перебираем и заполняем заголовки
    for (let i = 0; i <= currentLength; i++) {
        var cN = grid[i];
        var tmp = cN.firstElementChild.nextSibling;
        let count = i + 1;
        tmp.innerHTML = 'Заметка №' + count;
    }
}

//добавление записи
function addNote() {
    //условие для зачистки уведомления об отсутствии записей
    if (noteGrid.parentElement.firstElementChild != noteGrid) {
        noteGrid.parentElement.firstElementChild.remove()
    }
    //создаем общий блок для заголовка и текста
    var newNote = document.createElement('div');
    newNote.setAttribute('class', 'tmpDiv');
    noteGrid.insertAdjacentElement('beforeend', newNote);
    noteGrid.style.padding = '20px';

    
    //создаем заголовок
    var newP = document.createElement('p');
    newNote.insertAdjacentElement('beforeend', newP);
    newP.setAttribute('class', 'title')
    newP.innerHTML = 'Заметка №'+noteGrid.childElementCount;    
    
    //создаем блок для текста
    var newDiv = document.createElement('div');
    newNote.insertAdjacentElement('beforeend', newDiv);
    
    //создаем кнопку удаления заметки
    var delButton = document.createElement('span');
    newNote.insertBefore(delButton, newP);
    delButton.setAttribute('class', 'delButton');
    delButton.innerHTML = 'X';
    
    //создаем тег текста и заполняем его значением
    var shortNote = document.createElement('p');
    shortNote.setAttribute('class', 'overflow-ellipsis');
    newDiv.insertAdjacentElement('beforeend', shortNote);
    shortNote.innerHTML = noteInput.value;
    
    //создаем блок чтобы обернуть в него кнопку
    var buttonDiv = document.createElement('div');
    newNote.insertAdjacentElement('beforeend', buttonDiv);
    buttonDiv.setAttribute('class', 'isCentered');

    //создаем кнопку
    var newButton = document.createElement('button');
    buttonDiv.insertAdjacentElement('beforeend', newButton);
    newButton.setAttribute('class', 'popupButton');
    newButton.setAttribute('onclick', 'showfullNote(this)');
    newButton.innerHTML = 'Просмотреть';

    //возврат к исходной
    noteInput.value = '';
    noteInput.style.height = '54px';
    noteInput.style.overflowY = 'hidden';
    noteInput.focus();
    
    //вызов функции для вывода сообщения об отсутствии записей
    delNote(delButton);
}

//ожидание ввода
function logSubmit(x) {
    x.preventDefault(); 
    addNote();
}

//функция вывода сообщения об отсутствии записей
function empty() {
    if (noteGrid.childNodes.length === 0) {
        var emptyMsg = document.createElement('p');
        emptyMsg.setAttribute('class', 'emptyMsg');
        noteGrid.insertAdjacentElement('beforebegin', emptyMsg);
        emptyMsg.innerHTML = 'Добавленные заметки отсутствуют, вы можете ввести их через поле выше...';
    }
}

//функция для закрытия всплывающего окна
document.body.addEventListener('click', function(event) {
    if (event.target === document.querySelector('.popup')) {
        document.querySelector('.popup').remove();
    }
}
)

//функция удаления по нажатию на элемент
function delNote(element) {
    element.addEventListener('click', (event) => {
        element.parentElement.remove();
        event.stopPropagation();
        empty();
        noteTitle();
    })
}

//выполняем после загрузки документа
document.addEventListener('DOMContentLoaded', elastic(noteInput), empty());
//выполняем после отправки
form.addEventListener('submit', logSubmit);
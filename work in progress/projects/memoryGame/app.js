//массив потомков грида
const items =  $(".grid").children();
//массив с путем картинок
var images = ['images/Rectangle1.png', 'images/Rectangle2.png', 'images/Rectangle3.png', 'images/Rectangle4.png', 'images/Rectangle5.png', 'images/Rectangle6.png', 'images/Rectangle7.png', 'images/Rectangle8.png', 'images/Rectangle9.png', 'images/Rectangle10.png', 'images/Rectangle11.png', 'images/Rectangle12.png'];
//переменная счетчика проверяемых в данный момент картинок
var counter = 0;
//переменная для запоминания предыдущей картинки
var prevImg;
//переменная счетчика попыток
var tryCount = 0;
//вызов функции рандомного заполнения картинками
rngImg();

//функция перемешивания значений массива
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

//функция заполнения грида случайнов выбранными картинками
function rngImg() {
    //создаем массив для имен картинок
    let copyCat = [];
    //цикл для удаления рандомных вариантов картинок
    for (var i = 0; i < 6; i++) {
        //случайный порядковый номер от 1 до длины массива  
        let rand = Math.random()*images.length | 0;
        //убираем один элемент массива с индексом rand 
        images.splice(rand, 1);
    }
    //заносим в массив для имен картинок копию каждой имеющейся картинки
    for (var i=0; i<images.length; i++) {
        copyCat.push(images[i], images[i]);
    }
    //перемешиваем значения массива с именами картинок
    shuffle(copyCat);
    //для всего грида заполняем потомков картинками
    for (let i=0; i < items.length; i++) {
        //создаем строку html изображения
        let image = '<img src="'+copyCat[i]+'">';
        //добавляем изображение в элемент грида
        $(items[i]).append(image);
    }
    //прячем все картинки
    $(".grid img").hide();
}

//функция проверки на наличие неоткрытых картинок 
function checkResult() {
    //создаем массив с элементами грида, содержимое которых не открыто
    let unchecked = $(".grid").children(":not(.checked)");
    //если количество этих элементов != 0 то
    if (unchecked.length != 0) {
        console.log('продолжаем поиск');
    } else {
        //выводим сообщение о том что все изображения найдены и выводим кнопку для обновления страницы
        try {
            $('.result').append('<p>Поздравляю вы нашли все парные изображения</p>');
            $('.result').append('<button class="refresh" onclick="location.reload(); return false;">Обновить</button>');
        } catch { console.log('не удалось вывести сообщение о победе'); }
    }
}

//при нажатии на элемент из потомков $(".grid")
items.on('click', function() {
    //если у этого элемента есть класс checked, то его игнорируем (checked через css не кликабелен)
    if ($(this).hasClass('checked'))
    {
        console.log('checked');
    } else {
        let currentItem = $(this);
        //указываем проверяемому элементу класс и показываем содержимое его потомков
        currentItem.addClass("checked");
        currentItem.children().show();
        //обновляем счетчик проверяемых картинок
        counter += 1;
        //если счетчик проверяемых картинок = 2
        if (counter == 2) {
            //обновляем счетчик проверок и выводим обновляем их количество
            tryCount += 1;
            try { $('.popUpText').html('<p class="try">Количество попыток = ' + tryCount + '</p>'); } catch {console.log('You have not found a match yet...')}
            //обнуляем счетчик проверяемых картинок
            counter = 0;
            //если содержимое двух проверяемых объектов совпадает то
            if (currentItem.html() == prevImg.html()) {
                //обнуляем значение предыдущего проверенного объекта
                prevImg = '';
                checkResult();
            } //если счетчик проверяемых картинок != 2
            else {
                //делаем грид не кликабельным
                $(".grid").addClass("checked");
                //выставляем задержку скрытия несовпавших картинок и убираем с них некликабельность, убираем с грида некликабельность
                setTimeout(function() {
                    currentItem.children().hide();
                    prevImg.children().hide();
                    setTimeout(function() {
                        try { $(".grid").removeClass("checked"); } catch {console.log('grid does not have checked...')}
                    }, 200);
                    try { currentItem.removeClass("checked"); } catch {console.log('currentItem does not have checked...')}
                    try { prevImg.removeClass("checked"); } catch {console.log('prevImg does not have checked...')}
                }, 1000);
            }
        } //иначе если счетчик открытых = 1 то
        else if (counter === 1) {
            //записываем в переменную предыдущий проверяемый объект
            prevImg = currentItem;
        }
    }
});
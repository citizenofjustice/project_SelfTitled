//объявление полей ввода, вывода, radioButton
const textInput = $("textarea.text");
const radioB = "input:radio[name='choice']";

//создаем невидимое поле для вывода
$('.output').append($('<textarea></textarea>', { class: 'result', readonly: 'readonly', style: 'display: none' }));

//выполнение по загрузке страницы
$(document).ready(function(){
    //динамическое текстовое поле
    function elastic(element) {
        element.on('input', function(){
            this.style.height = '1px';
            this.style.height = (this.scrollHeight + 6) + 'px'; 
        });
        
    }
    elastic(textInput);

    //функция для передачи текста
    $("button.calc").click(function(x){
        
        //текст из текстбокса
        x.preventDefault();
        let textOutput = $("textarea.result");
        textOutput.show();
        $(".output").css("display", "flex");
        //забираем текст из поля и заносим в переменную
        let text = textInput.val() + ' ';
        
        //проверка на наличеие введенных символов, если есть то приступаем к подсчету
        if (textInput.val().trim().length < 1) {
            textOutput.show();
            textOutput.val('Введите какие-либо симовлы помимо пробелов, табуляци и переноса строки.');
        } else {

        //объекты для сравнений в RegExp
        var consonantsEn = /['bcdfghjklmnpqrstvwxyz']/gmui;
        var consonantsRu = /['бвгджзйклмнпрстфхцчшщ']/gmui;
        var vowelsEn = /['aeiouy']/gmui;
        var vowelsRu = /['аяуюоеёэиы']/gmui;
        var letters = /(\p{L})/gmu;
        var symbols = /\S/gm;
        var specialCharacters = /\p{Sm}|\p{P}/gmu;
        var words = /(\p{L}+)/gmu;
        var sentence = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/gm;

        //функция подсчета
        function checkAndCount(statement, ...regExpN) {
            //функция для определения для сверки типов данных
            function analyse(regExpObj) {
                if (regExpObj === consonantsEn) {return "согласных на английском языке равно ";}
                if (regExpObj === consonantsRu) {return " и согласных на русском языке равно ";}
                if (regExpObj === vowelsEn) {return "гласных на английском языке равно ";}
                if (regExpObj === vowelsRu) {return " и гласных на русском языке равно ";}
                if (regExpObj === letters) {return "букв равно ";}
                if (regExpObj === symbols) {return "символов равно ";}
                if (regExpObj === specialCharacters) {return "спецсимволов равно ";}
                if (regExpObj === words) {return "слов равно ";}
                if (regExpObj === sentence) {return "предложений равно ";}
            }

            //если выбран соответствующий radio
            if (statement) {
                let assembledStr = '';
                //разбор аргументов функции подсчета (а именно regExp выражений)
                for (let regExp of regExpN) {
                    let matchedStr = text.match(regExp);
                    let strType = analyse(regExp);
                    //проверка на наличие совпадений введенного текста с выражение regExp
                    if (matchedStr != null) {
                        assembledStr += strType + matchedStr.length ;
                    } else { assembledStr += strType + '0 '}
                }
                //выводим текст в поле вывода
                textOutput.val("В введенном вами тексте количество " + assembledStr);
            }
        }

        //вызов функциий для подсчета при условии что выбран вариант подсчета
        if ($(radioB).is(":checked") === true) {
            checkAndCount($("#consonants").is(":checked"), consonantsEn, consonantsRu);
            checkAndCount($("#vowels").is(":checked"), vowelsEn, vowelsRu);
            checkAndCount($("#letters").is(":checked"), letters); 
            checkAndCount($("#symbols").is(":checked"), symbols);
            checkAndCount($("#specialCharacters").is(":checked"), specialCharacters);
            checkAndCount($("#words").is(":checked"), words);
            checkAndCount($("#sentence").is(":checked"), sentence);
        } else textOutput.val('Выберите вариант подсчета на панели справа')

        //возврат фокуса в текстовое поле
        textInput.focus();
        }
    })
});




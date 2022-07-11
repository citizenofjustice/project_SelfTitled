//переключение класса для адаптива
$(document).ready(function() {
    $('.burger').click(function(event) {
        $('.navBar,.burger').toggleClass('active');
        $('body').toggleClass('lock');
    });
});

//плавная прокрутка по навигации
$(".menuLink").on("click", function(e){
    e.preventDefault();
    var anchor = $(this).attr('href');
    console.log($('body').width());
    if ($('body').width() < 767) {
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top - 50
        }, 800);
    } else {
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top - 80
        }, 800);
    }
    $('.navBar,.burger').toggleClass('active');
    $('body').toggleClass('lock');
});
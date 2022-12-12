$(document).ready(() => {
  let listElements = document.querySelectorAll(".slide");
  for (var i = 0; i < listElements.length; i++) {
    // задаем элементам карусели id для использования как якорем
    listElements[i].id = "slide" + i;
    // создаем для всех элементов карусели кнопки для пролистывания и задаем им атрибуты
    const controlButton = document.createElement("a");
    controlButton.classList.add("control__slide_round");
    controlButton.setAttribute("href", "#" + listElements[i].id);
    $(".controls").append(controlButton);
  }

  $("a.control__slide_round:first").attr(
    "style",
    "background-color: rgb(90, 129, 59)"
  );
  $("a.control__slide_round").click((event) => {
    $("a.control__slide_round").attr("style", "background-color: none");
    const currentSlide = event.target;
    currentSlide.setAttribute("style", "background-color: rgb(90, 129, 59)");
  });

  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.querySelectorAll(".slide__list").forEach((slider) => {
    // обнуляем ползунок карусели
    slider.scrollLeft = 0;

    // функция для расчета необходимого смещения
    const getOffset = (element) => {
      let offset = element.offsetLeft; // передаем левое смещение относительно ближайшего родителя
      // в зависимости направления текста вправо
      if (document.dir === "rtl") {
        // из полной ширины слайда вычитаем смещение и ширину элемента
        offset = slider.offsetWidth - (offset + element.offsetWidth);
      }
      return offset;
    };

    // функция для движения карусели
    const scrollTo = (card) => {
      let offset = getOffset(card);
      const left = document.dir === "rtl" ? -offset : offset;
      const behavior = isReducedMotion ? "auto" : "smooth";
      slider.scrollTo({ left, behavior });
    };

    // обработка события клика на кнопки карусели, переход к якорю
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("control__slide_round")) {
        event.preventDefault();
        const url = new URL(event.target.href);
        const card = document.querySelector(url.hash);
        if (card) scrollTo(card);
      }
    });
  });
});

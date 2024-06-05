"use strict";



import * as devFunctions from './modules/functions.js';

//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });

}

$(function () {

    // event handlers
    $(document).on('click', function (e) {
        let $target = $(e.target);

        if ($target.hasClass('search-btn-toggler')) {
            $target.toggleClass('active');
            $(".header__search").toggleClass('search_visible')
        }

        if ($target[0].closest('.menu-toggler')) {
            $('.header').toggleClass('open-menu');
            $('body').toggleClass('lock-menu')
        }

        if ($target.hasClass('menu__arrow')) {
            $target.toggleClass('active');
            $target.next().slideToggle()
        }
    })



    // Fancybox.show([{
    //     src: "#select-language"

    // }], {
    //     dragToClose: false,
    //     closeButton: false
    // })

    $('#language-form').on('submit', function (e) {
        e.preventDefault();

        $('.header__language').text($('#language-select').val());
        Fancybox.getInstance().close();

        //submit handler

    });

    $('#location-form').on('submit', function (e) {
        e.preventDefault();

        $('.header__location').text($('#location-select option:selected').text());
        Fancybox.getInstance().close();

        //submit handler

    })


    // custom select
    function initCustomSelect($select) {
        // Создание кастомного списка
        var $customSelectContainer = $('<div>', { class: 'custom-select-container' });
        var $customSelect = $('<ul>', { id: 'custom-select-' + $select.attr('id') });
        $customSelectContainer.append($customSelect);
        $select.after($customSelectContainer);

        function renderCustomSelect() {
            if ($(window).width() < 576) {
                $customSelect.empty();
                $customSelectContainer.show();
                $select.hide();
                $select.find('option').each(function () {
                    var imgSrc = $(this).data('img-src');
                    var text = $(this).text();
                    var value = $(this).val();

                    var $li = $('<li>').attr('data-value', value).html('<img src="' + imgSrc + '" class="img-flag" /> ' + text);
                    $li.on('click', function () {
                        $select.val(value).trigger('change');
                    });
                    $customSelect.append($li);
                });
            } else {
                $customSelectContainer.hide();
                $select.show();
            }
        }

        // Первичная отрисовка
        renderCustomSelect();

        // Обработка ресайза окна
        $(window).one('resize', function () {
            renderCustomSelect();
        });
    }

    // Инициализация Select2 и кастомного селекта
    $('select').each(function () {
        var $select = $(this);
        var searchEnabled = $select.data('search') !== undefined;

        // Инициализация Select2
        $select.select2({
            templateResult: formatState,
            templateSelection: formatState,
            minimumResultsForSearch: searchEnabled ? 0 : Infinity // Отключение поиска если data-search отсутствует
        });

        // Инициализация кастомного селекта если data-list-mobile="true"
        if ($select[0].hasAttribute('data-list-mobile')) {
            initCustomSelect($select);
        }
    });

    function formatState(opt) {
        if (!opt.id) {
            return opt.text;
        }

        var optimage = $(opt.element).attr('data-img-src');
        if (!optimage) {
            return opt.text;
        } else {
            var $opt = $(
                '<span><img src="' + optimage + '" class="img-flag" /> ' + opt.text + '</span>'
            );
            return $opt;
        }
    };

    // tooltip
    $('[data-tooltip]').on('mouseenter', function () {
        var $this = $(this);
        var title = $this.attr('title');

        $this.data('title', title).removeAttr('title');

        var $tooltip = $('<div class="tooltip"></div>').text(title);
        $('body').append($tooltip);

        var offset = $this.offset();
        var tooltipWidth = $tooltip.outerWidth();
        var tooltipHeight = $tooltip.outerHeight();
        var elementWidth = $this.outerWidth();
        var elementHeight = $this.outerHeight();


        var top = offset.top + elementHeight + 5;
        var left = offset.left + (elementWidth / 2) - (tooltipWidth / 2);


        if (top + tooltipHeight > $(window).scrollTop() + $(window).height()) {
            top = offset.top - tooltipHeight - 5;
            $tooltip.addClass('open-top');
        } else {
            $tooltip.addClass('open-bottom');
        }

        if (left < 0) {
            left = 0;
        } else if (left + tooltipWidth > $(window).width()) {
            left = $(window).width() - tooltipWidth;
        }

        $tooltip.css({ top: top, left: left });
    }).on('mouseleave', function () {

        $('.tooltip').remove();
        var $this = $(this);
        var title = $this.data('title');
        $this.attr('title', title);
    });

    // sliders 
    if ($(".companies__slider").length > 0) {
        $(".companies__slider").each((function (index, slider) {

            new Swiper(slider, {
                slidesPerView: "auto",
                spaceBetween: 30,
                loop: true,
                speed: 10000,
                autoplay: {
                    delay: 1,
                    stopOnLastSlide: false,
                },

            })
        }));
    }

    if ($(".promo__slider").length > 0) {
        new Swiper('.promo__slider', {
            slidesPerView: 1,
            speed: 800,
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 8000,
                stopOnLastSlide: false,
            },
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.promo__pagination',
                clickable: true,
            },
            on: {
                init: (swiper) => {
                    let speed = swiper.params.speed;
                    let autoplaySpeed = swiper.params.autoplay.delay;
                    $(swiper.pagination.el).css('--counting-speed', (speed + autoplaySpeed) + "ms");
                }
            }
        })
    }

    if ($(".product-card__slider").length > 0) {



        let thumbsSlider = new Swiper('.product-card__thumbs', {
            slidesPerView: 3,
            spaceBetween: 20
        });

        let mainSlider = new Swiper('.product-card__slider-main', {
            slidesPerView: 1,

            pagination: {
                el: '.product-card__slider-pagination',
                clickable: true
            },
            thumbs: {
                swiper: thumbsSlider
            }

        });




    }


});











// const dateItems = document.querySelectorAll('.form__date');

// if (dateItems.length > 0) {
//     dateItems.forEach(dateItem => {

//         const datepicker = new Datepicker(dateItem, {
//             minDate: Date.now(),
//             startView: true,
//             format: 'dd.mm.yyyy',
//             todayHighlight: true,
//             inline: true,
//         });


//         const today = new Date();
//         const formattedToday = formatDate(today);
//         dateItem.value = formattedToday;

//         datepicker.setDate(today);


//         dateItem.addEventListener('keydown', function (e) {
//             if (e.key === "Enter") {
//                 datepicker.hide();
//             }
//         });

//         function formatDate(date) {
//             const day = date.getDate().toString().padStart(2, '0');
//             const month = (date.getMonth() + 1).toString().padStart(2, '0');
//             const year = date.getFullYear();
//             return `${day}.${month}.${year}`;
//         }
//     })
// }




// document.addEventListener('DOMContentLoaded', () => {








//     // event handlers

//     document.addEventListener('click', (e) => {

//         const target = e.target;


//         if (target.closest('.icon-menu') || (target.classList.contains('menu') && document.querySelector('.header').classList.contains('open-menu'))) {
//             getMenu()
//         }

//         if (target.classList.contains('banner__close')) {
//             target.closest('.banner').classList.add('banner-hidden');
//         }


//     });


//     // if (document.querySelectorAll('.form__textarea').length > 0) {
//     //     document.querySelectorAll('.form__textarea').forEach(textarea => {
//     //         let parentBlock = textarea.closest('.form__row');
//     //         let maxLengthBox = parentBlock.querySelector('.form__maxlength');

//     //         if (!maxLengthBox) return;

//     //         let maxLengthCurrent = maxLengthBox.querySelector('.form__maxlength-current');
//     //         let maxLengthTotal = maxLengthBox.querySelector('.form__maxlength-total');

//     //         textarea.addEventListener('input', (e) => updateLength(e.target, maxLengthCurrent))

//     //         updateLength(textarea, maxLengthCurrent);
//     //     });

//     //     function updateLength(textarea, currentBlock) {
//     //         const currentLength = textarea.value.length;
//     //         currentBlock.textContent = currentLength;
//     //     }
//     // }






//     //  sliders

//     if (document.querySelector('.boards__slider')) {
//         new Swiper('.boards__slider', {
//             slidesPerView: "auto",
//             spaceBetween: 12,
//             grabCursor: true,
//             navigation: {
//                 nextEl: '.boards__next',
//                 prevEl: '.boards__prev'
//             },
//         })
//     }
//     if (document.querySelector('.news__slider')) {
//         new Swiper('.news__slider', {
//             slidesPerView: 1.05,
//             spaceBetween: 19,
//             grabCursor: true,
//             navigation: {
//                 nextEl: '.news__next',
//                 prevEl: '.news__prev'
//             },
//             breakpoints: {
//                 575.98: {
//                     slidesPerView: 2.15,
//                 },
//                 1199.98: {
//                     slidesPerView: 3,
//                 }
//             }
//         })
//     }



//     // function getTabletSlider(sliderName, options) {

//     //     let init = false;
//     //     let swiper = null;

//     //     function getSwiper() {
//     //         if (window.innerWidth <= 1200) {
//     //             if (!init) {
//     //                 init = true;
//     //                 swiper = new Swiper(sliderName, options);
//     //             }
//     //         } else if (init) {
//     //             swiper.destroy();
//     //             swiper = null;
//     //             init = false;
//     //         }
//     //     }
//     //     getSwiper();
//     //     window.addEventListener("resize", getSwiper);
//     // }


//     // Fancybox.show([{
//     //     src: "#booking",
//     //     type: "inline"
//     // }]);




// })






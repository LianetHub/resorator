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
    // devFunctions.isWebp();
    // devFunctions.OS();
    // devFunctions.floatingLabels();
    // devFunctions.formSubmit();
    // devFunctions.intInputMask();




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


    // sliders 
    if ($(".promo__slider").length > 0) {
        new Swiper('.promo__slider', {
            slidesPerView: 1,
            speed: 800,
            autoHeight: true,
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


});
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






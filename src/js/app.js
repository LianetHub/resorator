"use strict";


import * as devFunctions from './modules/functions.js';
// import { Datepicker } from 'vanillajs-datepicker';



document.addEventListener('DOMContentLoaded', () => {

    devFunctions.isWebp();
    devFunctions.OS();
    devFunctions.floatingLabels();
    // devFunctions.formSubmit();
    devFunctions.intInputMask();
    // devFunctions.spollers();
    // devFunctions.select();
    devFunctions.animation();


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



    // event handlers

    document.addEventListener('click', (e) => {

        const target = e.target;


        if (target.closest('.icon-menu') || (target.classList.contains('menu') && document.querySelector('.header').classList.contains('open-menu'))) {
            getMenu()
        }

        if (target.classList.contains('banner__close')) {
            target.closest('.banner').classList.add('banner-hidden');
        }


    });


    if (document.querySelectorAll('.form__textarea').length > 0) {
        document.querySelectorAll('.form__textarea').forEach(textarea => {
            let parentBlock = textarea.closest('.form__row');
            let maxLengthBox = parentBlock.querySelector('.form__maxlength');

            if (!maxLengthBox) return;

            let maxLengthCurrent = maxLengthBox.querySelector('.form__maxlength-current');
            let maxLengthTotal = maxLengthBox.querySelector('.form__maxlength-total');

            textarea.addEventListener('input', (e) => updateLength(e.target, maxLengthCurrent))

            updateLength(textarea, maxLengthCurrent);
        });

        function updateLength(textarea, currentBlock) {
            const currentLength = textarea.value.length;
            currentBlock.textContent = currentLength;
        }
    }






    function getMenu() {
        document.querySelector('.header').classList.toggle('open-menu');
        devFunctions.toggleLocking();
    }


    // function getIndexInParent(node) {
    //     var children = node.parentNode.childNodes;
    //     var num = 0;
    //     for (var i = 0; i < children.length; i++) {
    //         if (children[i] == node) return num;
    //         if (children[i].nodeType == 1) num++;
    //     }
    //     return -1;
    // }

    //  sliders

    if (document.querySelector('.boards__slider')) {
        new Swiper('.boards__slider', {
            slidesPerView: "auto",
            spaceBetween: 12,
            grabCursor: true,
            navigation: {
                nextEl: '.boards__next',
                prevEl: '.boards__prev'
            },

            // breakpoints: {
            //     1199.98: {
            //         slidesPerView: 3,
            //     }
            // }
        })
    }
    if (document.querySelector('.news__slider')) {
        new Swiper('.news__slider', {
            slidesPerView: 1.05,
            spaceBetween: 19,
            grabCursor: true,
            navigation: {
                nextEl: '.news__next',
                prevEl: '.news__prev'
            },
            breakpoints: {
                575.98: {
                    slidesPerView: 2.15,
                },
                1199.98: {
                    slidesPerView: 3,
                }
            }
        })
    }



    // function getTabletSlider(sliderName, options) {

    //     let init = false;
    //     let swiper = null;

    //     function getSwiper() {
    //         if (window.innerWidth <= 1200) {
    //             if (!init) {
    //                 init = true;
    //                 swiper = new Swiper(sliderName, options);
    //             }
    //         } else if (init) {
    //             swiper.destroy();
    //             swiper = null;
    //             init = false;
    //         }
    //     }
    //     getSwiper();
    //     window.addEventListener("resize", getSwiper);
    // }


    // Fancybox.show([{
    //     src: "#booking",
    //     type: "inline"
    // }]);




})


if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });




}


// slideToggle

HTMLElement.prototype.slideToggle = function (duration, callback) {
    if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
    } else {
        _s(this, duration, callback);
    }
};

HTMLElement.prototype.slideUp = function (duration, callback) {
    _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {

    if (typeof duration === 'undefined') duration = 400;
    if (typeof isDown === 'undefined') isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    var elStyles = window.getComputedStyle(el);

    var elHeight = parseFloat(elStyles.getPropertyValue('height'));
    var elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
    var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
    var elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
    var elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));

    var stepHeight = elHeight / duration;
    var stepPaddingTop = elPaddingTop / duration;
    var stepPaddingBottom = elPaddingBottom / duration;
    var stepMarginTop = elMarginTop / duration;
    var stepMarginBottom = elMarginBottom / duration;

    var start;

    function step(timestamp) {

        if (start === undefined) start = timestamp;

        var elapsed = timestamp - start;

        if (isDown) {
            el.style.height = (stepHeight * elapsed) + "px";
            el.style.paddingTop = (stepPaddingTop * elapsed) + "px";
            el.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
            el.style.marginTop = (stepMarginTop * elapsed) + "px";
            el.style.marginBottom = (stepMarginBottom * elapsed) + "px";
        } else {
            el.style.height = elHeight - (stepHeight * elapsed) + "px";
            el.style.paddingTop = elPaddingTop - (stepPaddingTop * elapsed) + "px";
            el.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
            el.style.marginTop = elMarginTop - (stepMarginTop * elapsed) + "px";
            el.style.marginBottom = elMarginBottom - (stepMarginBottom * elapsed) + "px";
        }

        if (elapsed >= duration) {
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.marginTop = "";
            el.style.marginBottom = "";
            el.style.overflow = "";
            if (!isDown) el.style.display = "none";
            if (typeof callback === 'function') callback();
        } else {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

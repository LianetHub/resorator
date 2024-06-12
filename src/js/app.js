"use strict";


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
            // $(".mobile-search").toggleClass('search_visible');
            // $('body').toggleClass('lock-search')
        }

        if ($target[0].closest('.menu-toggler')) {
            $('.header').toggleClass('open-menu');
            $('body').toggleClass('lock-menu')
        }

        if ($target.hasClass('menu__arrow')) {
            $target.toggleClass('active');
            $target.next().slideToggle()
        }

        if ($target.hasClass('product-card__info-more')) {
            $target.toggleClass('active');
            $target.prev().toggleClass('full');
            if ($target.hasClass('active')) {
                $target.text('Свернуть');
            } else {
                $target.text('Развернуть храктеристики');
            }
        }
        if ($target.hasClass('product-card__desc-more')) {
            $target.toggleClass('active');
            $target.next().slideToggle()
            if ($target.hasClass('active')) {
                $target.text('Свернуть');
            } else {
                $target.text('Развернуть описание');
            }
        }

        if ($target.hasClass('catalog__filters-spoller')) {
            $target.toggleClass('active');
            $target.next().slideToggle();
        }

        if ($target.hasClass('btn-all-products')) {
            $target.toggleClass('active');
            let $productWrapper = $target.closest('.product-card__products');
            if ($target.hasClass('active')) {
                $target.find('span').text('Свернуть');
            } else {
                $target.find('span').text('Развернуть');
            }
            toggleAllProducts($productWrapper);
        }


        if ($target.hasClass('catalog__filters-more')) {
            $target.toggleClass('active');
            $target.prev().slideToggle()
            if ($target.hasClass('active')) {
                $target.find('span').text('Скрыть все');
            } else {
                $target.find('span').text('Показать все');
            }
        }

        if ($target.hasClass('catalog-filter-btn')) {
            $('.catalog__sidebar').toggleClass('visible');
            $('body').toggleClass('lock-catalog-filter')
        }

        if ($target.hasClass('about__services-caption')) {
            $target.toggleClass('active');
            $target.next().slideToggle();
        }

    });


    function toggleAllProducts($productWrapper) {
        let $controls = $productWrapper.find('.product-card__contorls');
        let $productSlider = $productWrapper.find('.product-card__items');
        let sliderData = productSliders.find(s => s.slider === $productSlider[0]);


        if (sliderData) {
            if (sliderData.swiper.destroyed) {

                console.log("Re-initializing Swiper");

                $controls.removeClass('hidden');
                $productSlider.removeClass('destroyed');

                let prev = $productWrapper.find('.product-card__prev')[0];
                let next = $productWrapper.find('.product-card__next')[0];
                let pagination = $productWrapper.find('.product-card__pagination')[0];

                sliderData.swiper = new Swiper($productSlider[0], {
                    slidesPerView: 6,
                    spaceBetween: 20,
                    pagination: {
                        el: pagination,
                        type: "fraction",
                        renderFraction: function (currentClass, totalClass) {
                            return `Страница <span class="${currentClass}"></span> из <span class="${totalClass}"></span>`;
                        }
                    },
                    navigation: {
                        nextEl: next,
                        prevEl: prev
                    },
                    breakpoints: {
                        1199.98: {
                            slidesPerView: 4,
                        },
                        1399.98: {
                            slidesPerView: 6,
                        }
                    }
                });

            } else {

                console.log("Destroying Swiper");

                $controls.addClass('hidden');
                $productSlider.addClass('destroyed');

                sliderData.swiper.destroy(true, true);
            }
        }
    }


    // Fancybox.show([{
    //     src: "#mobile-search"


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

        var $customSelectContainer = $('<div>', { class: 'custom-select-container' });
        var $customSelect = $('<ul>', { id: 'custom-select-' + $select.attr('id') });
        $customSelectContainer.append($customSelect);
        $select.after($customSelectContainer);


        var searchInputName = $select.attr('name') + '-search';
        var $searchInput = $('input[name="' + searchInputName + '"]');


        function renderCustomSelect(filter = '') {
            $customSelect.empty();
            $select.find('option').each(function () {
                var text = $(this).text();
                var value = $(this).val();
                var imgSrc = $(this).data('img-src');

                if (text.toLowerCase().includes(filter.toLowerCase())) {
                    var $li;
                    if (imgSrc) {
                        $li = $('<li>').attr('data-value', value).html('<img src="' + imgSrc + '" class="img-flag" /> ' + text);
                    } else {
                        $li = $('<li>').attr('data-value', value).text(text);
                    }

                    if ($select.val() === value) {
                        $li.addClass('selected');
                    }
                    $li.on('click', function () {
                        $select.val(value).trigger('change');
                        $customSelect.find('li').removeClass('selected');
                        $li.addClass('selected');
                    });
                    $customSelect.append($li);
                }
            });
        }


        renderCustomSelect();


        $(window).on('resize', function () {
            renderCustomSelect();
        });


        if ($searchInput.length > 0) {
            $searchInput.on('input', function () {
                var searchTerm = $(this).val().toLowerCase();
                renderCustomSelect(searchTerm);
            });
        }
    }

    $('select').each(function () {
        var $select = $(this);
        var searchEnabled = $select.data('search') !== undefined;

        $select.select2({
            templateResult: formatState,
            templateSelection: formatState,
            minimumResultsForSearch: searchEnabled ? 0 : Infinity
        });

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

    if ($(".product__labels").length > 0) {
        $(".product__labels").each((function (index, slider) {

            new Swiper(slider, {
                slidesPerView: "auto",
                speed: 800,
                grabCursor: true,
                spaceBetween: 10,
            })
        }));

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

    let productSliders = [];
    if ($(".product-card__products").length > 0) {

        $(".product-card__products").each(function (index, section) {
            let slider = $(section).find('.product-card__items');
            let prev = $(section).find('.product-card__prev');
            let next = $(section).find('.product-card__next');
            let pagination = $(section).find('.product-card__pagination');

            let swiper = new Swiper(slider[0], {
                slidesPerView: 6,
                spaceBetween: 20,
                pagination: {
                    el: pagination[0],
                    type: "fraction",
                    renderFraction: function (currentClass, totalClass) {
                        return `Страница <span class="${currentClass}"></span> из <span class="${totalClass}"></span>`;
                    }
                },
                navigation: {
                    nextEl: next[0],
                    prevEl: prev[0]
                },
                breakpoints: {
                    1199.98: {
                        slidesPerView: 4,
                    },
                    1399.98: {
                        slidesPerView: 6,
                    }
                }
            });

            productSliders.push({ slider: slider[0], swiper: swiper });

        })

    }

    if ($('.about__navbar').length > 0) {
        new Swiper('.about__navbar', {
            slidesPerView: "auto",
            spaceBetween: 80
        })
    }

    // range slider

    const rangeFilters = $('.catalog__filters-price');

    if (rangeFilters.length > 0) {
        rangeFilters.each(function () {
            const rangeSlider = $(this).find('.catalog__filters-range')[0];
            const startInput = $(this).find('.form__input_start');
            const endInput = $(this).find('.form__input_end');
            const inputs = [startInput, endInput];
            const form = $(this).closest('form');
            const resetButton = form.find('button[type="reset"]');

            function formatNumber(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }

            function parseNumber(value) {
                return parseInt(value.replace(/\s/g, ''));
            }

            function updateMaxLength(input) {
                const maxLength = parseInt(input.attr('maxlength'));
                const numLength = maxLength - Math.floor((maxLength - 1) / 4);
                input.attr('maxlength', numLength);
            }

            updateMaxLength(startInput);
            updateMaxLength(endInput);

            startInput.val(formatNumber(startInput.val()));
            endInput.val(formatNumber(endInput.val()));

            noUiSlider.create(rangeSlider, {
                start: [parseNumber(startInput.val()), parseNumber(endInput.val())],
                connect: true,
                step: 1000,
                // margin: 1000,
                range: {
                    'min': [parseInt(startInput.attr('min'))],
                    'max': [parseInt(endInput.attr('max')) || 1000000]
                }
            });

            rangeSlider.noUiSlider.on('update', function (values, handle) {
                inputs[handle].val(formatNumber(Math.round(values[handle])));
            });

            rangeSlider.noUiSlider.on('start', function (values, handle) {
                inputs[handle].addClass('active');
            });

            const setRangeSlider = (i, value) => {
                let arr = [null, null];
                arr[i] = parseNumber(value);
                rangeSlider.noUiSlider.set(arr);
            };

            $.each(inputs, function (index, input) {
                $(input).on('change', function (e) {
                    setRangeSlider(index, $(this).val());
                });
            });

            $.each(inputs, function (index, input) {
                $(input).on('input', function (e) {
                    let value = $(this).val();
                    value = value.replace(/[^\d]/g, '');
                    $(this).val(formatNumber(value));
                    $(this).addClass('active');
                });
            });

            if (resetButton.length > 0) {
                resetButton.on('click', function () {
                    setTimeout(function () {

                        startInput.val(formatNumber(startInput[0].defaultValue));
                        endInput.val(formatNumber(endInput[0].defaultValue));

                        rangeSlider.noUiSlider.set([parseNumber(startInput[0].defaultValue), parseNumber(endInput[0].defaultValue)]);

                    }, 0);
                });
            }
        });
    }




    // input mask telephone russia
    var phoneInputs = document.querySelectorAll('input[type="tel"]');

    var getInputNumbersValue = function (input) {
        return input.value.replace(/\D/g, '');
    }
    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {

                input.value = inputNumbersValue;
                return;
            }
        }
    }
    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {

            if (e.data && /\D/g.test(e.data)) {

                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {

        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }




    // $.validator.addMethod("onlyletters", function (value, element) {
    //     return !/[\d!@#$%^&*(),.?":{}|<>]/.test(value);
    // }, "Поле не должно содержать цифры");

    // $.validator.addMethod("intlTelInputValid", function (value, element) {
    //     var iti = window.intlTelInputGlobals.getInstance(element);
    //     return this.optional(element) || iti.isValidNumber();
    // }, "Пожалуйста, введите корректный номер телефона");

    // push 
    $('input[name="push"]').on('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });


    // validation fields
    $.validator.addMethod("phoneRU", function (value, element) {
        return this.optional(element) || /^(8|\+7) \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
    }, "");


    if ($('[data-validation-form]').length > 0) {


        $('[data-validation-form]').each(function () {

            $(this).validate({
                rules: {

                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: true,
                        phoneRU: true
                    },
                    push: {
                        required: true,
                        minlength: 4,
                        maxlength: 4,
                        digits: true
                    }

                },
                messages: {
                    email: {
                        required: "Это поле необходимо заполнить.",
                        email: "Пожалуйста, введите корректный адрес электронной почты."
                    },
                    phone: {
                        required: "Это поле необходимо заполнить."
                    },
                    push: {
                        required: "Это поле необходимо заполнить.",
                        minlength: "Код должен содержать 4 цифры.",
                        maxlength: "Код должен содержать 4 цифры.",
                        digits: "Пожалуйста, введите только цифры."
                    }
                },
                showErrors: function (errorMap, errorList) {

                    this.defaultShowErrors();

                    $.each(errorList, function (index, error) {
                        if (error.method === "phoneRU") {
                            $(error.element).next('label.error').addClass('hidden');
                        }
                    });

                    $.each(this.currentElements, function (index, element) {
                        if ($(element).hasClass('error') && $(element).attr('name') === 'phone' && $(element).val() === '') {
                            $(element).next('label.error').removeClass('hidden');
                        }
                    });
                }

            });
        });


        function checkFormValidity(form) {

            if (form.valid()) {
                form.find("button[type='submit']").removeAttr('disabled');
            } else {
                form.find("button[type='submit']").attr('disabled', 'disabled');
            }
        }

        $('[data-validation-form] input, [data-validation-form] select, [data-validation-form] textarea').on('keyup change', function () {

            checkFormValidity($(this).closest('form'));
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






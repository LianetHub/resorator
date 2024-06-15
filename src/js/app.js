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

        // open mobile menu
        if ($target[0].closest('.menu-toggler')) {
            $('.header').toggleClass('open-menu');
            $('body').toggleClass('lock-menu')
        }

        // open menu 2 lvl
        if ($target.hasClass('menu__arrow')) {
            $target.toggleClass('active');
            $target.next().slideToggle()
        }

        // get visible full characteristics product - product page
        if ($target.hasClass('product-card__info-more')) {
            $target.toggleClass('active');
            $target.prev().toggleClass('full');
            if ($target.hasClass('active')) {
                $target.text('Свернуть');
            } else {
                $target.text('Развернуть характеристики');
            }
        }

        // get visible full description product - product page
        if ($target.hasClass('product-card__desc-more')) {
            $target.toggleClass('active');
            $target.next().slideToggle()
            if ($target.hasClass('active')) {
                $target.text('Свернуть');
            } else {
                $target.text('Развернуть описание');
            }
        }

        // category spoller in filter on catalog page
        if ($target.hasClass('catalog__filters-spoller')) {
            $target.toggleClass('active');
            $target.next().slideToggle();
        }

        // toggle slider to grid on product page
        if ($target.hasClass('btn-all-products')) {
            $target.toggleClass('active');
            let $productWrapper = $target.closest('.product-card__products');
            if ($target.hasClass('active')) {
                $target.find('span').text('Свернуть');
            } else {
                $target.find('span').text('Развернуть');
                $('html, body').animate({
                    scrollTop: $target.closest('.product-card__products').offset().top - 20
                }, 0);
            }
            toggleAllProducts($productWrapper);
        }

        // get visible all checkboxes in filter on catalog page
        if ($target.hasClass('catalog__filters-more')) {
            $target.toggleClass('active');
            $target.prev().slideToggle();
            if ($target.hasClass('active')) {
                $target.find('span').text('Скрыть все');
            } else {
                $target.find('span').text('Показать все');
            }
        }

        // get visible catalog on mobile - catalog page
        if ($target.hasClass('catalog-filter-btn')) {
            $('.catalog__sidebar').toggleClass('visible');
            $('body').toggleClass('lock-catalog-filter')
        }

        // spoller services - on about page
        if ($target.hasClass('about__services-caption')) {
            $target.toggleClass('active');
            $target.next().slideToggle();
        }

        // product open all filters on mobile
        if ($target.hasClass('product-card__filters-more')) {
            $target.toggleClass('active');
            $target.prev().toggleClass('active')
        }

        // product filter products
        if ($target.hasClass('product-card__filter')) {

            $target.addClass('active').siblings().removeClass('active');

            let $productWrapper = $target.closest('.product-card__products');
            let filterClass = $target.data('filter');
            if (filterClass) {

                filterProducts($productWrapper, filterClass);
            }

            // close filters on mobile
            $target.parent().removeClass('active').next().removeClass('active');
        }

        // add to cart in product-card
        if ($target.hasClass('product-card__cart') || $target.hasClass('product__cart')) {
            let $cartActions = $target.next();
            $target.addClass('hidden');
            $cartActions.removeClass('hidden');
            $cartActions.find('.quantity-block__input').val(1);
        }

        // decrement quantity block
        if ($target.hasClass('quantity-block__down')) {
            let $input = $target.siblings('.quantity-block__input');
            let currentValue = parseInt($input.val(), 10);
            if (currentValue > 0) {
                $input.val(currentValue - 1);
                if (currentValue - 1 === 0) {
                    let $cartActions = $target.parent().parent();


                    $cartActions.addClass('hidden');
                    $cartActions.prev().removeClass('hidden');
                }
            }
        }

        // increment quantity block
        if ($target.hasClass('quantity-block__up')) {
            let $input = $target.siblings('.quantity-block__input');
            let currentValue = parseInt($input.val(), 10);
            $input.val(currentValue + 1);
        }

        // get visible color palette on product page
        if ($target.hasClass('product-card__info-color')) {
            $('.product-card__side-main').addClass('hidden');
            $('.product-card__footer').addClass('hidden');
            $('.product-card__colors').removeClass('hidden');
            $('.product-card__save-colors').removeClass('hidden');
            $('.product-card__sizes').addClass('hidden');
            $('.product-card__save-sizes').addClass('hidden');
        }

        // get visible size choising on product page
        if ($target.hasClass('product-card__info-size')) {
            $('.product-card__side-main').addClass('hidden');
            $('.product-card__footer').addClass('hidden');
            $('.product-card__colors').addClass('hidden');
            $('.product-card__save-colors').addClass('hidden');
            $('.product-card__sizes').removeClass('hidden');
            $('.product-card__save-sizes').removeClass('hidden');
        }

        // get default state side on product page
        if ($target.hasClass('product-card__save-colors') || $target.hasClass('product-card__back') || $target.hasClass('product-card__save-sizes')) {
            $('.product-card__side-main').removeClass('hidden');
            $('.product-card__footer').removeClass('hidden');
            $('.product-card__colors').addClass('hidden');
            $('.product-card__save-colors').addClass('hidden');
            $('.product-card__sizes').addClass('hidden');
            $('.product-card__save-sizes').addClass('hidden');
        }

        // accordion on delivery page
        if ($target.hasClass('delivery__accordion-btn')) {
            $target.toggleClass('active');
            $target.next().slideToggle()
        }

        // get visible category block
        if ($target[0].closest('.goods__sidebar-link')) {
            e.preventDefault();

            let $link = $target.closest('.goods__sidebar-link');

            if (!$link.hasClass('active')) {
                let targetId = $link.attr('href');

                $('.goods__sidebar-link').removeClass('active');
                $link.addClass('active');

                $('.goods__sidebar-categories').slideUp();
                $link.next('.goods__sidebar-categories').slideDown();

                if ($('.goods__category').length > 0) {
                    $('.goods__category').removeClass('active');
                    $(targetId).addClass('active');
                }


            }
        }

        // copy btn
        if ($target.hasClass('btn-copy')) {
            var textToCopy = $target.prev().text();

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(function () {
                    showTooltip($target);
                }).catch(function (err) {
                    console.error('Ошибка при копировании: ', err);
                });
            } else {
                var textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showTooltip($target);
                } catch (err) {
                    console.error('Ошибка при копировании: ', err);
                }
                document.body.removeChild(textArea);
            }
        }

        // add active state product cart actions
        if ($target.hasClass('product__action') && $target[0].tagName.toLowerCase() === 'button') {
            $target.toggleClass('active')
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

                let prev = $productWrapper.find('.product-card__prev');
                let next = $productWrapper.find('.product-card__next');
                let pagination = $productWrapper.find('.product-card__pagination');

                sliderData.swiper = new Swiper($productSlider[0], {
                    slidesPerView: 2,
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
                        767.98: {
                            slidesPerView: 3,
                        },
                        991.98: {
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

    function filterProducts($productWrapper, filterClass) {
        let $productSlider = $productWrapper.find('.product-card__items');
        let slides = $productSlider[0].swiper.slides;

        slides.forEach(slide => {
            $(slide).removeClass('filter-slide-active');

            if ($(slide).hasClass(filterClass)) {
                $(slide).addClass('filter-slide-active');
            }
        });
        $productSlider[0].swiper.update()


    }

    function showTooltip($element) {

        $element.html('<span class="tooltip">Скопировано</span>');

        setTimeout(function () {
            $element.html("");
        }, 1000);
    }


    // change grid layout
    if ($('[name="views"]').length > 0) {

        $('[name="views"]').on('change', function (e) {
            let $target = $(e.target);
            if ($target.val() == 'rows' && $target[0].checked) {
                $('.catalog__grid').addClass('row-layout');
                $('.brands__grid').addClass('hidden');
                $('.brands__list').removeClass('hidden');
            } else {
                $('.catalog__grid').removeClass('row-layout');
                $('.brands__list').addClass('hidden');
                $('.brands__grid').removeClass('hidden');
            }

        });
    }

    // quantity block input handler
    $('.quantity-block__input').on('blur', function () {
        let $input = $(this);
        if (parseInt($input.val(), 10) < 1 || isNaN(parseInt($input.val(), 10))) {
            $input.val(1);
        }
    });

    // get visible alphabet nav on brand page
    $('[name="alphabet"]').on('change', function (e) {
        if (e.target.checked) {
            $('.brands__alphabet').removeClass('hidden');
        } else {
            $('.brands__alphabet').addClass('hidden');
        }
    });


    // observer height change in product car side
    if ($('.product-card__side').length > 0) {

        function setSideProductHeight() {

            var $sideProduct = $('.product-card__side');
            var $infoList = $('.product-card__info-list');
            var $content = $('.product-card__content');

            var sideProductHeight = $sideProduct.height();
            var offsetTop = $infoList.offset().top - $content.offset().top;
            var adjustedHeight = sideProductHeight - offsetTop;

            $(':root').css('--side-product-height', adjustedHeight + 'px');
        }

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                setSideProductHeight();
            });
        });


        var config = {
            attributes: true,
            attributeFilter: ['style'],
            subtree: true
        };

        var sideProduct = document.querySelector('.product-card__side');

        observer.observe(sideProduct, config);

        setSideProductHeight();
    }



    // Fancybox.show([{
    //     src: "#product-fast"


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
            width: '100%',
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

        $(".product-card__slider").each((function (index, slider) {

            let thumbsBlock = slider.querySelector('.product-card__thumbs');
            let mainBlock = slider.querySelector('.product-card__slider-main');
            let paginationBlock = slider.querySelector('.product-card__slider-pagination')

            let thumbsSlider = new Swiper(thumbsBlock, {
                slidesPerView: 3,
                spaceBetween: 20,
                breakpoints: {
                    575.98: {
                        slidesPerView: 3,
                    },
                    767.98: {
                        slidesPerView: 2,
                    },
                    991.98: {
                        slidesPerView: 3,
                    }
                }
            });

            let mainSlider = new Swiper(mainBlock, {
                slidesPerView: 1,

                pagination: {
                    el: paginationBlock,
                    clickable: true
                },
                thumbs: {
                    swiper: thumbsSlider
                }

            });

        }))






    }

    let productSliders = [];
    if ($(".product-card__products").length > 0) {

        $(".product-card__products").each(function (index, section) {
            let slider = $(section).find('.product-card__items');
            let prev = $(section).find('.product-card__prev');
            let next = $(section).find('.product-card__next');
            let pagination = $(section).find('.product-card__pagination');

            let swiper = new Swiper(slider[0], {
                slidesPerView: 1.45,
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
                    575.98: {
                        slidesPerView: 2,
                    },
                    767.98: {
                        slidesPerView: 3,
                    },
                    991.98: {
                        slidesPerView: 4,
                    },
                    1399.98: {
                        slidesPerView: 6,
                    }
                }
            });

            productSliders.push({ slider: slider[0], swiper: swiper });

            // sliders.each(function (index, slider) {
            //     console.log(slider);

            //     let swiper = new Swiper(slider, {
            //         slidesPerView: 1.45,
            //         spaceBetween: 20,
            //         pagination: {
            //             el: pagination[0],
            //             type: "fraction",
            //             renderFraction: function (currentClass, totalClass) {
            //                 return `Страница <span class="${currentClass}"></span> из <span class="${totalClass}"></span>`;
            //             }
            //         },
            //         navigation: {
            //             nextEl: next[0],
            //             prevEl: prev[0]
            //         },
            //         breakpoints: {
            //             575.98: {
            //                 slidesPerView: 2,
            //             },
            //             767.98: {
            //                 slidesPerView: 3,
            //             },
            //             991.98: {
            //                 slidesPerView: 4,
            //             },
            //             1399.98: {
            //                 slidesPerView: 6,
            //             }
            //         }
            //     });

            //     productSliders.push({ slider: slider, swiper: swiper });
            // })


        })

    }

    if ($('.about__navbar').length > 0) {
        new Swiper('.about__navbar', {
            slidesPerView: "auto",
            spaceBetween: 80
        })
    }

    if ($('.product-card__colors-slider').length > 0) {
        new Swiper('.product-card__colors-slider', {
            slidesPerView: 4,
            spaceBetween: 20,
            watchOverflow: true,
            pagination: {
                el: '.product-card__colors-pagination',
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                    return `Страница <span class="${currentClass}"></span> из <span class="${totalClass}"></span>`;
                }
            },
            navigation: {
                nextEl: '.product-card__colors-next',
                prevEl: '.product-card__colors-prev'
            },
            grid: {
                fill: 'column',
                rows: 2,
            },
            breakpoints: {
                575.98: {
                    slidesPerView: 6,
                    grid: {
                        fill: 'column',
                        rows: 2,
                    },
                },
                767.98: {
                    slidesPerView: 4,
                    grid: {
                        fill: 'column',
                        rows: 2,
                    },
                },
                991.98: {
                    slidesPerView: 5,
                    grid: {
                        fill: 'column',
                        rows: 2,
                    },
                },
                1399.98: {
                    slidesPerView: 4,
                    grid: {
                        fill: 'column',
                        rows: 2,
                    },
                }
            }
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


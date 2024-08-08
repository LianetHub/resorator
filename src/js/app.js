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

        // open mobile menu - about page
        if ($target[0].closest('.about-navbar-toggler')) {
            $('.about__navbar').toggleClass('open-menu');
            $('body').toggleClass('lock-menu');
        }

        // close mobile menu - about page
        if ($target.is('.about__navbar-link') || $target.is('.about__navbar')) {
            $('.about__navbar').removeClass('open-menu');
            $('body').removeClass('lock-menu');
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
                    if ($target[0].closest('.cart__item')) {
                        $input.val(1);
                        return
                    }
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
            $('.product-card__side').removeClass('fade-in-out');
            $('.product-card__side').addClass('fade-in-out');
            setTimeout(() => {
                $('.product-card__side').removeClass('fade-in-out')
                $('.product-card__side-main').addClass('hidden');
                $('.product-card__footer').addClass('hidden');
                $('.product-card__colors').removeClass('hidden');
                $('.product-card__save-colors').removeClass('hidden');
                $('.product-card__sizes').addClass('hidden');
                $('.product-card__save-sizes').addClass('hidden');
            }, 300)

        }

        // get visible size choising on product page
        if ($target.hasClass('product-card__info-size')) {
            $('.product-card__side').removeClass('fade-in-out');
            $('.product-card__side').addClass('fade-in-out');
            setTimeout(() => {
                $('.product-card__side').removeClass('fade-in-out')
                $('.product-card__side-main').addClass('hidden');
                $('.product-card__footer').addClass('hidden');
                $('.product-card__colors').addClass('hidden');
                $('.product-card__save-colors').addClass('hidden');
                $('.product-card__sizes').removeClass('hidden');
                $('.product-card__save-sizes').removeClass('hidden');
            }, 300)

        }

        // get default state side on product page
        if ($target.hasClass('product-card__save-colors') || $target.hasClass('product-card__back') || $target.hasClass('product-card__save-sizes')) {
            $('.product-card__side').removeClass('fade-in-out');
            $('.product-card__side').addClass('fade-in-out');
            setTimeout(() => {
                $('.product-card__side').removeClass('fade-in-out')
                $('.product-card__side-main').removeClass('hidden');
                $('.product-card__footer').removeClass('hidden');
                $('.product-card__colors').addClass('hidden');
                $('.product-card__save-colors').addClass('hidden');
                $('.product-card__sizes').addClass('hidden');
                $('.product-card__save-sizes').addClass('hidden');
            }, 300)

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

                if ($('.goods__sidebar-title').length > 0) {
                    $('.goods__sidebar-title').text($link.text().trim())
                }
            } else {
                $link.removeClass('active');
                $link.next('.goods__sidebar-categories').slideUp();
            }
        }

        // get sidebar on tablet - categories page
        if ($target.hasClass('goods__sidebar-filter')) {
            $target.toggleClass('active');
            $('.goods__sidebar-content').slideToggle()
        }

        // get all subcategories - goods page
        if ($target.is('.goods__more')) {
            $target.toggleClass('active');
            $target.prev().toggleClass('active');
            if ($target.hasClass('active')) {
                $target.text('Скрыть');
            } else {
                $target.text('Показать все');
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

            // confirmation of removal from favorites
            if ($target.is('[data-favorite]') && $target.hasClass('active')) {

                let $currentProduct = $target.closest('.product');
                let $parent = $target.closest('.product__actions');
                let $removeBlock = $target.siblings('.product__remove').clone(true, true);
                let originalRemoveBlock = $target.siblings('.product__remove');

                $currentProduct.addClass('confirm-remove');

                let currentInstance = Fancybox.show([{
                    src: $removeBlock[0],
                    type: "html",
                    dragToClose: false,
                    closeButton: false
                }]);

                currentInstance.on('close', function () {
                    $removeBlock.remove();
                    $currentProduct.removeClass('confirm-remove');
                    $parent.append(originalRemoveBlock);
                });

                return;
            }
            $target.toggleClass('active');
        }

        // remove from favorite list
        if ($target.is('[data-remove-favorite]')) {
            $('.product.confirm-remove').remove()
            Fancybox.getInstance().close()

        }

        // underline filters animation line
        if ($target.is('[data-underline-filter]')) {
            var $filtersContainer = $target.closest('[data-underline-filters]');
            var $activeFilter = $filtersContainer.find('[data-underline-filter].active');
            $activeFilter.removeClass('active');
            $target.addClass('active');
            moveUnderline($target);
        }

        // remove product from cart - cart page
        if ($target.is('.cart__item-delete')) {
            $target.closest('.cart__item').remove();
        }

        // close profit sale - cart page
        if ($target.is('.btn-profit-cart')) {
            $target.toggleClass('closed');
            $target.parent('.cart__sidebar-row').next('.cart__sidebar-profits').slideToggle()
        }

        // cart purchase tabs
        if ($target.is('.purchase__tab')) {
            $('.purchase__content').eq($target.index()).addClass('active').siblings().removeClass('active');
            if ($target.index() + 1 === 1) {
                $('.cart__sidebar-btn').attr('href', '#order-individual');
            } else {
                $('.cart__sidebar-btn').attr('href', '#order-entity');
            }

        }

        // catalog tabs
        if ($target[0].closest('.catalog__tab')) {
            $('.catalog__tabs-block').eq($target.closest('.catalog__tab').index()).addClass('active').siblings().removeClass('active');
        }

        // form tabs
        if ($target.is('.form__tab-btn')) {
            $('.form__tab-content').eq($target.index()).addClass('active').siblings().removeClass('active');
        }

        // open all filter compare page
        if ($target.is('.compare__filters-arrow')) {
            $target.toggleClass('active');
            $target.parent().toggleClass('full-mobile')
        }

        // open all filter compare page
        if ($target.is('.compare__filter')) {
            $('.compare__filters-arrow').removeClass('active');
            $target.parent().removeClass('full-mobile')
        }

        // contact page tabs
        if ($target.is('.contacts__tab-btn')) {
            $target.addClass('active').siblings().removeClass('active');
            $(".contacts__tabs-content.active").addClass('fade-out');
            setTimeout(() => {
                $('.contacts__tabs-content').eq($target.index()).addClass('active').siblings().removeClass('active').removeClass('fade-out');
            }, 500)
        }


        // get visible all vacancies  on contacts page
        if ($target[0].closest('.contacts__vacancies-more')) {
            $target.closest('.contacts__vacancies-more').toggleClass('active');
            $target.closest('.contacts__vacancies-more').prev().toggleClass('active');
            if ($target.closest('.contacts__vacancies-more').hasClass('active')) {
                $target.closest('.contacts__vacancies-more').find('span').text('Скрыть все');
            } else {
                $target.closest('.contacts__vacancies-more').find('span').text('Показать больше вакансий');
            }
        }

        // get visible all vacancies  on contacts page
        if ($target[0].closest('.contacts__offices-more')) {
            $target.closest('.contacts__offices-more').toggleClass('active');
            $target.closest('.contacts__offices-more').prev().toggleClass('active');
            if ($target.closest('.contacts__offices-more').hasClass('active')) {
                $target.closest('.contacts__offices-more').find('span').text('Скрыть все');
            } else {
                $target.closest('.contacts__offices-more').find('span').text('Показать больше офисов');
            }
        }

        // get full info vacancy
        if ($target.is('.contacts__vacancies-btn')) {
            $target.closest('.contacts__vacancies').toggleClass('open-vacancy');
            $target.closest('.contacts__card').toggleClass('active');
        }

        // get full info office
        if ($target.is('.contacts__offices-btn')) {
            $target.closest('.contacts__offices').toggleClass('open-office');
            $target.closest('.contacts__card').toggleClass('active');
        }

        // get full team items - about page
        if ($target[0].closest('.about__team-more')) {
            $target.closest('.about__team-more').toggleClass('active');
            if (window.innerWidth < 576) {
                toggleDestroyTeamSlider()
            }
            $target.closest('.about__team-more').prev().toggleClass('active');
            if ($target.closest('.about__team-more').hasClass('active')) {
                $target.closest('.about__team-more').find('span').text('Скрыть');
            } else {
                $target.closest('.about__team-more').find('span').text('Вся команда');
            }
        }

        // get full cities items - about page
        if ($target[0].closest('.about__geography-more')) {
            $target.closest('.about__geography-more').toggleClass('active');
            $target.closest('.about__geography-more').prev().toggleClass('active');
            if ($target.closest('.about__geography-more').hasClass('active')) {
                $target.closest('.about__geography-more').find('span').text('Скрыть');
            } else {
                $target.closest('.about__geography-more').find('span').text('Всe города');
            }
        }

        // get visiblie bid form - leasing page
        if ($target.is('.leasing__side-btn') || $target.is('.leasing__side-back')) {
            $('.leasing__side-main').toggleClass('hidden');
            $('.leasing__side-bid').toggleClass('hidden');
        }

        // open all filter works page
        if ($target.is('.works__filters-arrow')) {
            $target.toggleClass('active');
            $target.parent().toggleClass('full-mobile')
        }

        // open all filter works page
        if ($target.is('.works__filter')) {
            $('.works__filters-arrow').removeClass('active');
            $target.parent().removeClass('full-mobile')
        }

        // bind category direction in modal form
        if ($target.is('.about__directions-link')) {
            bindCategoryInModal($target, '.about__directions-name');
        }

        // bind category circle in modal form
        if ($target[0].closest('.about__services-item')) {
            bindCategoryInModal($target.closest('.about__services-item'), '.about__services-caption');
        }

        // open modal on click map point about page
        if ($target.is('.map-point')) {
            Fancybox.show([{
                src: "#callback",
                dragToClose: false,
                closeButton: false
            }]);

        }

        // open search form
        if ($target.is('.search__btn')) {
            getVisibleSearchForm()
        }

        // delete search query
        if ($target.is('.search__queries-delete')) {
            $target.closest('.search__queries-item').remove()
        }


        // tabs complex page
        if ($target.is('.complex__tab-btn')) {
            $target.addClass('active').siblings().removeClass('active');
            $target.closest('.complex__tabs').next('.complex__tab-content').find('.complex__tab-block').eq($target.index()).addClass('active fade').siblings().removeClass('active fade');
        }


        if ($target.is('.complex__btn')) {
            $target.addClass('active').siblings().removeClass('active');
            $target.closest('.complex__btns').next('.complex__options').find('.complex__option').eq($target.index()).addClass('active fade').siblings().removeClass('active fade');
        }


        // get visible password
        if ($target.is('.btn-toggle-pass')) {
            $target.toggleClass('active');
            if ($target.hasClass('active')) {
                $target.prev().attr('type', 'text');
            } else {
                $target.prev().attr('type', 'password');
            }
        }

        // get visible add address form - LK
        if ($target.is('.btn-add-address')) {
            $('.lk__card-form').toggleClass('hidden').prev('.btn-add-address').toggleClass('hidden');
        }

    });


    if ($('.search__form-input').length > 0) {
        $('.search__form-input').on("focus", function () {
            getVisibleSearchForm()
        });
    }

    if ($('.search__input').length > 0) {
        $('.search__input').on("input", function (e) {
            if ($(e.target).val().length > 0) {
                $('.search__results').slideDown()
            } else {
                $('.search__results').slideUp()
            }
        });
    }


    if ($('.about__geography-item').length > 0) {
        $('.about__geography-item').on('mouseenter', function (e) {
            let currentPlace = $(e.target).text();
            let currentPlaceMark = $(`.map-point[title="${currentPlace}"]`);


            if (currentPlaceMark.length > 0) {
                currentPlaceMark.trigger('mouseenter').addClass('hover');
            }
        })
        $('.about__geography-item').on('mouseleave', function (e) {


            $('.map-point').trigger('mouseleave').removeClass('hover');
        })
    }

    function getVisibleSearchForm() {
        Fancybox.show([{
            src: "#search",
            dragToClose: false,
            closeButton: false
        }]);
    }

    function bindCategoryInModal($target, categorySelector) {
        let currentInstance = Fancybox.getInstance();
        let currentCategory = $target.find(categorySelector).text().trim();

        let $input = null;

        currentInstance.on('done', function () {
            let currentForm = $(currentInstance.container).find('.popup__form');
            $input = $('<input type="hidden" name="theme-mail"/>').val(currentCategory);
            currentForm.append($input);
        });

        currentInstance.on('close', function () {
            $('[name="theme-mail"]').remove();
        });
    }

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
        let slides = $productSlider[0].querySelectorAll('.filter-slide');

        slides.forEach(slide => {
            $(slide).removeClass('filter-slide-active');

            if ($(slide).hasClass(filterClass)) {
                $(slide).addClass('filter-slide-active');
            }
        });

        if ($productSlider[0].swiper) {
            $productSlider[0].swiper.update()
        }


    }

    function showTooltip($element) {

        $element.html($element.html() + '<span class="tooltip">Скопировано</span>');

        setTimeout(function () {
            $element.find('.tooltip').remove();
        }, 1000);
    }

    function moveUnderline($element) {
        var $filtersContainer = $element.closest('[data-underline-filters]');
        var left = $element.position().left;
        var width = $element.is(':visible') ? $element.outerWidth() : getHiddenElementWidth($element);

        $filtersContainer.css({
            '--underline-left': left + 'px',
            '--underline-width': width + 'px'
        });
    }

    function getHiddenElementWidth($element) {
        let $clone = $element.clone().css({
            visibility: 'hidden',
            display: 'block',
            position: 'absolute'
        }).appendTo('body');
        let width = $clone.width();
        $clone.remove();
        return width;
    }

    function toggleDestroyTeamSlider() {

        let $slider = $('.about__team-content');
        if ($slider.length == 0) return;


        if ($slider[0].swiper) {
            console.log("Destroying Swiper");
            $slider.addClass('destroyed')
            $slider[0].swiper.destroy(true, true);


        } else {

            console.log("Re-initializing Swiper");
            $slider.removeClass('destroyed')
            getMobileSlider('.about__team-content', {
                slidesPerView: 1.4,
                spaceBetween: 10,
                grabCursor: true,
            })
        }
    }

    // init underline filters line
    if ($('[data-underline-filters]').length > 0) {

        $('[data-underline-filters]').each(function () {
            var $activeFilter = $(this).find('[data-underline-filter].active');
            setTimeout(() => {
                $('[data-underline-filters]').addClass('init');
            }, 300)
            if ($activeFilter.length) {
                moveUnderline($activeFilter);
            }
        });
    }
    $(document).on('mouseover', '[data-underline-filter]', function (e) {
        let $target = $(e.target);
        if ($target.is('[data-underline-filter]')) {
            moveUnderline($target);
        }
    });


    $(document).on('mouseout', '[data-underline-filter]', function (e) {
        let $target = $(e.target);
        if ($target.is('[data-underline-filter]')) {
            var $filtersContainer = $target.closest('[data-underline-filters]');
            var $activeFilter = $filtersContainer.find('[data-underline-filter].active');
            if ($activeFilter.length) {
                moveUnderline($activeFilter);
            }
        }
    });



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
            $('.brands__alphabet').addClass('active');
        } else {
            $('.brands__alphabet').removeClass('active');
        }
    });

    // get visible search results
    if ($('[data-search]').length > 0) {

        $('[data-search]').on('focus', function (e) {
            $('[data-search]').closest('.form__field').next('.form__results').slideDown();
        })
        $('[data-search]').on('blur', function (e) {
            $('[data-search]').closest('.form__field').next('.form__results').slideUp();
        })

    }



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

    });

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
        var $color = $(this).data('tooltip');


        $this.data('title', title).removeAttr('title');

        var $tooltip = $(`<div class="tooltip ${$color}"></div>`).text(title);
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

        })

    }

    if ($('.contacts__tabs').length > 0) {
        new Swiper('.contacts__tabs', {
            slidesPerView: "auto",
            spaceBetween: 10
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

    if ($('.compare__items').length > 0) {
        let compareItemsSlider = new Swiper('.compare__items', {
            slidesPerView: "auto",
            spaceBetween: 20,
            watchOverflow: true,
            pagination: {
                el: '.compare__pagination',
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                    return `Страница <span class="${currentClass}"></span> из <span class="${totalClass}"></span>`;
                }
            },
            navigation: {
                nextEl: '.compare__next',
                prevEl: '.compare__prev'
            },

        });

        let tableCellsArr = [];
        $('.compare__table').each(function () {
            let compareTableSlider = new Swiper(this, {
                slidesPerView: "auto",
                grabCursor: true,
                scrollbar: {
                    el: '.compare__table-scrollbar',
                    draggable: true,
                },
            });
            tableCellsArr.push(compareTableSlider)
        })

        bindSwipers(compareItemsSlider, ...tableCellsArr);



        function bindSwipers(...swiperList) {
            for (const swiper of swiperList) {
                swiper.setTranslate = function (translate, byController, doNotPropagate) {
                    if (doNotPropagate) {
                        Swiper.prototype.setTranslate.apply(this, arguments);
                    } else {
                        for (const swiper of swiperList) {
                            swiper.setTranslate(translate, byController, true);
                        }
                    }
                };
                swiper.setTransition = function (duration, byController, doNotPropagate) {
                    if (doNotPropagate) {
                        Swiper.prototype.setTransition.apply(this, arguments);
                    } else {
                        for (const swiper of swiperList) {
                            swiper.setTransition(duration, byController, true);
                        }
                    }
                };
            }
        }

    }

    if ($(".blog__item-images").length > 0) {
        $(".blog__item-images").each((function (index, slider) {


            let paginationBlock = $(slider).find('.blog__pagination');

            new Swiper(slider, {
                slidesPerView: 1,
                grabCursor: true,

                pagination: {
                    el: paginationBlock[0],
                    clickable: true
                }
            });

        }));
    }

    if ($(".contacts__card-slider").length > 0) {
        $(".contacts__card-slider").each((function (index, slider) {

            let paginationBlock = $(slider).find('.contacts__card-pagination');

            new Swiper(slider, {
                slidesPerView: 1,
                pagination: {
                    el: paginationBlock[0],
                    clickable: true
                }
            });

        }));
    }

    if ($('.about__team-content').length > 0) {

        getResponsiveSlider('.about__team-content', {
            slidesPerView: 1.4,
            spaceBetween: 10,
            grabCursor: true,
        }, null, 576.98)
    }

    if ($('.delivery__companies').length > 0) {

        getResponsiveSlider('.delivery__companies', {
            slidesPerView: "auto",
            loop: true,
            speed: 10000,
            autoplay: {
                delay: 1,
                stopOnLastSlide: false,
            },
        }, 991.98, null)
    }

    if ($('.work-card__gallery-slider').length > 0) {

        new Swiper('.work-card__gallery-slider', {
            slidesPerView: "auto",
            spaceBetween: 20,
            navigation: {
                nextEl: '.work-card__gallery-next',
                prevEl: '.work-card__gallery-prev'
            },
            pagination: {
                el: '.work-card__gallery-pagination',
                clickable: true
            }
        })
    }

    if ($('.blog-article__images.swiper').length > 0) {

        $(".blog-article__images.swiper").each((function (index, slider) {
            new Swiper(slider, {
                slidesPerView: 1,
                spaceBetween: 20,
                watchOverflow: true,
                pagination: {
                    el: slider.querySelector('.blog-article__images-pagination'),
                    clickable: true
                },
                breakpoints: {
                    575.98: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    767.98: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    }
                }
            })
        }));

    }

    if ($(".complex__slider").length > 0) {

        $(".complex__slider").each(function (index, slider) {

            let prev = $(slider).find('.complex__prev');
            let next = $(slider).find('.complex__next');
            let pagination = $(slider).find('.complex__pagination');
            let options = {
                watchOverflow: true,
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

            }

            if ($(slider).hasClass('complex__slider_lg')) {

                let swiper = new Swiper(slider, {
                    ...options,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    breakpoints: {
                        479.98: {
                            slidesPerView: 1.45,
                        },
                        575.98: {
                            slidesPerView: 2,
                        },
                        991.98: {
                            slidesPerView: 3,
                        },
                        1199.98: {
                            slidesPerView: 4,
                        }
                    }
                });
            } else {
                let swiper = new Swiper(slider, options);
            }




        })

    }




    function getResponsiveSlider(sliderName, options, minWidth, maxWidth) {
        let init = false;
        let swiper = null;

        function getSwiper() {
            if ((window.innerWidth >= minWidth || minWidth === null) &&
                (window.innerWidth <= maxWidth || maxWidth === null)) {
                if (!init) {
                    init = true;
                    swiper = new Swiper(sliderName, options);
                }
            } else if (init) {
                swiper.destroy();
                swiper = null;
                init = false;
            }
        }

        getSwiper();
        window.addEventListener("resize", getSwiper);
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

    // range input
    const rangeInputs = $('.range__input');
    if (rangeInputs.length > 0) {

        rangeInputs.each((index, rangeInput) => {
            getInputRangePrecent(rangeInput);
            $(rangeInput).on('input', (e) => {
                getInputRangePrecent(e.target);

            })

        })
    };

    function getInputRangePrecent(rangeInput) {
        let currentPrecent = ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
        $(rangeInput).css('--precent', `${currentPrecent}%`)
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

    // counting animation - about page
    const $counters = $('[data-counter]');

    if ($counters.length > 0) {
        const animationDuration = 3000;
        $counters.each(function () {
            const $section = $(this);

            const callback = function (entries, counterObserver) {
                if (entries[0].isIntersecting) {
                    if (!$section.hasClass('animated')) {
                        counter($section);
                    }
                    $section.addClass('animated');
                }
            };

            const counterObserver = new IntersectionObserver(callback);
            counterObserver.observe(this);
        });

        function counter($counter) {
            let countFinish = +$counter.text().replace(/\s+/g, '');
            $counter.parent().css('min-width', $counter.parent().width());
            $counter.text("0");



            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / animationDuration, 1);

                const target = countFinish;
                const count = progress * target;

                $counter.text(numberWithCommas(Math.ceil(count)));

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    $counter.text(numberWithCommas(target));

                    $counter.parent().css('min-width', '');
                }
            };

            requestAnimationFrame(updateCounter);
        }

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }





});


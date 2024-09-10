function initStickySidebar() {
    if ($(window).width() >= 768) {
        if (!$('.catalog__sidebar').data('sticky-init')) {
            $('.catalog__sidebar').data('sticky-init', true);
            $('.catalog__sidebar').stickySidebar({
                topSpacing: 16,
                bottomSpacing: 16,
                containerSelector: '.container',
                resizeSensor: true
            });
        }
    } else {
        if ($('.catalog__sidebar').data('sticky-init')) {
            $('.catalog__sidebar').stickySidebar('destroy');
            $('.catalog__sidebar').removeData('sticky-init');
        }
    }
}

$(window).on('resize', initStickySidebar);
initStickySidebar()

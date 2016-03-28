/* ========================================================================
 * Omega: theme.js
 * Main Theme Javascript file
 * ========================================================================
 * Copyright 2014 Oxygenna LTD
 * ======================================================================== */

'use strict';

// ignore camel case because it breaks jshint for vars from php localisation
/* jshint camelcase: false */

/* global jQuery: false, skrollr: false, Odometer: false, paceOptions: false, Pace: false, Waypoint: false */

// If script is not localized apply defaults

var oxyThemeData = oxyThemeData || {
    navbarHeight : 100,
    navbarScrolled : 70,
    navbarScrolledPoint : 200,
    menuClose : 'off',
    scrollFinishedMessage : 'No more items to load.',
    hoverMenu : {
        hoverActive : false,
        hoverDelay : 1,
        hoverFadeDelay : 200
    },
    siteLoader: 'on'
};

window.paceOptions = {
    startOnPageLoad: oxyThemeData.siteLoader === 'on',
    restartOnRequestAfter: false
};
// Loading Slabtext on window load to make sure fonts are loaded
jQuery(window).on('load', function () {
    jQuery( '.bigtext' ).bigtext(
        {
            minfontsize: 16
        });
});

jQuery(document).ready(function( $ ) {
    // Parallax Scrolling - on desktops only
    // ======================
    if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
        skrollr.init({
            forceHeight: false
        });
    } else {
        // Assign the 'oxy-agent' class when not assigned by PHP - for the html Version
        // ======================
        $('body:not([class*="oxy-agent-"])').addClass('oxy-agent-');
        if((/iPhone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
            $('body').not('.oxy-agent-iphone').addClass('oxy-agent-iphone');
        }
        if((/iPad/i).test(navigator.userAgent || navigator.vendor || window.opera)){
            $('body').not('.oxy-agent-ipad').addClass('oxy-agent-ipad');
        }
    }

    var isMobile = !$('body:not([class*="oxy-agent-"])').length;

    // Flexslider Init
    // ======================

    function flexInit( element ) {
        // We use data atributes on the flexslider items to control the behaviour of the slideshow
        var slider = $(element),

        //data-slideshow: defines if the slider will start automatically (true) or not
        sliderShow = slider.attr('data-flex-slideshow') === 'false' ? false : true,

        //data-flex-animation: defines the animation type, slide (default) or fade
        sliderAnimation = !slider.attr('data-flex-animation') ? 'slide' : slider.attr('data-flex-animation'),

        //data-flex-speed: defines the animation speed, 7000 (default) or any number
        sliderSpeed = !slider.attr('data-flex-speed') ? 7000 : slider.attr('data-flex-speed'),

        //data-flex-sliderdirection: defines the slide direction
        direction = !slider.attr('data-flex-sliderdirection') ? 'horizontal' : slider.attr('data-flex-sliderdirection'),

        //data-flex-duration: defines the transition speed in milliseconds
        sliderDuration = !slider.attr('data-flex-duration') ? 600 : slider.attr('data-flex-duration'),

        //data-flex-directions: defines the visibillity of the nanigation arrows, hide (default) or show
        sliderDirections = slider.attr('data-flex-directions') === 'hide' ? false : true,

        //data-flex-controls: defines the visibillity of the nanigation controls, hide (default) or show
        sliderControls = slider.attr('data-flex-controls') === 'thumbnails' ? 'thumbnails' : slider.attr('data-flex-controls') === 'hide' ? false : true,

        //data-flex-controlsposition: defines the positioning of the controls, inside (default) absolute positioning on the slideshow, or outside
        sliderControlsPosition = slider.attr('data-flex-controlsposition') === 'inside' ? 'flex-controls-inside' : 'flex-controls-outside',

        //data-flex-controlsalign: defines the alignment of the controls, center (default) left or right
        sliderControlsAlign = !slider.attr('data-flex-controlsalign') ? 'flex-controls-center' : 'flex-controls-' + slider.attr('data-flex-controlsalign'),

        //data-flex-controlsalign: defines the alignment of the controls, center (default) left or right
        sliderControlsVericalAlign = !slider.attr('data-flex-controlsvertical') ? '' : 'flex-controls-' + slider.attr('data-flex-controlsvertical'),

        //data-flex-itemwidth: the width of each item in case of a multiitem carousel, 0 (default for 100%) or a nymber representing pixels
        sliderItemWidth = !slider.attr('data-flex-itemwidth') ? 0 : parseInt(slider.attr('data-flex-itemwidth'), 10),

        //data-flex-itemmax: the max number of items in a carousel
        sliderItemMax = !slider.attr('data-flex-itemmax') ? 0 : parseInt(slider.attr('data-flex-itemmax'), 0),

        //data-flex-itemmin: the max number of items in a carousel
        sliderItemMin = !slider.attr('data-flex-itemmin') ? 0 : parseInt(slider.attr('data-flex-itemmin'), 0),

            //data-flex-captionvertical: defines the horizontal positioning of the captions, left or right or alternate
        sliderCaptionsHorizontal = slider.attr('data-flex-captionhorizontal') === 'alternate' ? 'flex-caption-alternate' : 'flex-caption-' + slider.attr('data-flex-captionhorizontal');

        slider.addClass(sliderControlsPosition).addClass(sliderControlsAlign).addClass(sliderControlsVericalAlign).addClass(sliderCaptionsHorizontal);

        slider.flexslider({
            slideshow: sliderShow,
            animation: sliderAnimation,
            direction: direction,
            slideshowSpeed: parseInt(sliderSpeed),
            animationSpeed: parseInt(sliderDuration),
            itemWidth: sliderItemWidth,
            minItems: sliderItemMin,
            maxItems: sliderItemMax,
            controlNav: sliderControls,
            directionNav: sliderDirections,
            prevText: '',
            nextText: '',
            smoothHeight: true,
            useCSS : false
        });
    }

    // Flexslider Init
    $( '.flexslider[id]' ).each(function() {
        var that = this;
        $(this).imagesLoaded().done( function( instance ) {
            flexInit(that);
        });
    });

    // Portfolio Isotope
    // ======================

    function isotopeInit() {
        $('.masonry').each( function( index, element ) {
            var $container = $(element);
            var $items = $container.find( '.masonry-item' );
            var padding = $container.attr( 'data-padding' );
            var isFullWidth = $container.parents( '.container-fullwidth' ).length > 0;
            // On fullscreen portfolio add negative margin on left and right and add 4pixel upon that for the loss after rounding
            var containerPadding = -padding / 2;

            $container.css({
                margin: '0 ' + containerPadding + 'px'
            });
            $container.imagesLoaded().always( function( loadedContainer ) {
                setTimeout( function() {
                    var columns = 3,
                      screenWidth = $(window).width(),
                      wideColumns = 2,
                      sxs = $container.attr( 'data-col-sxs'),
                      xs = $container.attr( 'data-col-xs'),
                      sm = $container.attr( 'data-col-sm'),
                      md = $container.attr( 'data-col-md'),
                      lg = $container.attr( 'data-col-lg');

                    if (screenWidth < 450 && sxs) {
                        columns = sxs;
                        wideColumns = 1;
                    }
                    else if (screenWidth < 768 && xs) {
                        columns = xs;
                        wideColumns = 1;
                    }
                    else if (screenWidth < 992 && sm) {
                        columns = sm;
                        wideColumns = 1;
                    }
                    else if (screenWidth < 1200 && md) {
                        columns = md;
                        wideColumns = 2;
                    }
                    else if (screenWidth > 1200 && lg) {
                        columns = lg;
                        wideColumns = 2;
                    }

                    // calculate item width and paddings
                    var itemWidth;
                    if ( $container.hasClass( 'use-masonry' ) ) {
                        $items.each(function() {
                            // Set the masonry column width
                            itemWidth = Math.floor( $container.width() / columns );

                            var item  = $(this);
                            if( item.hasClass( 'masonry-wide' ) ) {
                                item.css( 'width', itemWidth * wideColumns );
                            }
                            else {
                                item.css( 'width', itemWidth );
                            }
                        });
                    }
                    else {
                        itemWidth = Math.floor( $container.width() / columns );
                        $items.css( 'width', itemWidth );
                    }

                    $items.find('.figure,.post-masonry-inner').css( 'padding', padding / 2 + 'px' );

                    // wait for possible flexsliders to render before rendering isotope
                    $container.isotope( {
                        itemSelector: '.masonry-item',
                        layoutMode: $container.attr( 'data-layout' ),
                        resizable: true,
                        masonry: {
                            columnWidth: itemWidth,
                            gutter: padding
                        }
                    }, function(){
                        $container.removeClass( 'no-transition' );
                        onScrollInit( $items.find( '.portfolio-os-animation' ), $container );
                        onScrollInit( $items.find( '.blog-os-animation' ), $container );
                    });
                },200);
            });
        });
    }

    // Re initialise isotope on window resize
    $(window).smartresize(function(){
        isotopeInit();
    });

    // Init the isotope
    isotopeInit();

    // Portfolio Filters
    // ======================

    $('.portfolio-filter').click( function() {
        var $button = $(this);
        var filter = $button.attr( 'data-filter' );
        var $filtersRow = $button.parents('div.row');
        $filtersRow.find( '.portfolio-title span' ).text( $button.text() );
        var $portfolio = $filtersRow.next();
        $portfolio.isotope( { filter: filter } );
    });

    $('.portfolio-order').click( function() {
        var $button = $(this);
        var order = $button.attr( 'data-value' );
        var $portfolio = $button.parents( 'div.row' ).next();
        $portfolio.isotope( { sortAscending: order === 'true' } );
    });

    $('.portfolio-sort').click( function() {
        var $button = $(this);
        var sort = $button.attr( 'data-sort' );
        var $portfolio = $button.parents('div.row').next();
        $portfolio.isotope( { sortBy: sort } );
    });

    // Theme Sections
    // ======================

    // Adjust full height sections on IOS
    $('[class*="oxy-agent-"] .section-fullheight').removeClass('section-fullheight').css('min-height', $(window).height()).find('.container, .container-fullwidth, .container > .row, .container-fullwidth > .row ').css('min-height', $(window).height()).find('.row, [class*="col-md"]').css('position', 'static');

    // fix placeholders for IE 8 & 9
    $('html.ie9').find('input, textarea').placeholder();

    // Setiing responsive videos
    $( '.video-wrapper' ).fitVids();

     // Play videos & audio
    $('audio').mediaelementplayer({
        pauseOtherPlayers: false,
        enableAutosize: false,
        setDimensions:false,
    });

    $('.section-background-video').mediaelementplayer({
        pauseOtherPlayers: false,
        enableAutosize: false,
        setDimensions:false,
        success: function(mediaElement, node, player) {
            // video tag is initially hidden ( in order to hide the poster and display the cover bg only )
            var attr = $(mediaElement).attr('poster');
            if(typeof attr !== typeof undefined && attr !== false) {
                $(mediaElement).parent().css('background-image','url(\'' + $(mediaElement).attr('poster') + '\')');
            }
            var $section = $(mediaElement).closest('section');

            // loadded data event does not trigger on ios, its dektop only
            mediaElement.addEventListener('loadeddata', function () {
                // player arg has media property filled only after loadeddata even triggers ( first frame loaded! )
                var containerHeight    = $section.outerHeight();
                var containerWidth     = $section.outerWidth();
                var playerHeight       = player.media.videoHeight;
                var playerWidth        = player.media.videoWidth;
                var aspectRatio        = ( playerHeight / playerWidth * 100 ) + '%';
                var scaleFactor        = containerWidth /playerWidth;
                var playerActualHeight = playerHeight * scaleFactor;

                $(mediaElement).parent().css('padding-bottom', aspectRatio);
                if( playerActualHeight >= containerHeight ){
                    $(mediaElement).css('top', ( containerHeight - (playerHeight * scaleFactor) )/2 );
                }
                else {
                    $(mediaElement).css('background-image', '');
                }

                $(mediaElement).show();

                $(window).smartresize(function(){
                        containerHeight    = $section.outerHeight();
                        containerWidth     = $section.outerWidth();
                        scaleFactor        = containerWidth /playerWidth;
                        playerActualHeight = playerHeight * scaleFactor;
                    if( playerActualHeight >= containerHeight ){
                        $(mediaElement).css('top', ( containerHeight - (playerHeight * scaleFactor) )/2 );
                    }
                    else {
                        $(mediaElement).css('background-image', '');
                    }
                });
            });

            if( isMobile ) {
                // if mobile show video immediately ( no loadeddata event here )
                $(mediaElement).show();
            }
            // ipad safari needs a javascript controller for the video
            if( $('body').hasClass('oxy-agent-ipad') ) {
                $section.on('click', function (e) {
                    if(mediaElement.paused) {
                        mediaElement.play();
                    }
                    else {
                        mediaElement.pause();
                    }
                });
            }
        }
    });

    // Feature List Shortcode
    // ======================

    // Feature list lines
    $('ul.features-connected').each(function() {
        var element = $(this);
        var div = $('<div class="features-connected-line"></div>').css('border-color' , element.attr('data-linecolor'));
        element.find('li').append( div );
    });

    // Countdown Shortcode
    // ======================

    $('.countdown').each(function() {
        var countdown = $(this);
        var date = countdown.attr('data-date' );
        countdown.countdown( date ).on('update.countdown', function(event) {
            $(this).find('.counter-days').html( event.offset.totalDays );
            $(this).find('.counter-hours').html( event.offset.hours );
            $(this).find('.counter-minutes').html( event.offset.minutes );
            $(this).find('.counter-seconds').html( event.offset.seconds );
        });
    });

    $('.counter').each(function() {
        var $counter = $(this);
        var $odometer = $counter.find('.odometer-counter');
        if($odometer.length > 0 ) {
            var od = new Odometer({
                el: $odometer[0],
                value: $odometer.text(),
                format: $counter.attr('data-format')
            });
            $counter.waypoint(function() {
                window.setTimeout(function() {
                    $odometer.html( $counter.attr( 'data-count' ) );
                }, 500);
            },{
                triggerOnce: true,
                offset: 'bottom-in-view'
            });
        }
    });

    // Theme Forms
    // ======================

    // Add wrapper to select boxes
    $('select').not('.country_to_state, #billing_state, #shipping_state, #calc_shipping_state').wrap('<div class="select-wrap">');


    // Calendar Widget
    // ======================

    // make WP calendar use boostrap table class
    $('#wp-calendar').addClass( 'table' );


    // Search Widget in Navbar
    // ======================

    // Add top bar functionallity
    $('.top-bar, #masthead').find('.widget_search form').wrap('<div class="top-search">');
    $('.top-search').append('<a class="search-trigger"></a><b class="search-close"></b>');
    $('body').on('click', '.top-search:not(.active) .search-trigger', function() {
        $('.top-search').toggleClass('active');
        $('#content').addClass('fade-content');
        if( $('.top-search').closest('.top-bar').length > 0 ) {
            $('#masthead').addClass('fade-content');
        }
        $('#masthead').toggleClass('search-active');
        $('.top-search').find('form').fadeToggle(300).find('input').focus();

    });
    $('body').on('click', '.top-search.active .search-trigger', function() {
        $('.top-search').toggleClass('active');
        $('#content, #masthead').removeClass('fade-content');
        $('.top-search').find('form').fadeToggle(300);
        $('#masthead').toggleClass('search-active');
    });

    // Scrolling Events
    // ======================

    // header menu changes
    var header = $('body').find('.navbar-sticky');
    if(header.length > 0) {
        // stop navbar when at top of the page
        var sticky = new Waypoint.Sticky({
            element: header[0],
            stuckClass: 'navbar-stuck'
        });
    }

    // fix for menus in content
    $('#masthead').parents('.section').css({
        'overflow': 'visible',
        'position': 'relative',
        'z-index': '1100'
    });

    // trigger the waypoint only for fixed position navbar
    var menuContainer = $('#masthead.navbar-sticky');
    if(menuContainer.length && menuContainer.hasClass('navbar-sticky')){
        // calculate menu offset in case menu is placed inside the page
        var menuOffset =  menuContainer.position().top;
        $('body').waypoint({
            offset: -( parseInt( oxyThemeData.navbarScrolledPoint ) + menuOffset ),
            handler: function(direction) {
                // add / remove scrolled class
                menuContainer.toggleClass('navbar-scrolled');
                // remove swatch class
                var prefix = 'swatch-';
                var classes = menuContainer[0].className.split(' ').filter(function(c) {
                    return c.lastIndexOf(prefix, 0) !== 0;
                });
                menuContainer[0].className = classes.join(' ');
                // add back swatch class depending on direction above / below scroll point
                // menuContainer.addClass(oxyThemeData.navbarScrolledSwatches[direction]);

                menuContainer.one('MSTransitionEnd webkitTransitionEnd oTransitionEnd transitionend', function(){
                    // refresh waypoints only once transition ends in order to get correct offsets for sections.
                    if( !menuContainer.hasClass( 'refreshing' ) ) {
                        Waypoint.refreshAll();
                    }
                    menuContainer.toggleClass('refreshing');
                });
            }
        });
    }

    $('body').waypoint({
        offset: -200,
        handler: function(direction) {
            if(direction === 'down'){
                $('.go-top').css('bottom', '12px').css('opacity', '1');
            }
            else{
                $('.go-top').css('bottom', '-44px').css('opacity', '0');
            }
        }
    });

    // Init On scroll animations
    function onScrollInit( items, trigger ) {
        items.each( function() {
            var osElement = $(this),
              osAnimationClass = osElement.attr('data-os-animation'),
              osAnimationDelay = osElement.attr('data-os-animation-delay');

            osElement.css({
                '-webkit-animation-delay':  osAnimationDelay,
                '-moz-animation-delay':     osAnimationDelay,
                'animation-delay':          osAnimationDelay
            });

            var osTrigger = ( trigger ) ? trigger : osElement;

            osTrigger.waypoint(function() {
                osElement.addClass('animated').addClass(osAnimationClass);
            },{
                triggerOnce: true,
                offset: '90%'
            });
        });
    }

    // Goto top button
    // ======================

    // Animate the scroll to top
    $('.go-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
    });


    // Bootstrap Tooltips
    // ======================

    // Function to init bootstrap's tooltip
    $('[data-toggle="tooltip"]').tooltip();


    // Bootstrap Carousel
    // ======================

    $('.carousel').carousel({
        interval: 7000
    });

    // Bootstrap Accordion Arrows
    // ======================

    // Function to fix accordion arrows
    $('.accordion-body').on('hide', function () {
        $(this).parent('.accordion-group').find('.accordion-toggle').addClass('collapsed');
    });

    // Side Menu
    $('body').on('show.bs.collapse', function () {
        if($(this).hasClass('slide-menu')) {
            $(this).addClass('slide-on');
        }
        $('.navbar-toggle').removeClass('collapsed');
    });
    $('body').on('hide.bs.collapse', function () {
        if($(this).hasClass('slide-menu')) {
            $(this).removeClass('slide-on');
        }
        $('.navbar-toggle').addClass('collapsed');
    });

    if(oxyThemeData.menuClose === 'on') {
        $('body.slide-menu').on('click', function() {
            if($(this).hasClass('slide-on')) {
                $('#navbar-slide').collapse('hide');
            }
        });
    }

    // Fix for embedded videos
    // ======================

    var frames = document.getElementsByTagName( 'iframe' );
    for( var i = 0; i < frames.length; i++ ) {
        if( frames[i].src.indexOf('?') === -1 ) {
            frames[i].src += '?wmode=opaque';
        }
        else{
            frames[i].src += '&wmode=opaque';
        }
    }

    // Icon Animations
    // ======================

    $('[data-animation]').each(function(){
        var element         = $(this);

        element.on('mouseenter', function(){
            if( element.attr('data-animation') !== 'none' ){
                element.addClass('animated ' + element.attr('data-animation'));
            }
        });

        element.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
            element.removeClass('animated ' + element.attr('data-animation'));
        });

    });


    // Isotope Infinite Scroll
    // ======================

    var $container = $('div.blog-masonry.isotope');
    if($container.length > 0){
        $container.infinitescroll({
            navSelector  : 'div.infinite-scroll',    // selector for the paged navigation
            nextSelector : 'div.infinite-scroll a',  // selector for the NEXT link (to page 2)
            itemSelector : '.masonry-item',     // selector for all items you'll retrieve
            loading: {
                finishedMsg: oxyThemeData.scrollFinishedMessage,
            },
            prefill:true
        },
            // call Isotope as a callback
            function( newElements ) {
                $(newElements).each(function(index, element){

                    // Set the masonry column width
                    var columns = 3;
                    var screenWidth = $(window).width();
                    var wideColumns = 2;
                    var padding = $container.attr( 'data-padding' );

                    if( screenWidth < 768 ) {
                        columns = $container.attr( 'data-col-xs' );
                        wideColumns = 1;
                    }
                    else if( screenWidth < 992 ) {
                        columns = $container.attr( 'data-col-sm' );
                        wideColumns =  1;
                    }
                    else if( screenWidth < 1200 ) {
                        columns = $container.attr( 'data-col-md' );
                        wideColumns =  2 ;
                    }
                    else if( screenWidth > 1200 ) {
                        columns = $container.attr( 'data-col-lg' );
                        wideColumns =  2 ;
                    }

                    var itemWidth = Math.floor( $container.width() / columns );

                    var item  = $(this);
                    if( item.hasClass( 'masonry-wide' ) ) {
                        item.css( 'width', itemWidth * wideColumns );
                    }
                    else {
                        item.css( 'width', itemWidth );
                    }
                    item.find('.post-masonry-inner').css( 'padding', padding / 2 + 'px' );
                });
                $container.isotope( 'appended', $( newElements ), function(){
                    $container.isotope( 'reLayout', function() {
                        Waypoint.refreshAll();
                    });
                });
            }
        );
    }

    // Magnific Image Popup
    // ======================

    $('.magnific').magnificPopup({
        type:'image',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });

    // Magnific Video Popup
    // ======================

    $('.magnific-youtube, .magnific-vimeo, .magnific-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        preloader: false,
        fixedContentPos: false
    });

    // Magnific Gallery Popup
    // ======================

    $('.magnific-gallery').each(function(index , value){
        var gallery = $(this);
        var galleryImages = $(this).data('links').split(',');
        var items = [];
        for(var i=0;i<galleryImages.length; i++){
            items.push({
                src:galleryImages[i],
                title:''
            });
        }
        gallery.magnificPopup({
            mainClass: 'mfp-fade',
            items:items,
            gallery:{
                enabled:true,
                tPrev: $(this).data('prev-text'),
                tNext: $(this).data('next-text')
            },
            type: 'image'
        });
    });

    $('.magnific-all').each(function() {
        var $portfolio = $(this);
        var $imageLinks = $portfolio.find('.figure-image');

        var items = [];
        $imageLinks.each(function() {
            var $item = $(this);
            var type = 'image';
            if ($item.hasClass('magnific-youtube') || $item.hasClass('magnific-vimeo')) {
                type = 'iframe';
            }
            var magItem = {
                src: $item.attr('href'),
                type: type
            };
            var title = $item.find('.figure-caption-title');
            if (title.length > 0) {
                magItem.title = $(title).text();
            }
            items.push(magItem);
        });

        $imageLinks.magnificPopup({
            mainClass: 'mfp-fade',
            items: items,
            gallery:{
                enabled:true,
                tPrev: $(this).data('prev-text'),
                tNext: $(this).data('next-text')
            },
            type: 'image',
            callbacks: {
                beforeOpen: function() {
                    var index = $imageLinks.index(this.st.el);
                    if (-1 !== index) {
                        this.goTo(index);
                    }
                }
            }
        });
    });

    // Magnific Product Popup
    // ======================

    $('.product-gallery').magnificPopup({
        delegate: 'li figcaption a',
        type: 'image',
        mainClass: 'mfp-fade',
        gallery:{
            enabled:true,
            navigateByImgClick:true
        }
    });


    // Social Icons Hover Colours
    // ======================

    $('[data-iconcolor]').each(function(){
        var element         = $(this);
        var originalColor  = $(element).css('background-color');
        var originalTextColor  = $(element).find('i').css('color');
        element.on('mouseenter', function(){
            element.css('background-color' , element.attr('data-iconcolor'));
            element.find('i').css('color' , '#ffffff');
            if (element.parents('.social-icons').hasClass('social-simple')) {
                element.find('i').css('color' , element.attr('data-iconcolor'));
            }
        });
        element.on('mouseleave', function(){
            element.css('background-color' ,originalColor);
            element.find('i').css('color' , originalTextColor);
            if (element.parents('.social-icons').hasClass('social-simple')) {
                element.find('i').css('color' , originalTextColor);
            }
        });

    });

    // Hover menu
    // ======================
    if (oxyThemeData.hoverMenu.hoverActive === true) {
        $('.navbar .dropdown').hover(function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(oxyThemeData.hoverMenu.hoverDelay).fadeIn(parseInt(oxyThemeData.hoverMenu.hoverFadeDelay));
        }, function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(oxyThemeData.hoverMenu.hoverDelay).fadeOut(parseInt(oxyThemeData.hoverMenu.hoverFadeDelay));
        });

        $('#masthead .nav li.dropdown a').on('click', function(){
            var $dropdown = $(this);
            if($dropdown.parent().hasClass('open') && ($dropdown.attr('data-link') !== undefined) ) {
                window.location = $dropdown.attr('data-link');
            }
        });
    }

});
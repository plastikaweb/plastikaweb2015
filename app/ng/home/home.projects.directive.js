(function () {
    'use strict';

    angular
      .module('app.home')
      .directive('projectsPanel', projectsPanel);

    function projectsPanel() {
        function isotopeInit() {
            $('.masonry').each(function (index, element) {
                var itemWidth,
                  $container = $(element),
                  $items = $container.find('.masonry-item'),
                  padding = $container.attr('data-padding'),
                  containerPadding = -padding / 2;

                $container.css({
                    margin: '0 ' + containerPadding + 'px'
                });
                $container.imagesLoaded().always(function () {

                    var columns = 3;
                    var screenWidth = $(window).width();

                    var wideColumns = 2;

                    if (screenWidth < 768) {
                        columns = $container.attr('data-col-xs');
                        wideColumns = 1;
                    }
                    else if (screenWidth < 992) {
                        columns = $container.attr('data-col-sm');
                        wideColumns = 1;
                    }
                    else if (screenWidth < 1200) {
                        columns = $container.attr('data-col-md');
                        wideColumns = 2;
                    }
                    else if (screenWidth > 1200) {
                        columns = $container.attr('data-col-lg');
                        wideColumns = 2;
                    }

                    // calculate item width and paddings

                    if ($container.hasClass('use-masonry')) {
                        $items.each(function () {
                            // Set the masonry column width
                            itemWidth = Math.floor($container.width() / columns);

                            var item = $(this);
                            if (item.hasClass('masonry-wide')) {
                                item.css('width', itemWidth * wideColumns);
                            }
                            else {
                                item.css('width', itemWidth);
                            }
                        });
                    }
                    else {
                        itemWidth = Math.floor($container.width() / columns);
                        $items.css('width', itemWidth);
                    }

                    $items.find('.figure,.post-masonry-inner').css('padding', padding / 2 + 'px');

                    // wait for possible flexsliders to render before rendering isotope
                    $container.isotope({
                        itemSelector: '.masonry-item',
                        sortBy: 'default',
                        layoutMode: $container.attr('data-layout'),
                        resizable: false,
                        masonry: {
                            columnWidth: itemWidth,
                            gutter: padding
                        }
                    }, function () {
                        // refresh waypoints after layout
                        Waypoint.refreshAll();
                    });

                });
            });
        }

        return {
            restrict: 'E',
            templateUrl: '../ng/directives/home-projects-panel.html',
            replace: true,
            scope: {
                projectsList: '='
            },
            link: function (scope, elements, attrs) {
                if (scope.$parent.$last) {
                    isotopeInit();
                    $(window).smartresize(function () {
                        isotopeInit();
                    });
                }

            }
        };
    }

})();
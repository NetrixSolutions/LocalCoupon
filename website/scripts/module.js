angular.module('contextDiscount', ['ngMaterial', 'ngTextTruncate', 'ngSanitize'])
    .factory('dataService', function () {
        //var streamData = {};
        var dialog;
        var companies;
        return {
            //getStreamData: function () {
            //    return streamData;
            //},
            //setStreamData: function (newStreamData) {
            //    streamData = newStreamData;
            //},
            //resetStreamData: function () {
            //    streamData = {};
            //}
            getDialog: function () {
                return dialog;
            },
            setDialog: function (newDialog) {
                dialog = newDialog;
            }
        };
    })
    .controller('MainController', function ($scope, dataService, $mdSidenav, $mdMedia, $mdDialog, $window, $log) {
        // ==============================
        // ===== General
        // ==============================
        $scope.appName = "Context Discount";

        // ==============================
        // ===== Side Nav
        // ==============================
        $scope.toggleLeft = function () {
            $mdSidenav('left').toggle()
                .then(function () {
                    $log.debug("toggle left is done");
                });
        };
        $scope.focus = function () {
            console.log("focus");
            angular.element(document.getElementById('search-icon')).addClass("focus");
        };
        $scope.blur = function () {
            console.log("unfocus");
            angular.element(document.getElementById('search-icon')).removeClass("focus");
        }

        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        $scope.typeSelected = function (offer) {
            offers = [];
            $scope.selectedTypeName = offer.name;
            $scope.selectedType = offer.shortname;
            console.log("selected: " + offer.shortname);
            if ($mdMedia('gt-md')) {
                // request for desktop
                communicator.getOffersByType(offer.shortname, undefined, offerCallback);
                $scope.moreOffersAvailable = false;
            } else {
                // request on mobile
                communicator.getOffersByType(offer.shortname, 10, offerCallback);
                $scope.moreOffersAvailable = true;
                $scope.close();
            }

            //dataService.setStreamData(offers);
        };

        $scope.cards = [
            {
                'type': 'groceries',
                'logo_url': './img/rewe_logo.png',
                'discount_text_top': '1,42',
                'discount_text_bottom': '-15%',
                'discount_text': '',
                'title': 'JA! 1kg Meat',
                subtitle: '300 m away, 5 days valid',
                'description': 'Pork, Beef - Origin: Germany - Best meat:Pork and Beef mixed for roasting or barbecuing with the wholefamily',
                'social_discount': [],
                'badge_type': '',
                'position': {
                    'lat': 0,
                    'lng': 0,
                    'maps_url': ''
                }
                ,
                'bookmarked': 'false'
            },

            {
                'type': 'groceries',
                'logo_url': './img/Kaufland.png',
                'discount_text_top': '1,98',
                'discount_text_bottom': '-33%',
                'discount_text': '',
                'title': '300g Jona Apples',
                subtitle: '200m away, 6 days valid',
                'description': 'Jona Apples from Spain. <br/> Package of 6 apples.',
                'social_discount': [],
                'badge_type': '',
                'position': {
                    'lat': 0,
                    'lng': 0,
                    'maps_url': ''
                },
                'bookmarked': 'true'
            },

            {
                'type': 'club',
                'logo_url': './img/couch-kapitaen.png',
                'discount_text_top': '',
                'discount_text_bottom': '',
                'discount_text': '2,50 &#8364;',
                'title': 'Jacky Cola...',
                'subtitle': '600m away',
                'description': '... for 2,50. All night long! #ContextDiscount',
                'social_discount': [
                    {
                        'type': 'Twitter',
                        'discount_text': '1 free for retweeting',
                        'progress': ''
                    }
                ],
                'badge_type': 'twitter',
                'position': {
                    'lat': 0,
                    'lng': 0,
                    'maps_url': ''
                },
                'bookmarked': 'false'
            },

            {
                'type': 'club',
                'logo_url': './img/the-old-firehouse-logo.gif',
                'discount_text_top': '',
                'discount_text_bottom': '',
                'discount_text': '4,50 &#8364;',
                'title': 'Cocktail Happy Hour',
                'description': 'Jumbo cocktails for 4,50',
                'social_discount': [
                    {
                        'type': 'facebook',
                        'discount_text': '1 free for recommend',
                        'progress': ''
                    }
                ],
                'badge_type': '',
                'position': {
                    'lat': 0,
                    'lng': 0,
                    'maps_url': ''
                },
                'bookmarked': 'false'
            },

            {
                'type': 'education',
                'logo_url': './img/akademie.png',
                'discount_text_top': '',
                'discount_text_bottom': '',
                'discount_text': '50%',
                'title': 'Leader Training',
                subtitle: '300m away, next training',
                'description': 'Get 50% off for the next training and become a leader!',
                'social_discount': [
                    {
                        'type': 'Xing',
                        'discount_text': 'Get 25% by subscribing',
                        'progress': ''
                    },
                    {
                        'type': 'twitter',
                        'discount_text': 'Get 25% for tweeting',
                        'progress': ''
                    }

                ],
                'badge_type': '',
                'position': {
                    'lat': 0,
                    'lng': 0,
                    'maps_url': ''
                },
                'bookmarked': 'true'
            },

            {
                'type': 'fitness',
                'logo_url': './img/Fitness_First_Logo.png',
                'discount_text_top': '',
                'discount_text_bottom': '',
                'discount_text': 'Free',
                'title': 'Milk Shake',
                subtitle: '1,5km',
                'description': 'Power hard today and burn 500 kcal.Regain your energy by one of our freshmilk shakes!',
                'social_discount': [
                    {
                        'type': 'lifelog',
                        'discount_text': 'Free Shake for 500 kcal',
                        'progress': '27'
                    }
                ],
                'badge_type': '',
                'position': {
                    'lat': 0,
                    'lng': 0,
                    'maps_url': ''
                }
                ,
                'bookmarked': 'true'
            },

            {
                'type': 'fitness',
                'logo_url': './img/Dean_and_David.png',
                'discount_text_top': '2,50',
                'discount_text_bottom': '-10%',
                'discount_text': '',
                'title': 'Caesar Fitness Salad',
                subtitle: '500m away, 3 days valid',
                'description': 'Get a reward for your activity and grab a Caesar Fitness Salad after making 2.000 steps on one day!',
                'social_discount': [
                    {
                        'type': 'lifelog',
                        'discount_text': 'Additional 5% for 2000',
                        'progress': '69'
                    }
                ],
                'badge_type': '',
                'position': {
                    'lat': 0,
                    'lng': 0,
                    'maps_url': ''
                }
                ,
                'bookmarked': 'false'
            }
        ]

    })
    //.filter('suffixFilter', function () {
    //    return function (input) {
    //        if (input.indexOf("%") == -1) {
    //            return input + " Eur";
    //        }
    //        return input;
    //    }
    //})
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('orange');
    });


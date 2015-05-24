angular.module('contextDiscount', ['ngMaterial', 'ngTextTruncate', 'ngSanitize'])
    .controller('MainController', function ($scope, $window, $log) {

        $scope.badgeIcons = {
            'twitter': 'img/twitter.png'
        };

        $scope.cards = [
            {
                'type': 'groceries',
                'logo_url': './img/rewe_logo.png',
                'discount_text_top': '1,42',
                'discount_text_bottom': 'Saving 15%',
                'discount_text': '',
                'title': 'JA! 1kg Meat',
                subtitle: '300m away, 5 days valid',
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
                'discount_text_bottom': 'Saving 33%',
                'discount_text': '',
                'title': '300g Jona Apples',
                subtitle: '200m away, 6 days valid',
                'description': 'Jona Apples from Spain. Package of 6 apples.',
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
                'discount_text': '',
                'title': 'Jacky Cola...',
                'subtitle': '600m away',
                'description': '... for 2,50. All night long! #ContextDiscount',
                'social_discount': [
                    {
                        'type': 'twitter',
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
                        'type': 'xing',
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
                'id': 'fitness_first_id',
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
                        'discount_text': 'Free Shake for 500 kcal burned',
                        'progress': '27'
                    }
                ],
                'fitness_type': 'kcal',
                'fitness_amount': 500,
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
                'id': 'dean_and_david_id',
                'type': 'fitness',
                'logo_url': './img/Dean_and_David.png',
                'discount_text_top': '2,50',
                'discount_text_bottom': 'Saving 10%',
                'discount_text': '',
                'title': 'Caesar Fitness Salad',
                subtitle: '500m away, 3 days valid',
                'description': 'Get a reward for your activity and grab a Caesar Fitness Salad after making 1.000 steps on one day!',
                'social_discount': [
                    {
                        'type': 'lifelog',
                        'discount_text': 'Additional 5% for 1.000',
                        'progress': '69'
                    }
                ],
                'fitness_type': 'steps',
                'fitness_amount': 1000,
                'badge_type': '',
                'position': {
                    'lat': 0,
                    'lng': 0,
                    'maps_url': ''
                }
                ,
                'bookmarked': 'false'
            }
        ];

        $scope.addCard = function (tweet) {
            var stripped = tweet["text"].split(" ");
            var title = stripped[0] + " " + stripped[1] + "...";
            var desc = "...";
            for (var j = 2; j < stripped.length; j++) {
                desc = desc + " " + stripped[j];
            }

            var entry = {
                'type': 'club',
                'logo_url': tweet["user"]["profile_image_url"],
                'discount_text_top': '',
                'discount_text_bottom': '',
                'discount_text': '',
                'title': title,
                'subtitle': '600m away',
                'description': desc,
                'social_discount': [
                    {
                        'type': 'twitter',
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
            }
            console.log(entry);
            $scope.cards.push(entry);
            $scope.$apply();
        }

        $scope.updateLifelogInformation = function (lifeLogDetails) {
            for (var c in $scope.cards) {
                if ($scope.cards[c].type === 'fitness') {
                    if ($scope.cards[c].fitness_type === 'steps') {
                        $scope.cards[c].social_discount.progress = (lifeLogDetails["steps"]*75 / $scope.cards[c].fitness_amount)*100;
                    }
                    else if($scope.cards[c].fitness_type === 'kcal'){
                        $scope.cards[c].social_discount.progress = (lifeLogDetails["aee"]*120 / $scope.cards[c].fitness_amount)*100;
                    }
                    $('#'+$scope.cards[c].id).width($scope.cards[c].social_discount.progress + "%");
                    console.log($scope.cards[c].social_discount.progress);
                    $scope.$apply();
                }
            }
        }

    });


angular.module('praxismarket', ['ngMaterial', 'ngTextTruncate'])
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
            //},
            setCompanies: function (newCompanies) {
                companies = newCompanies;
            },
            getCompanies: function () {
                return companies;
            },
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
        $scope.appName = "Praxis Market";

        var offerCallback = function (offers, companies) {
            //dataService.setStreamData(offers);
            if(offers.length !== 10) {
                $scope.moreOffersAvailable = false;
            } else {
                $scope.moreOffersAvailable = true;
            }

            $scope.joboffers = offers;
            $scope.companies = companies;
            $scope.$apply();
            angular.element(".card-body-text").shorten({"showChars": 440});
        };

        var pagingCallback = function (offers, companies) {
            //dataService.setStreamData(offers);
            if(offers.length < 10) {
                $scope.moreOffersAvailable = false;
            } else {
                $scope.moreOffersAvailable = true;
            }

            $scope.joboffers = $scope.joboffers.concat(offers);
            angular.extend($scope.companies,companies);
            $scope.$apply();
            angular.element(".card-body-text").shorten({"showChars": 440});
        }
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
        var offers = [];
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

        communicator.getAllOfferTypes(function (offerTypes) {
            $scope.offerTypes = offerTypes;
            $scope.$apply();
        });

        // ==============================
        // ===== Wish List
        // ==============================
        $scope.loadWishList = function () {
            communicator.getNotePad(offerCallback);
        };

        $scope.toggleNote = function(offer) {
            console.log("toggle note: " + offer.onNotepad);
            if(offer.onNotepad === true) {
                communicator.removeOfferFromNotepad(offer, function() {
                    communicator.getNotePad(offerCallback)
                });
                offer.onNotepad = false;
            } else {
                communicator.addOfferToNotepad(offer);
                offer.onNotepad = true;
            }
        }

        // ==============================
        // ===== Cards
        // ==============================
        $scope.loadMoreOffers = function () {
            var currentCardCount = $window.document.getElementsByClassName("card").length;
            var moreOffers = communicator.getMoreOffersByType($scope.selectedType, currentCardCount, pagingCallback);
            //dataService.setStreamData(dataService.getStreamData().concat(moreOffers));
        }


        //var offers = [];
        var limit = undefined;
        if (!$mdMedia('gt-md')) {
            limit = 10;
        }
        communicator.getOffersByType('thesis', undefined, offerCallback);
        $scope.selectedTypeName = 'Abschlussarbeit';
        $scope.selectedType = 'thesis';
        $scope.moreOffersAvailable = false;


        //$scope.joboffers = offers;
        //dataService.setStreamData(offers);

        $scope.showCompanyDetails = function (ev, companyId) {
            ev.stopPropagation();
            //var companies = [{
            //    'name': 'FOOBAR COMPANY',
            //    'description': 'Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum',
            //    'website': 'http://drop.social',
            //    'street': 'Philippstr. 3',
            //    'city': 'Karlsruhe',
            //    'zipcode': '12345',
            //    'numberOfEmployees': '9',
            //    'country': 'Germany',
            //    'contact': {
            //        'firstName': 'Clark',
            //        'secondName': 'Gable',
            //        'phone': '+49 12345',
            //        'mail': 'foo@bar.com'
            //    }
            //}];
            var company = $scope.companies[companyId];
            console.log(company);

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'companyDetails.template.html',
                targetEvent: ev,
                resolve: {
                    company: function () {
                        return company;
                    }
                }
            })
                .then(function (answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.alert = 'You cancelled the dialog.';
                });
        };


        function DialogController($scope, $mdDialog, dataService, company) {
            $scope.company = company;
            dataService.setDialog($mdDialog);

            $scope.stopPropagation = function (event) {
                event.stopPropagation();
            };

        }

        $scope.closeDialog = function () {
            var dialog = dataService.getDialog();
            if (dialog) {
                dataService.setDialog(undefined);
                dialog.hide();
            }
        }
    })
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('orange');
    });


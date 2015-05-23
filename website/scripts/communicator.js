(function (global) {
    'use strict';

    var internal = {
        serviceUrl: "http://praxis-market.appspot.com/?url=",
        getAllOfferTypes: function (cb) {

            var url = internal.serviceUrl + "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/offertypes/all"
            var request = new XMLHttpRequest();
            request.open('GET', url, true);  // `false` makes the request synchronous
            request.onload = function () {
                var jsonObj = JSON.parse(request.responseText);
                for (var i in jsonObj) {
                    switch (jsonObj[i].id) {
                        case 3:
                            jsonObj[i].icon = "fa-wrench";
                            break;
                        case 5:
                            jsonObj[i].icon = "fa-line-chart";
                            break;
                        case 6:
                            jsonObj[i].icon = "fa-book";
                            break;
                        case 9:
                            jsonObj[i].icon = "fa-graduation-cap";
                            break;
                        default:
                            jsonObj[i].icon = "fa-info";
                            break;
                    }
                }
                cb(jsonObj);
            }
            request.send(null);

            var offerTypes = [
                {"id":9,"name":"Abschlussarbeit","shortname":"thesis", "icon": "fa-graduation-cap"},
                {"id":3,"name":"Praxissemester","shortname":"internship", "icon": "fa-wrench"},
                {"id":5,"name":"Stellenangebot","shortname":"joboffer", "icon": "fa-line-chart"},
                {"id":6,"name":"Werkstudent","shortname":"workingstudent", "icon": "fa-book"}
            ];
            cb(offerTypes);
        },
        getAllOffersByType: function (type, limit, cb) {
            if (limit === undefined) {
                limit = -1;
            }
            var url = internal.serviceUrl + "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/offers/" + type + "/0/" + limit;
            var request = new XMLHttpRequest();
            request.open('GET', url, true);  // `false` makes the request synchronous
            request.onload = function () {
                var jsonObj = JSON.parse(request.responseText);

                for (var i in jsonObj.offers) {
                    jsonObj.offers[i].company = jsonObj.companies[jsonObj.offers[i].companyId];
                    jsonObj.offers[i].company.encodedAddress = encodeURIComponent(jsonObj.offers[i].company.street
                    + " " + jsonObj.offers[i].company.zipCode + " " + jsonObj.offers[i].company.city);
                }

                cb(jsonObj.offers, jsonObj.companies);
            }
            request.send(null);
        },
        getMoreOffersByType: function (type, count, cb) {
            var url = internal.serviceUrl + "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/offers/" + type + "/" + count + "/10";
            console.log("Request Url: " + url);
            var request = new XMLHttpRequest();
            request.open('GET', url, true);  // `false` makes the request synchronous
            request.onload = function () {
                var jsonObj = JSON.parse(request.responseText);

                for (var i in jsonObj.offers) {
                    jsonObj.offers[i].company = jsonObj.companies[jsonObj.offers[i].companyId];
                    jsonObj.offers[i].company.encodedAddress = encodeURIComponent(jsonObj.offers[i].company.street
                    + " " + jsonObj.offers[i].company.zipCode + " " + jsonObj.offers[i].company.city);                }

                cb(jsonObj.offers, jsonObj.companies);
            }
            request.send(null);
        },
        getNotePad: function (cb) {
            var url = internal.serviceUrl + "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/notepad/0/-1";
            var request = new XMLHttpRequest();
            request.open('GET', url, true);  // `false` makes the request synchronous
            request.onload = function () {
                var jsonObj = JSON.parse(request.responseText);

                for (var i in jsonObj.offers) {
                    jsonObj.offers[i].company = jsonObj.companies[jsonObj.offers[i].companyId];
                    jsonObj.offers[i].company.encodedAddress = encodeURIComponent(jsonObj.offers[i].company.street
                    + " " + jsonObj.offers[i].company.zipCode + " " + jsonObj.offers[i].company.city);
                    jsonObj.offers[i].onNotepad = true;
                }

                cb(jsonObj.offers, jsonObj.companies);
            }
            request.send(null);
        },
        removeOfferFromNotepad: function (offer, cb) {
            var url = internal.serviceUrl + "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/notepad/offer"
                + "/" + offer.id + "&delete=" + offer.id;
            var request = new XMLHttpRequest();
            request.open('GET', url, true);  // `false` makes the request synchronous
            request.send(null);
            cb();
        },
        addOfferToNotepad: function (offer) {
            var url = internal.serviceUrl + "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/notepad/offer"
                + "&post=" + offer.id;
            var request = new XMLHttpRequest();
            request.open('GET', url, true);  // `false` makes the request synchronous
            request.send(null);
        }
    };

    global.communicator = {
        getAllOfferTypes: function (cb) {
            //return [];
            return internal.getAllOfferTypes(cb);
        },
        getOffersByType: function (type, limit, cb) {
            //return [];
            return internal.getAllOffersByType(type, limit, cb);
        },
        getMoreOffersByType: function (type, count, cb) {
            //return [];
            return internal.getMoreOffersByType(type, count, cb);
        },
        getNotePad: function (cb) {
            //return [];
            return internal.getNotePad(cb);
        },
        removeOfferFromNotepad: function (offer, cb) {
            internal.removeOfferFromNotepad(offer, cb);
        },
        addOfferToNotepad: function (offer) {
            internal.addOfferToNotepad(offer);
        }
    };
}(window));
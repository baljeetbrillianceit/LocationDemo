(function () {
    'use strict';
    var jsonResponse = require('../utility/jsonResponse.js');
    var genericFunc = require('../utility/genericFunction.js')
    //var jwt = require('jsonwebtoken');
    var Constants = require('../utility/constants.js');
    let ApiCommand = Constants.apiEnum

    // Without Token Sec
    var login = require('../api/Login/loginDB');
    var dashboard = require('../api/Dashboard/dashboardDB');
    var time = require('../api/Time/timeDB');
    var userEntries = require('../api/userEntries/userEntriesDB');
    var locations = require('../api/Locations/LocationsDB');

    var routingCtrl = function () {
        return {

            routingWithoutToken: function (req, res, next) {

                var command = req.headers.command;

                var successFn = function (result) {
                    jsonResponse.successHandler(res, next, result)
                }
                var errFn = function (err) {
                    jsonResponse.errorHandler(res, next, err)
                }

                switch (command) {
                    case ApiCommand.Login:
                        login.loginDB(req, successFn, errFn); break;
                    case ApiCommand.Dashboard:
                        dashboard.dashboardDB(req, successFn, errFn); break;
                    case ApiCommand.inTime:
                        time.InTimeDB(req, successFn, errFn); break;
                    case ApiCommand.outTime:
                        time.OutTimeDB(req, successFn, errFn); break;
                    case ApiCommand.userEntries:
                        userEntries.userEntriesDB(req, successFn, errFn); break;
                    case ApiCommand.locations:
                        locations.locationsDB(req, successFn, errFn); break;

                    default: errFn("Command Not Found")
                }
            },

            routingWithToken: function (req, res, next) {
                console.log('Inside routingcontroller')
                var token = req.headers.token;
                var command = req.headers.command;

                var successFn = function (result) {
                    jsonResponse.successHandler(res, next, result)
                }
                var errFn = function (err) {
                    jsonResponse.errorHandler(res, next, err)
                }

                genericFunc.verifyTokenLink(token, res, next, function (data) {
                    var decoded = jwt.decode(token, Constants.JWTokenKey);
                    if (decoded) {

                    } else {
                        jsonResponse.errorHandler(res, next, Constants.InValidToken)
                    }
                })
            },

        }
    }
    module.exports = routingCtrl();
})();
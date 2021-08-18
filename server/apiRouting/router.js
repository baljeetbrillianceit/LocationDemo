
(function () {
    'use strict';
    var express = require('express');
    var Router = express.Router();
    var routingCtrl = require('./routingController')

    Router.get('/', function (req, res, next) {
        res.send('Invalid path');
    });

    Router.post('/login', routingCtrl.routingWithoutToken);
    Router.post('/dashboard', routingCtrl.routingWithoutToken);
    Router.post('/inTime', routingCtrl.routingWithoutToken);
    Router.post('/outTime', routingCtrl.routingWithoutToken);
    Router.post('/userEntries', routingCtrl.routingWithoutToken);


    Router.post('/locations', routingCtrl.routingWithoutToken);
    module.exports = Router;
})();
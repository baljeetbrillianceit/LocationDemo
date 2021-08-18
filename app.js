const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug');
const router = require('./server/apiRouting/router.js');
var genericFunc = require('./server/utility/genericFunction.js')
const path = require('path');
const cors = require('cors');
var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();

   
});


const whitelist = [
    'http://localhost:4000',
    'http://192.168.1.19:4000',
    'http://192.168.1.14:3000'
];
const corsOptions = {
    origin: function (origin, callback) {
        const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));
app.use('/router', router);
app.use(express.json());

//require('dotenv').config()

app.set('port', process.env.PORT || 3000);
var server = app.listen(port, () => debug('Express server listening on port ' + port));
console.log("Server running");
app.get('/test', function (req, res, next) {
    res.send({"status": 'Server Started'});
    
});

module.exports = app
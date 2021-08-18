(function () {
    'use strict';
    var crypto = require('crypto');
    var Constants = require('./constants.js');
    var jwt = require('jsonwebtoken');
    const mysql = require('mysql');
    var jsonResponse = require('../utility/jsonResponse.js');
    var dataAccessLayer = require('../mysql/sqlConnect.js')
    var procNames = require('../mysql/procedureEnum.js')
    var errors = require('../mysql/StringManager.js');

    var generics = function () {

        return {
            errorFunc: function (data) {
                var message = {
                    "message": "Error",
                    "err": data
                };
                return message
            },

            checkEmptyNull: function (object, data, errfun) {
                if (data === undefined || data === "") {
                    var message;
                    message = this.errorFunc(object + " is missing");
                    errfun(message);
                    return true
                }
                return false
            },

            generateTokenLink: function (param) {
                let data = {
                    "ID": param.Id,
                    "Email": param.emailId
                }
                var token = jwt.sign(data, Constants.JWTokenKey, {
                    expiresIn: "1d"
                });
                return token
            },

            verifyTokenLink: function (data, res, next, response) {
                var token = jwt.verify(data, Constants.JWTokenKey, function (err, decoded) {
                    if (err) {
                        let message = {
                            "message": "Your session has expired. Please login again to continue."
                        }
                        jsonResponse.errorHandler(res, next, message)
                    } else {
                        response("Verified")
                        //jsonResponse.successHandler(res, next, message)
                    }
                })
            },

            encrypt: function (pwd) {
                return (crypto.createHash('sha256').update(pwd).digest('base64'));
            },


            executeQuery: async function (query, data = '') {

                var connection = mysql.createConnection(Constants.configMySql);
                await connection.connect(function (err) {

                    if (err) {
                        console.log(err)
                        // errroFunc(err);
                        return;
                    }
                    connection.query(query, data, (err, result, fields) => {
                        if (err) {
                            // errroFunc(err);
                            return;
                        }
                        console.log('Rows affected:', result.affectedRows);
                    });

                    function errroFunc(err) {
                        var email = require('../api/emailServer/email.js');
                        var func = require('./genericFunction');

                        func.loggerFunc(Constants.logError, query, err);
                        var message = func.errorFunc(err.message || "Err");
                        // errFn(message);
                        email.sendErrorRerportEmail(query, err || "Err")
                        connection.end();
                    }
                })

            },
        }
    };
    module.exports = generics();
})();
(function () {
    'use strict';

    var Constants = require('../../utility/constants.js');
    var func = require('../../utility/genericFunction.js');
    var dataAccessLayer = require('../../mysql/sqlConnect')
    var procNames = require('../../mysql/procedureEnum.js')
    var errors = require('../../mysql/StringManager.js');

    var loginDB = function () {
        return {
            loginDB: async function (req, successFn, errFn) {
                var message;
                var password = req.body.password
                // var password = func.encrypt(req.body.password);
                if (func.checkEmptyNull("emailId", req.body.emailId, errFn) == true ||
                    func.checkEmptyNull("password", password, errFn) == true ) {
                    return
                }
                var inputObject = [{
                    "node": 'emailId',
                    "dataType": "VarChar",
                    "value": req.body.emailId
                },
                {
                    "node": 'password',
                    "dataType": "VarChar",
                    "value": password
                }]
                dataAccessLayer.connectDb(req, errFn, procNames.proc_login, inputObject, errors.proc_login, function (result) {
                    if (result[0][0].message == 'Login Success') {
                        message = {
                            "message": result[0][0].message,
                           // "token": func.generateTokenLink(result[1][0]),
                            "data": result[1][0]
                        }
                        successFn(message);
                    
                    } else {
                        message = {
                            "message": result[0][0].message
                        }
                        errFn(message);
                    }
                });
            },
        }
    }
    module.exports = loginDB();
})();
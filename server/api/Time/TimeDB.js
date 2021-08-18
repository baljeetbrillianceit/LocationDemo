(function () {
    'use strict';

    var Constants = require('../../utility/constants.js');
    var func = require('../../utility/genericFunction.js');
    var dataAccessLayer = require('../../mysql/sqlConnect')
    var procNames = require('../../mysql/procedureEnum.js')
    var errors = require('../../mysql/StringManager.js');

    var TimeDB = function () {
        return {
            InTimeDB: async function (req, successFn, errFn) {
                var message;
                
                if (func.checkEmptyNull("userId", req.body.userId, errFn) == true  ||
                    func.checkEmptyNull("time", req.body.time, errFn) == true) {
                    return
                }
                var inputObject = [{
                    "node": 'userId',
                    "dataType": "Int",
                    "value": req.body.userId
                },{
                    "node": 'time',
                    "dataType": "Varchar",
                    "value": req.body.time
                }]
                dataAccessLayer.connectDb(req, errFn, procNames.proc_time, inputObject, errors.proc_time, function (result) {
                    if (result[0][0].message == 'Success') {
                        message = {
                            "message": result[0][0].message,
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

            OutTimeDB: async function (req, successFn, errFn) {
                var message;
                
                if (func.checkEmptyNull("userId", req.body.userId, errFn) == true  ||
                    func.checkEmptyNull("time", req.body.time, errFn) == true) {
                    return
                }
                var inputObject = [{
                    "node": 'userId',
                    "dataType": "Int",
                    "value": req.body.userId
                },{
                    "node": 'time',
                    "dataType": "Varchar",
                    "value": req.body.time
                }]
                dataAccessLayer.connectDb(req, errFn, procNames.proc_outtime, inputObject, errors.proc_time, function (result) {
                    if (result[0][0].message == 'Success') {
                        message = {
                            "message": result[0][0].message,
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
    module.exports = TimeDB();
})();
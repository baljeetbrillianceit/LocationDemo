(function () {
    'use strict';

    var Constants = require('../../utility/constants.js');
    var func = require('../../utility/genericFunction.js');
    var dataAccessLayer = require('../../mysql/sqlConnect')
    var procNames = require('../../mysql/procedureEnum.js')
    var errors = require('../../mysql/StringManager.js');

    var dashboardDB = function () {
        return {
            dashboardDB: async function (req, successFn, errFn) {
                var message;
                
                if (func.checkEmptyNull("userId", req.body.userId, errFn) == true ) {
                    return
                }
                var inputObject = [{
                    "node": 'userId',
                    "dataType": "Int",
                    "value": req.body.userId
                }]
                dataAccessLayer.connectDb(req, errFn, procNames.proc_dashboard, inputObject, errors.proc_dashboard, function (result) {
                    if (result[0][0].message == 'Success') {
                        message = {
                            "message": result[0][0].message,
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
    module.exports = dashboardDB();
})();
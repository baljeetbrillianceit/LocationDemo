(function () {
    'use strict';

    var Constants = require('../../utility/constants.js');
    var func = require('../../utility/genericFunction.js');
    var dataAccessLayer = require('../../mysql/sqlConnect')
    var procNames = require('../../mysql/procedureEnum.js')
    var errors = require('../../mysql/StringManager.js');

    var locationsDB = function () {
        return {
            locationsDB: async function (req, successFn, errFn) {
                var message;

                // if (func.checkEmptyNull("userId", req.body.userId, errFn) == true) {
                //     return
                // }
                var inputObject = [
                    {
                        "node": 'latitude',
                        "dataType": "VarChar",
                        "value": req.body.lat
                    },
                    {
                        "node": 'lng',
                        "dataType": "VarChar",
                        "value": req.body.lng
                    }

                ]
                dataAccessLayer.connectDb(req, errFn, procNames.proc_locations, inputObject, errors.proc_userentries, function (result) {

                    message = {
                        "message": result[0][0].message,
                        "data": result[0]
                    }
                    successFn(message);


                });
            },
        }
    }
    module.exports = locationsDB();
})();
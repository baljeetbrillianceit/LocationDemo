var sqlConnectDb = function () {
    'use strict';
    var mysql = require('mysql');
    const Constants = require('../utility/constants.js')
    var db;

    return {
        connectDb: async function (successFn, errFn) {
            var connection = mysql.createConnection(Constants.configMySql);
            await connection.connect(function (err) {
                if (err) {
                    var err = {
                        message: "Problem"
                    }
                    errFn(err);
                }
                else {
                    successFn(connection);
                }
            })
        }
    }
}
module.exports = sqlConnectDb();
